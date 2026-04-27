/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { CustomCursor } from "./components/ui/CustomCursor";
import { PageLoader } from "./components/ui/PageLoader";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./pages/Hero";
import { About } from "./pages/About";
import { Skills } from "./pages/Skills";
import { Services } from "./pages/Services";
import { Projects } from "./pages/Projects";
import { Experience } from "./pages/Experience";
import { Contact } from "./pages/Contact";
import { Footer } from "./components/layout/Footer";

const INTRO_DURATION_MS = 1500;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, INTRO_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{isLoading ? <PageLoader /> : null}</AnimatePresence>

      <div className="relative min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] selection:bg-white/30">
        <CustomCursor />
        <Navbar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Services />
          <Projects />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
