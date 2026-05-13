import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about-me" },
  { label: "Services", href: "/services" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
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
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-5 left-1/2 z-50 grid w-[min(92vw,1320px)] -translate-x-1/2 grid-cols-[1fr_auto_1fr] items-center gap-5 rounded-full px-6 py-3 transition-all duration-500 ${
          scrolled
            ? "border border-[#59fff1]/8 bg-[#080a0e]/78 shadow-[0_24px_64px_rgba(0,0,0,0.55),0_0_40px_rgba(89,255,241,0.03)] backdrop-blur-[24px] saturate-[1.2]"
            : "border border-transparent bg-transparent"
        }`}
        style={{ pointerEvents: "auto" }}
        aria-label="Primary navigation"
      >
        <Link
          to="/"
          className="flex items-center justify-self-start"
          aria-label="Rohan Dsouza home"
        >
          <img
            src="/images/Rohan-Dsouza-Monogram.png"
            alt="Rohan Dsouza"
            className="h-10 w-auto drop-shadow-[0_8px_20px_rgba(89,255,241,0.2)] transition-[filter] duration-400 hover:drop-shadow-[0_8px_28px_rgba(89,255,241,0.35)]"
          />
        </Link>

        <nav className="hidden items-center gap-0 rounded-full border border-white/15 bg-black/40 px-2 py-2 backdrop-blur-md md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`relative min-w-[100px] rounded-full px-5 py-3 text-center text-[0.78rem] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                isActive(item.href)
                  ? "text-[#59fff1]"
                  : "text-white/60 hover:text-white"
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

        <Link
          to="/contact-us"
          className="hidden justify-self-end rounded-full border border-[#59fff1] bg-black/24 px-6 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:bg-[#59fff1]/10 hover:shadow-[0_0_20px_rgba(89,255,241,0.2)] md:inline-flex"
        >
          Work With Me
        </Link>

        <button
          className="flex items-center justify-center justify-self-end text-white md:hidden"
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
            className="fixed inset-x-0 top-[80px] z-50 mx-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c10]/95 backdrop-blur-2xl md:hidden"
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
              <Link
                to="/contact-us"
                onClick={() => setMobileOpen(false)}
                className="mt-3 rounded-full border border-[#59fff1] px-5 py-3 text-center text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#59fff1]/10"
              >
                Work With Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
