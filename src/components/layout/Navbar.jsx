import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "../../utils/cn";
import { Menu, X } from "lucide-react";
import { SITE_NAME } from "../../config/site";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { getNavigationLinks, NAVIGATION_ITEMS } from "../../data/navigation";
import { LanguageToggle } from "../ui/LanguageToggle";
import { ThemeToggleButton } from "../ui/ThemeToggleButton";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navLinks = getNavigationLinks(t.nav);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      for (const { id } of NAVIGATION_ITEMS) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300",
        isScrolled ? "py-4" : "py-6",
      )}
    >
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={cn(
            "w-full flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3.5 rounded-full transition-all duration-300",
            isScrolled ? "glass shadow-xl" : "bg-transparent",
          )}
        >
          <a
            href={navLinks[0]?.href}
            className="shrink-0 pr-2 text-xl font-display font-bold tracking-tight z-50 text-[var(--color-foreground)]"
          >
            {SITE_NAME}
            <span className="text-[var(--color-muted)]">.</span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex flex-1 items-center justify-center gap-5 lg:gap-7 xl:gap-8 min-w-0">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors uppercase",
                    activeSection === link.id
                      ? "text-[var(--color-foreground)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
                  )}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex shrink-0 items-center gap-3 lg:gap-4 border-l border-[var(--color-border)] pl-4 lg:pl-6 ml-2">
            <ThemeToggleButton theme={theme} onToggle={toggleTheme} />
            <LanguageToggle
              language={language}
              onChange={setLanguage}
              layoutId="desktop-lang-bg"
            />
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-full bg-[var(--color-foreground)] text-[var(--color-background)] hover:opacity-90 transition-opacity"
            >
              {t.nav.letsTalk}
            </a>
          </div>

          <div className="flex md:hidden shrink-0 items-center gap-2 sm:gap-3 z-50">
            <ThemeToggleButton
              theme={theme}
              onToggle={toggleTheme}
              size="mobile"
            />
            <LanguageToggle
              language={language}
              onChange={setLanguage}
              size="mobile"
              layoutId="mobile-lang-bg"
            />
            <button
              type="button"
              className="text-[var(--color-foreground)] bg-[var(--color-card)] p-1.5 rounded-full border border-[var(--color-border)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      <motion.div
        initial={false}
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, y: 0, pointerEvents: "auto" },
          closed: { opacity: 0, y: -20, pointerEvents: "none" },
        }}
        className="fixed inset-0 z-30 bg-[var(--color-background)]/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
      >
        <ul className="flex flex-col items-center gap-8 w-full px-6 max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-foreground)] uppercase tracking-wider text-center block"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-8 py-4 text-sm font-medium rounded-full bg-[var(--color-foreground)] text-[var(--color-background)] uppercase tracking-wider mt-4 inline-block text-center hover:opacity-90 transition-opacity"
            >
              {t.nav.letsTalk}
            </a>
          </li>
        </ul>
      </motion.div>
    </header>
  );
}
