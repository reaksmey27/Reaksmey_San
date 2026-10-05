import { createHmac } from "node:crypto";

const labels = [
  [
    "📩 សារទំនាក់ទំនងថ្មី | New contact message",
    "📩 New contact message",
    "📩 សារទំនាក់ទំនងថ្មី",
  ],
  ["ពី / From:", "From:", "ពី:"],
  ["អ៊ីមែល / Email:", "Email:", "អ៊ីមែល:"],
  ["ប្រធានបទ / Subject", "Subject", "ប្រធានបទ"],
  ["សារ / Message", "Message", "សារ"],
];

export function webhookSecret(token) {
  return createHmac("sha256", token)
    .update("smey-telegram-language-webhook-v1")
    .digest("hex");
}

export function languageKeyboard(language = "both") {
  return {
    inline_keyboard: [
      [
        {
          text: `${language === "en" ? "✓ " : ""}English`,
          callback_data: "language:en",
        },
        {
          text: `${language === "km" ? "✓ " : ""}ខ្មែរ`,
          callback_data: "language:km",
        },
        {
          text: `${language === "both" ? "✓ " : ""}EN / ខ្មែរ`,
          callback_data: "language:both",
        },
      ],
    ],
  };
}

// Telegram includes the original message and UTF-16 entities in callbacks.
// Change only our styled labels, preserving all submitted text and line breaks.
export function localizeAlert(message, language) {
  const index = { both: 0, en: 1, km: 2 }[language];
  if (
    index === undefined ||
    typeof message.text !== "string" ||
    !Array.isArray(message.entities)
  )
    throw new Error("Invalid alert");
  let text = "";
  let cursor = 0;
  const entities = [];
  for (const entity of [...message.entities].sort(
    (a, b) => a.offset - b.offset,
  )) {
    if (
      entity.offset < cursor ||
      entity.offset + entity.length > message.text.length
    )
      throw new Error("Invalid entities");
    text += message.text.slice(cursor, entity.offset);
    let value = message.text.slice(
      entity.offset,
      entity.offset + entity.length,
    );
    if (entity.type === "bold") {
      const row = labels.find((options) => options.includes(value.trim()));
      if (row) value = value.replace(value.trim(), row[index]);
    }
    if (entity.type === "italic" && /^🕒 /.test(value)) {
      value = value.replace(
        /ទទួលបាន \/ Received:|Received:|ទទួលបាន:/,
        ["ទទួលបាន / Received:", "Received:", "ទទួលបាន:"][index],
      );
      value = value.replace(
        /ម៉ោងកម្ពុជា \/ Cambodia|Cambodia|ម៉ោងកម្ពុជា/,
        ["ម៉ោងកម្ពុជា / Cambodia", "Cambodia", "ម៉ោងកម្ពុជា"][index],
      );
    }
    entities.push({ ...entity, offset: text.length, length: value.length });
    text += value;
    cursor = entity.offset + entity.length;
  }
  text += message.text.slice(cursor);
  if (text.length > 4096) throw new Error("Alert too long");
  return {
    text,
    entities,
    reply_markup: languageKeyboard(language),
    link_preview_options: { is_disabled: true },
  };
}
