import { auth } from "./firebase";

export async function translateProject(fields, signal) {
  if (!auth?.currentUser)
    throw new Error("Sign in as an admin to translate your project.");
  const token = await auth.currentUser.getIdToken();
  const response = await fetch("/api/translate-project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ fields }),
    signal,
  });
  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error(
      "Translation is unavailable. Restart the dev server or deploy the translation API.",
    );
  }
  if (!response.ok)
    throw new Error(result.error || "Translation failed. Please try again.");
  if (
    !result.translations ||
    Object.keys(fields).some(
      (key) =>
        typeof result.translations[key] !== "string" ||
        !result.translations[key].trim(),
    )
  )
    throw new Error("The translation response was incomplete. Please retry.");
  return result.translations;
}
