import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CONTACT_DETAILS, SITE_NAME, SOCIAL_LINKS } from "../../config/site";
import { useLanguage } from "../../context/LanguageContext";
import { getNavigationLinks } from "../../data/navigation";

export function Footer() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const quickLinks = getNavigationLinks(t.nav).filter(
    (link) => link.id !== "hero",
  );

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-card)] pb-8 pt-12 sm:pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1.2fr] lg:gap-8">
          <div className="min-w-0">
            <a
              href="#hero"
              className="font-display text-3xl font-bold tracking-tight text-[var(--color-foreground)]"
            >
              {SITE_NAME}
              <span className="text-[var(--color-primary)]">.</span>
            </a>
            <p className="mt-4 text-sm font-medium text-[var(--color-foreground)]">
              {t.footer.role}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
              {t.footer.intro}
            </p>
            <a
              href={CONTACT_DETAILS.resumeHref}
              download={CONTACT_DETAILS.resumeFilename}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition-colors hover:border-blue-500/50 hover:bg-blue-500/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
            >
              <Download className="h-4 w-4" />
              {t.about.download}
            </a>
          </div>
          <nav aria-label={t.footer.explore}>
            <h2 className="mb-4 text-sm font-semibold text-[var(--color-foreground)]">
              {t.footer.explore}
            </h2>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block py-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t.footer.socials}>
            <h2 className="mb-4 text-sm font-semibold text-[var(--color-foreground)]">
              {t.footer.socials}
            </h2>
            <ul className="space-y-1">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 py-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0">
            <h2 className="mb-5 text-sm font-semibold text-[var(--color-foreground)]">
              {t.footer.details}
            </h2>
            <address className="space-y-4 text-sm not-italic leading-relaxed text-[var(--color-muted)]">
              <a
                href={`mailto:${CONTACT_DETAILS.email}`}
                className="flex items-start gap-2.5 transition-colors hover:text-[var(--color-primary)]"
              >
                <Mail className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <span className="min-w-0 [overflow-wrap:anywhere]">
                  {CONTACT_DETAILS.email}
                </span>
              </a>
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <span>{CONTACT_DETAILS.location}</span>
              </p>
            </address>
            <div className="mt-5 border-t border-[var(--color-border)] pt-4">
              <p className="text-xs font-semibold text-[var(--color-foreground)]">
                {t.about.availabilityTitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {t.about.availabilityDesc}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-[var(--color-muted)]">
              &copy; {new Date().getFullYear()} {SITE_NAME}. {t.footer.rights}
            </p>
            <p className="text-xs text-[var(--color-muted)]">
              {t.footer.built}
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
          >
            {t.footer.backTop}
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full border border-white/10 bg-[var(--color-foreground)] p-3 text-[var(--color-background)] shadow-[0_20px_45px_rgba(15,23,42,0.28)] transition-all hover:-translate-y-1 hover:opacity-95 md:bottom-8 md:right-8"
            aria-label={t.footer.backTop}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
