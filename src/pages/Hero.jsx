import { motion } from "motion/react";
import { PROFILE_ASSETS, SECTION_IDS } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { useTypewriter } from "../hooks/useTypewriter";

export function Hero() {
  const { t } = useLanguage();
  const roles = [
    t.hero.dev,
    t.hero.designer,
    t.hero.contentCreator,
    t.hero.frontendDev,
  ].map((role) => `${role}.`);
  const currentRole = useTypewriter(roles);

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-32"
      id={SECTION_IDS.hero}
    >
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-8 md:px-12 lg:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-blue-500 font-bold tracking-widest text-[11px] md:text-xs uppercase mb-4">
              {t.hero.welcome}
            </h3>

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[48px] font-display font-bold leading-tight mb-4 break-words">
              {t.hero.hi} <span className="text-blue-500">REAKSMEY</span>
              <br />
              <span className="text-[var(--color-foreground)]">
                {t.hero.a} {currentRole}
              </span>
              <span className="animate-pulse text-blue-500 font-light">|</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-[var(--color-muted)] font-light max-w-md mb-7 leading-relaxed">
              {t.hero.desc}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#work"
                className="px-7 py-3.5 rounded-full bg-blue-500 text-[var(--color-background)] text-sm md:text-base font-medium hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              >
                {t.hero.myProjects}
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 rounded-full border border-blue-500 text-blue-500 text-sm md:text-base font-medium hover:bg-blue-500/10 transition-colors"
              >
                {t.hero.letsTalk}
              </a>
            </div>
          </motion.div>

          {/* Right Column - Image Blob */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex items-center justify-center lg:justify-end mt-12 lg:mt-0"
          >
            <div className="relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[360px] lg:h-[360px]">
              <div className="blob-shape-primary absolute inset-0 z-10 overflow-hidden border-[6px] border-blue-500 bg-[var(--color-background)]/50 shadow-[0_0_40px_rgba(59,130,246,0.2)] backdrop-blur-sm transition-all duration-1000">
                <img
                  src={PROFILE_ASSETS.heroImage}
                  alt="Reaksmey Portrait"
                  className="w-full h-full object-cover scale-[1.08] object-[center_top] opacity-90 hover:opacity-100 transition-opacity duration-500"
                  loading="eager"
                />
              </div>

              <div className="blob-shape-secondary absolute inset-0 z-0 scale-105 border-2 border-blue-500/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
