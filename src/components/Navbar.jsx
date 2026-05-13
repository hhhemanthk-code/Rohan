import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-me" },
  { label: "Services", href: "/services" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 60);
      setProgress(max > 0 ? y / max : 0);
      if (y > 300) {
        setHidden(y - lastY > 4);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: hidden ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`site-header-shell fixed left-1/2 top-5 z-50 grid w-[min(92vw,1320px)] -translate-x-1/2 grid-cols-[1fr_auto_1fr] items-center gap-5 rounded-full px-6 py-3 transition-all duration-500 max-md:grid-cols-[auto_1fr] max-md:px-4 ${
          scrolled
            ? "is-scrolled border border-[#59fff1]/15 bg-[#040508]/82 py-2 shadow-[0_24px_64px_rgba(0,0,0,0.7),0_0_0_1px_rgba(89,255,241,0.05)] backdrop-blur-[28px] saturate-[1.25]"
            : "border border-transparent bg-transparent"
        }`}
        style={{ pointerEvents: "auto" }}
        aria-label="Primary navigation"
      >
        <div className="header-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>

        <Link
          to="/"
          className="brand-mark group flex items-center justify-self-start"
          aria-label="Rohan Dsouza home"
        >
          <img
            src="/images/Rohan-Dsouza-Monogram.png"
            alt="Rohan Dsouza"
            className="h-auto w-[clamp(96px,7.2vw,122px)] drop-shadow-[0_16px_30px_rgba(89,255,241,0.16)] transition-[filter,transform] duration-300 group-hover:scale-[1.02] group-hover:drop-shadow-[0_18px_34px_rgba(89,255,241,0.3)]"
          />
        </Link>

        <nav className="nav-pill hidden items-center justify-center rounded-full border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0)),rgba(1,2,3,0.62)] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`relative min-w-[112px] rounded-full px-5 py-3.5 text-center text-[0.78rem] font-black uppercase tracking-[0.08em] leading-none transition-all duration-200 lg:text-[0.84rem] ${
                isActive(item.href)
                  ? "bg-white/10 text-[#59fff1]"
                  : "text-white/78 hover:-translate-y-px hover:bg-white/10 hover:text-[#59fff1]"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[#59fff1]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden justify-self-end md:block" aria-hidden="true" />

        <button
          className="flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-white/15 bg-white/[0.04] text-white backdrop-blur-md md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[86px] z-50 mx-4 overflow-hidden rounded-[22px] border border-white/10 bg-[#05070b]/95 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                      isActive(item.href)
                        ? "text-[#59fff1]"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
