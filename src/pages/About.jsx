import { motion } from "motion/react";
import { GraduationCap, Briefcase, Download } from "lucide-react";
import { CONTACT_DETAILS, PROFILE_ASSETS, SECTION_IDS } from "../config/site";
import { useLanguage } from "../context/LanguageContext";

export function About() {
  const { t } = useLanguage();

  return (
    <section className="pt-32 pb-24 relative" id={SECTION_IDS.about}>
      <div className="w-full max-w-6xl mx-auto px-8 md:px-12 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative justify-self-center lg:justify-self-start"
          >
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={PROFILE_ASSETS.aboutImage}
                alt="Reaksmey Portrait"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/80 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-5 left-0 md:-left-6 bg-blue-500 text-[var(--color-background)] p-4 sm:p-5 md:p-6 rounded-2xl shadow-[0_10px_30px_rgba(59,130,246,0.3)] z-10 min-w-[128px] md:min-w-[148px]"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-1">
                0+
              </h3>
              <p className="text-xs sm:text-sm font-medium opacity-90 leading-tight">
                {t.about.yearsExp}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col max-w-xl mx-auto lg:mx-0"
          >
            <h4 className="text-blue-500 font-bold uppercase tracking-widest text-xs md:text-sm mb-3">
              {t.about.biography}
            </h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5 tracking-tight leading-tight">
              {t.about.whoIs}
            </h2>

            <p className="text-[var(--color-muted)] text-sm sm:text-base font-light leading-relaxed mb-8">
              {t.about.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/15 text-blue-500 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="pt-1">
                  <h5 className="text-[var(--color-foreground)] font-bold text-sm md:text-base mb-1">
                    {t.about.educationTitle}
                  </h5>
                  <p className="text-[var(--color-muted)] font-light text-xs sm:text-sm">
                    {t.about.educationDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/15 text-blue-500 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="pt-1">
                  <h5 className="text-[var(--color-foreground)] font-bold text-sm md:text-base mb-1">
                    {t.about.availabilityTitle}
                  </h5>
                  <p className="text-[var(--color-muted)] font-light text-xs sm:text-sm">
                    {t.about.availabilityDesc}
                  </p>
                </div>
              </div>
            </div>

            <a
              href={CONTACT_DETAILS.resumeHref}
              download={CONTACT_DETAILS.resumeFilename}
              className="px-7 py-3.5 rounded-full bg-blue-500 text-[var(--color-background)] text-sm md:text-base font-medium flex items-center justify-center gap-2.5 w-fit hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              <Download className="w-4 h-4" />
              {t.about.download}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
