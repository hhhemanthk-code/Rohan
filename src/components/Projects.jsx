import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "./ui/SectionLabel";
import { SmoothReveal } from "./ui/SmoothReveal";
import { projects } from "../data/team";

const doubled = [...projects, ...projects];

export function Projects() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="projects" className="relative z-10 py-28 lg:py-36">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-10">
        <SmoothReveal>
          <div>
            <SectionLabel text="Projects" />
            <h2 className="mt-4 font-heading text-3xl font-black text-text sm:text-4xl lg:text-5xl">
              Discover Our Completed Work
            </h2>
          </div>
        </SmoothReveal>
      </div>

      <div
        className="mt-12 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="project-marquee flex w-max gap-8 px-6 lg:px-10"
          style={{
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {doubled.map((project, i) => (
            <motion.article
              key={`${project.title}-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: Math.min(i, 3) * 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative w-[clamp(340px,42vw,560px)] flex-shrink-0 overflow-hidden rounded-2xl border border-line bg-panel transition-all duration-500 hover:border-accent/30 hover:shadow-[0_36px_80px_rgba(0,0,0,0.58),0_0_0_1px_rgba(89,255,241,0.16),0_0_48px_rgba(89,255,241,0.1)]"
            >
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute bottom-0 left-0 right-0 translate-y-full p-5 transition-transform duration-500 group-hover:translate-y-0">
                <span className="text-xs font-semibold tracking-wider text-accent">
                  Case study
                </span>
                <h3 className="mt-1 font-heading text-lg font-bold text-text">
                  {project.title}
                </h3>
              </div>

              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at 50% 80%, rgba(89,255,241,0.06), transparent 60%)",
                }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
