import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { clientLogos } from "../data/team";

export function LogoStrip() {
  const logoSet = [...clientLogos, ...clientLogos, ...clientLogos];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="logo-strip relative z-10 overflow-hidden border-y border-line bg-[#080a0f]/72 py-12 backdrop-blur-sm lg:py-16"
      aria-label="Client logos"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#080a0f_0%,transparent_12%,transparent_88%,#080a0f_100%)]" />
      <motion.div style={{ y }} className="logo-mask relative">
        <div className="logo-track">
          {logoSet.map((logo, i) => (
            <img
              key={`${logo}-${i}`}
              src={logo}
              alt={`Client logo ${(i % clientLogos.length) + 1}`}
              className="h-[clamp(54px,5vw,82px)] w-[clamp(110px,8vw,168px)] flex-none object-contain opacity-90 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              loading="lazy"
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
