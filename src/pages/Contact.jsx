import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import { ArrowRight, Github, Mail } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";
import { SectionHeading } from "../components/ui/SectionHeading";
import { CONTACT_DETAILS, SECTION_IDS, SOCIAL_LINKS } from "../config/site";
import { useLanguage } from "../context/LanguageContext";

const FORM_FIELDS = [
  {
    id: "name",
    labelKey: "name",
    type: "text",
    placeholder: "John Doe",
    autoComplete: "name",
  },
  {
    id: "email",
    labelKey: "email",
    type: "email",
    placeholder: "john@example.com",
    autoComplete: "email",
  },
  {
    id: "subject",
    labelKey: "subject",
    type: "text",
    placeholder: "Let's work together",
    autoComplete: "organization-title",
  },
];

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const FORM_STATUS_COPY = {
  en: {
    required: "Please fill in all fields before sending your message.",
    success: "Thanks. Your message has been sent successfully.",
    error:
      "Something went wrong while sending your message. Please try again or email me directly.",
    configError:
      "EmailJS is not configured yet. Please email me directly for now.",
  },
  km: {
    required: "សូមបំពេញព័ត៌មានទាំងអស់ មុនពេលផ្ញើសារ។",
    success: "អរគុណ។ សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ។",
    error:
      "មានបញ្ហាក្នុងការផ្ញើសារ។ សូមព្យាយាមម្តងទៀត ឬផ្ញើអ៊ីមែលមកខ្ញុំដោយផ្ទាល់។",
    configError:
      "EmailJS មិនទាន់បានកំណត់រចនាសម្ព័ន្ធទេ។ សូមផ្ញើអ៊ីមែលមកខ្ញុំដោយផ្ទាល់សិន។",
  },
};

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

function getSocialIcon(kind) {
  switch (kind) {
    case "facebook":
      return <FaFacebookF className="w-4 h-4" />;
    case "github":
    default:
      return <Github className="w-4 h-4" />;
  }
}

export function Contact() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [formStatus, setFormStatus] = useState({
    tone: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailLocalPart, emailDomain] = CONTACT_DETAILS.email.split("@");
  const statusCopy = FORM_STATUS_COPY[language] ?? FORM_STATUS_COPY.en;

  function handleFieldChange(event) {
    const { name, value } = event.target;
    setFormData((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (formStatus.message) {
      setFormStatus({ tone: "idle", message: "" });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setFormStatus({ tone: "error", message: statusCopy.configError });
      return;
    }

    const normalizedFormData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    const hasEmptyField = Object.values(normalizedFormData).some((value) => !value);
    if (hasEmptyField) {
      setFormStatus({ tone: "error", message: statusCopy.required });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ tone: "idle", message: "" });

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: normalizedFormData.name,
          email: normalizedFormData.email,
          subject: normalizedFormData.subject,
          message: normalizedFormData.message,
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      setFormData(INITIAL_FORM_DATA);
      setFormStatus({ tone: "success", message: statusCopy.success });
    } catch (error) {
      setFormStatus({
        tone: "error",
        message:
          error instanceof Error && error.message ? error.message : statusCopy.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className="relative flex min-h-[78vh] flex-col justify-center py-24"
      id={SECTION_IDS.contact}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          <div>
            <SectionHeading
              eyebrow={t.contact.titlePrefix}
              title={t.contact.headlineStart}
              highlight={t.contact.headlineEnd}
              stacked
              titleClassName="text-3xl sm:text-4xl md:text-6xl leading-[0.95]"
            />

            <p className="text-[var(--color-muted)] text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-md mb-8">
              {t.contact.desc}
            </p>

            <div className="flex flex-col gap-5">
              <a
                href={`mailto:${CONTACT_DETAILS.email}`}
                className="group flex items-center gap-3 text-base md:text-lg font-light hover:opacity-70 transition-opacity w-fit"
              >
                <Mail className="w-5 h-5 text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition-colors" />
                {emailLocalPart}
                <br className="sm:hidden" />@
                {emailDomain}
              </a>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3">
                {SOCIAL_LINKS.map((socialLink) => (
                  <a
                    key={socialLink.href}
                    href={socialLink.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={socialLink.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full glass transition-all hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)]"
                  >
                    {getSocialIcon(socialLink.kind)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="glass p-5 sm:p-6 md:p-8 rounded-3xl relative overflow-hidden">
            <form className="relative z-10 flex flex-col gap-5" onSubmit={handleSubmit}>
              {FORM_FIELDS.map((field) => (
                <div key={field.id} className="flex flex-col gap-2">
                  <label
                    htmlFor={field.id}
                    className="ml-2 text-xs font-medium uppercase tracking-widest text-[#8E9299]"
                  >
                    {t.contact[field.labelKey]}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    value={formData[field.id]}
                    onChange={handleFieldChange}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    required
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-foreground)]/5 px-5 py-3.5 text-sm font-light text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-glass-border)] disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="ml-2 text-xs font-medium uppercase tracking-widest text-[#8E9299]"
                >
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleFieldChange}
                  placeholder="Tell me about your project..."
                  autoComplete="off"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-[var(--color-foreground)]/5 border border-[var(--color-border)] rounded-xl px-5 py-3.5 outline-none focus:border-[var(--color-glass-border)] transition-colors font-light text-sm md:text-base text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] resize-none disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {formStatus.message ? (
                <p
                  aria-live="polite"
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    formStatus.tone === "success"
                      ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                      : "border-rose-400/40 bg-rose-500/10 text-rose-200"
                  }`}
                >
                  {formStatus.message}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--color-foreground)] text-[var(--color-background)] text-sm md:text-base font-medium py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-1 group disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? t.contact.sending : t.contact.send}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
