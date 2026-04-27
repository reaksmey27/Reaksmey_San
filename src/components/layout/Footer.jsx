import { useEffect, useState } from "react";
import { ArrowUp, Mail, MapPin, MoveRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CONTACT_DETAILS, SITE_NAME } from "../../config/site";
import { useLanguage } from "../../context/LanguageContext";
import { getNavigationLinks } from "../../data/navigation";

export function Footer() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const quickLinks = getNavigationLinks(t.nav).filter(
    (link) => link.id !== "hero",
  );

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
      <div className="pointer-events-none absolute left-0 top-16 h-72 w-72 rounded-full bg-blue-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-sky-400/10 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mx-auto max-w-6xl px-6"
      >
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-400">
                {t.contact.titlePrefix}
              </p>

              <div className="space-y-4">
                <h2 className="max-w-3xl font-display text-4xl font-light leading-[0.95] text-[var(--color-foreground)] sm:text-5xl md:text-6xl">
                  {t.contact.headlineStart}{" "}
                  <span className="font-bold">{t.contact.headlineEnd}</span>
                </h2>

                <p className="max-w-xl text-sm font-light leading-relaxed text-[var(--color-muted)] sm:text-base md:text-lg">
                  {t.contact.desc}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-[0_16px_40px_rgba(59,130,246,0.45)]"
              >
                {t.nav.letsTalk}
                <MoveRight className="h-4 w-4" />
              </a>

              <a
                href={`mailto:${CONTACT_DETAILS.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/5 px-6 py-3.5 text-sm font-medium text-blue-400 transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
              >
                <Mail className="h-4 w-4" />
                {CONTACT_DETAILS.email}
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-blue-500/20 bg-blue-500/5 p-6 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-400/80">
                  {t.footer.contactTitle}
                </p>
                <div className="mt-4 flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                  <div className="text-sm font-light leading-relaxed text-[var(--color-muted)]">
                    {CONTACT_DETAILS.location}
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)]/70 p-6 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                  {t.about.availabilityTitle}
                </p>
                <p className="mt-4 text-sm font-light leading-relaxed text-[var(--color-muted)]">
                  {t.about.availabilityDesc}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-10 lg:pl-8">
            <div className="rounded-[32px] border border-blue-500/20 bg-blue-500/5 p-7 backdrop-blur-sm">
              <div className="flex items-end justify-between gap-4 border-b border-blue-500/10 pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-400/70">
                    {SITE_NAME}.
                  </p>
                  <p className="mt-2 text-sm font-light leading-relaxed text-blue-300/60">
                    {t.footer.built}
                  </p>
                </div>

                <div className="hidden text-right sm:block">
                  <div className="text-3xl font-display font-bold tracking-[-0.06em] text-blue-400">
                    01
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {quickLinks.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between rounded-2xl border border-transparent px-3 py-2.5 transition-all hover:border-blue-500/30 hover:bg-blue-500/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-400">
                        0{index + 1}
                      </span>
                      <span className="text-sm font-medium uppercase tracking-[0.14em] text-blue-100 transition-colors group-hover:text-white">
                        {link.label}
                      </span>
                    </div>
                    <MoveRight className="h-4 w-4 text-blue-400/60 transition-all group-hover:translate-x-1 group-hover:text-blue-300" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-light text-[var(--color-muted)]">
                &copy; {new Date().getFullYear()} {t.footer.rights}
              </p>

              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
                aria-label={t.footer.backTop}
              >
                {t.footer.backTop}
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full border border-white/10 bg-[var(--color-foreground)] p-3 text-[var(--color-background)] shadow-[0_20px_45px_rgba(15,23,42,0.28)] transition-all hover:-translate-y-1 hover:opacity-95 focus:outline-none md:bottom-8 md:right-8"
            aria-label={t.footer.backTop}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
