import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Zap,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { SectionLabel } from "./ui/SectionLabel";
import { SmoothReveal } from "./ui/SmoothReveal";
import { TiltCard } from "./ui/TiltCard";
import { GlowLine } from "./ui/GlowLine";
import { FloatingOrbs } from "./ui/FloatingOrbs";
import { OrbitRing } from "./ui/OrbitRing";
import { whyItems } from "../data/team";

const icons = [Zap, Sparkles, ShieldCheck];

export function WhyUs() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.92, 1, 1.03]
  );
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.4],
    [
      "inset(12% 12% 12% 12% round 16px)",
      "inset(0% 0% 0% 0% round 16px)",
    ]
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-28 lg:py-36"
    >
      <FloatingOrbs count={3} className="-z-10 opacity-30" />
      <GlowLine className="absolute top-0" />

      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.92fr_1fr] lg:items-center">
          <SmoothReveal direction="left">
            <div>
              <SectionLabel text="Why Us?" />
              <h2 className="mt-4 font-heading text-3xl font-black text-text sm:text-4xl lg:text-5xl">
                Why Our Clients{" "}
                <span className="bg-gradient-to-r from-accent via-[#7dfff2] to-accent-strong bg-clip-text text-transparent">
                  Choose Me
                </span>
              </h2>

              <div className="mt-10 flex flex-col gap-6">
                {whyItems.map((item, i) => {
                  const Icon = icons[i];
                  return (
                    <motion.div
                      key={item}
                      initial={{
                        opacity: 0,
                        x: -40,
                        filter: "blur(6px)",
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                      }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        delay: i * 0.15,
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <TiltCard
                        tiltStrength={8}
                        className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-line/50 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:border-accent/25 hover:shadow-[0_0_40px_rgba(89,255,241,0.04)]"
                      >
                        <div className="relative flex h-[68px] w-[68px] flex-shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/10 to-accent/[0.03] text-accent shadow-[0_0_24px_rgba(89,255,241,0.1),inset_0_1px_0_rgba(89,255,241,0.15)]">
                          <Icon size={26} strokeWidth={1.8} />
                          <div className="absolute inset-0 rounded-2xl bg-accent/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </div>
                        <div>
                          <span className="text-4xl font-bold text-accent/20">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="mt-1 font-heading text-lg font-extrabold text-text">
                            {item}
                          </h3>
                        </div>

                        <motion.div
                          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/[0.04] blur-[30px]"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.5, 0.2],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </SmoothReveal>

          <div ref={imgRef}>
            <SmoothReveal direction="right">
              <div className="relative aspect-square">
                <motion.div
                  className="absolute -inset-4 rounded-3xl border border-accent/15 opacity-0"
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1 }}
                />

                <motion.div
                  className="absolute -inset-8 rounded-[28px] border border-dashed border-accent/10 opacity-0"
                  whileInView={{ opacity: 1, rotate: 3 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                />

                <OrbitRing
                  size={160}
                  duration={16}
                  dotCount={4}
                  className="-right-10 -top-10 opacity-50"
                />

                <motion.div
                  className="absolute -right-3 -top-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-background/80 backdrop-blur-md shadow-[0_0_30px_rgba(89,255,241,0.2)]"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  animate={{ y: [0, -6, 0] }}
                >
                  <Zap size={18} className="text-accent" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-3 -left-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-background/80 backdrop-blur-md shadow-[0_0_30px_rgba(89,255,241,0.2)]"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 1.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  animate={{ y: [0, -5, 0] }}
                >
                  <ShieldCheck size={18} className="text-accent" />
                </motion.div>

                <motion.div
                  className="absolute -right-6 top-1/2 z-10 h-24 w-[2px] -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-accent/40 to-transparent"
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                />

                <div className="relative overflow-hidden rounded-2xl">
                  <motion.div
                    style={{ y: imgY, scale: imgScale, clipPath }}
                    className="h-full w-full"
                  >
                    <img
                      src="/images/RDNEWGEN-2.jpeg"
                      alt="Rohan Dsouza"
                      className="h-full w-full rounded-2xl object-cover"
                      loading="lazy"
                    />
                  </motion.div>

                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-background/60 via-transparent to-transparent" />

                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-2xl border border-accent/20 shadow-[inset_0_0_60px_rgba(89,255,241,0.04)]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />

                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 1 }}
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(89,255,241,0.08) 0%, transparent 40%, transparent 60%, rgba(89,255,241,0.05) 100%)",
                    }}
                  />
                </div>

                <motion.div
                  className="pointer-events-none absolute -bottom-6 left-1/2 h-[120px] w-[80%] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[40px]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1 }}
                />
              </div>
            </SmoothReveal>
          </div>
        </div>
      </div>

      <GlowLine className="absolute bottom-0" />
    </section>
  );
}
