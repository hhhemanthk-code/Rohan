import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionLabel } from "./ui/SectionLabel";
import { SmoothReveal } from "./ui/SmoothReveal";
import { testimonials } from "../data/testimonials";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const move = useCallback(
    (dir) => {
      setDirection(dir);
      setActive(
        (prev) =>
          (prev + dir + testimonials.length) % testimonials.length
      );
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(() => move(1), 4000);
    return () => clearInterval(timer);
  }, [move]);

  const variants = {
    enter: (d) => ({
      x: d > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
      filter: "blur(6px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (d) => ({
      x: d > 0 ? -200 : 200,
      opacity: 0,
      scale: 0.95,
      filter: "blur(6px)",
    }),
  };

  const t = testimonials[active];

  return (
    <section className="relative z-10 py-28 lg:py-36">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <SmoothReveal>
          <div className="text-center">
            <SectionLabel text="Testimonials" />
            <h2 className="mt-4 font-heading text-3xl font-black text-text sm:text-4xl lg:text-5xl">
              What People Say About Us
            </h2>
          </div>
        </SmoothReveal>

        <div className="relative mx-auto mt-14 max-w-3xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-8 text-center lg:p-12"
            >
              <div className="mb-6 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  >
                    <Star
                      size={16}
                      className="fill-gold text-gold"
                    />
                  </motion.div>
                ))}
              </div>

              <blockquote className="text-lg leading-relaxed text-muted-strong lg:text-xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-8 flex flex-col items-center gap-3"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-[68px] w-[68px] rounded-full border-2 border-accent/20 object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-heading text-sm font-bold text-text">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => move(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > active ? 1 : -1);
                    setActive(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-8 bg-accent"
                      : "w-2 bg-line hover:bg-muted/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => move(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
