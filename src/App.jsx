import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { ContactPage } from "./pages/ContactPage";
import { Navbar } from "./components/Navbar";
import { CursorFollower } from "./components/ui/CursorFollower";
import { Preloader } from "./components/ui/Preloader";

const pageVariants = {
  initial: { opacity: 0, y: 10, scale: 0.996 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -8, scale: 0.998 },
};

const pageTransition = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1],
};

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });

    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
        style={{ willChange: "opacity, transform" }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-me" element={<AboutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/:slug" element={<ServiceDetailPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <CursorFollower />
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
