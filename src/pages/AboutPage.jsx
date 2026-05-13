import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Mail,
  MapPin,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Navbar } from "../components/Navbar";
import { Team } from "../components/Team";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { FloatingOrbs } from "../components/ui/FloatingOrbs";
import { GlowLine } from "../components/ui/GlowLine";
import { TiltCard } from "../components/ui/TiltCard";
import { OrbitRing } from "../components/ui/OrbitRing";
import { SmoothReveal } from "../components/ui/SmoothReveal";
import { siteInfo } from "../data/team";

function Pill({ children }) {
  return (
    <motion.span
      className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-md"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 20px rgba(89,255,241,0.15)",
      }}
    >
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-accent"
        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {children}
    </motion.span>
  );
}

function ProfileImage({ src, alt }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imgScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.96, 1, 1.02]
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <motion.div
        className="absolute -inset-3 rounded-3xl border border-accent/10 opacity-0"
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
      />
      <motion.div
        className="absolute -inset-6 rounded-[28px] border border-dashed border-accent/[0.07] opacity-0"
        whileInView={{ opacity: 1, rotate: 2 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 1 }}
      />

      <OrbitRing
        size={140}
        duration={16}
        dotCount={4}
        className="-right-8 -top-8 opacity-40"
      />

      <motion.div
        className="absolute -bottom-4 -left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-background/80 backdrop-blur-md shadow-[0_0_20px_rgba(89,255,241,0.15)]"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 1,
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        animate={{ y: [0, -5, 0] }}
      >
        <Sparkles size={14} className="text-accent" />
      </motion.div>

      <TiltCard
        tiltStrength={10}
        className="group relative overflow-hidden rounded-2xl border border-line/40 bg-white/[0.02] backdrop-blur-sm"
      >
        <motion.div style={{ y, scale: imgScale }} className="overflow-hidden">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-[0.65]"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-accent/0 transition-all duration-500 group-hover:border-accent/20 group-hover:shadow-[inset_0_0_40px_rgba(89,255,241,0.05)]" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute bottom-0 left-0 right-0 translate-y-full p-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          <div className="h-px w-full bg-gradient-to-r from-accent/40 to-transparent" />
          <h4 className="mt-3 font-heading text-lg font-bold text-white">
            {siteInfo.name}
          </h4>
          <p className="text-[13px] text-accent/70">
            Founder &bull; {siteInfo.brand}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={siteInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-accent/20 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-accent backdrop-blur-md transition-all hover:border-accent/40 hover:bg-accent/10"
            >
              <FaInstagram size={12} />
              Instagram
            </a>
            <a
              href={siteInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-accent/20 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-accent backdrop-blur-md transition-all hover:border-accent/40 hover:bg-accent/10"
            >
              <FaLinkedinIn size={12} />
              LinkedIn
            </a>
            <a
              href={`mailto:${siteInfo.email}`}
              className="flex items-center gap-1.5 rounded-full border border-accent/20 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-accent backdrop-blur-md transition-all hover:border-accent/40 hover:bg-accent/10"
            >
              <Mail size={12} />
              Email
            </a>
          </div>

          <div className="mt-3 flex items-center gap-3 text-[11px] text-white/50">
            <span className="flex items-center gap-1">
              <MapPin size={10} />
              {siteInfo.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={10} />
              GTM &bull; AI &bull; Brand
            </span>
          </div>
        </div>

        <motion.div
          className="pointer-events-none absolute -bottom-6 left-1/2 h-[80px] w-[70%] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[30px]"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </TiltCard>
    </motion.div>
  );
}

function ScrollableStoryBox({ children, maxHeight = "460px" }) {
  return (
    <TiltCard
      tiltStrength={4}
      className="relative overflow-hidden rounded-2xl border border-line/50 bg-white/[0.03] backdrop-blur-xl"
    >
      <div
        className="custom-scrollbar space-y-4 overflow-y-auto p-6 lg:p-8"
        style={{ maxHeight }}
      >
        {children}
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0b0f] to-transparent" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0a0b0f]/50 to-transparent" />

      <motion.div
        className="pointer-events-none absolute -bottom-6 left-1/2 h-20 w-[60%] -translate-x-1/2 rounded-full bg-accent/[0.04] blur-[30px]"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </TiltCard>
  );
}

function StoryParagraph({ children, isHighlight, isBold }) {
  const base = "text-[15px] leading-[1.9]";
  if (isHighlight) {
    return (
      <p className={`${base} font-semibold italic text-accent`}>
        {children}
      </p>
    );
  }
  if (isBold) {
    return (
      <p className={`${base} font-semibold text-white/90`}>
        {children}
      </p>
    );
  }
  return <p className={`${base} text-[#a8afbb]`}>{children}</p>;
}

export function AboutPage() {
  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <section className="relative z-10 pt-32 pb-16 lg:pt-40 lg:pb-24">
          <FloatingOrbs count={4} className="-z-10 opacity-40" />

          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <SmoothReveal>
              <div className="mb-10">
                <Pill>About me</Pill>
                <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-wider text-white sm:text-4xl lg:text-5xl">
                  Rohan Dsouza
                </h2>
                <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/[0.03] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
                  Consultant. Builder. Anime nerd. Permanently
                  curious.
                </span>
              </div>
            </SmoothReveal>

            <div className="grid gap-10 lg:grid-cols-[420px_1fr] lg:gap-14">
              <div className="hidden lg:block">
                <div className="sticky top-28">
                  <ProfileImage
                    src="/images/RDNEWGEN-2.jpeg"
                    alt="Rohan Dsouza"
                  />
                </div>
              </div>

              <SmoothReveal direction="right">
                <h3 className="mb-4 font-heading text-2xl font-bold text-white sm:text-3xl">
                  Thirteen Years Ago,
                </h3>
                <ScrollableStoryBox maxHeight="520px">
                  <StoryParagraph>
                    <em>
                      I walked onto a sales floor in Dubai with
                      nothing but hunger and a very strong WiFi
                      password.
                    </em>
                  </StoryParagraph>
                  <StoryParagraph>
                    No playbook. No mentor tapping me on the
                    shoulder with wisdom. Just the deep, clarifying
                    pressure of working across FMCG and Real Estate
                    in the UAE, where enterprise trust is something
                    you earn in years, not pitches, and where the
                    market has absolutely no interest in your
                    enthusiasm unless you can back it with results.
                  </StoryParagraph>
                  <StoryParagraph>
                    So I backed it with results.
                  </StoryParagraph>
                  <StoryParagraph isHighlight>
                    The lesson I learned early and never forgot:
                    every number has a system behind it. Every
                    system needs someone who actually cares enough
                    to build it right.
                  </StoryParagraph>
                  <StoryParagraph>
                    Then I came to India. And India, as anyone who
                    has tried to build something here will tell you,
                    is an entirely different education.
                  </StoryParagraph>
                  <StoryParagraph>
                    I joined the startup world at a point where most
                    founders were running on conviction, caffeine,
                    and spreadsheets that should never be shown to
                    an investor. I walked into teams that had
                    potential but no process. Revenue targets that
                    existed on slides but not in pipelines. Markets
                    that were wide open but completely unmapped.
                  </StoryParagraph>
                  <StoryParagraph>
                    So I did what I had always done. I got to work.
                  </StoryParagraph>
                  <StoryParagraph>
                    I built revenue functions from zero. Hired the
                    first salespeople, wrote the first playbooks,
                    opened the first accounts, and stayed long
                    enough to make sure the thing kept running after
                    the initial energy wore off.
                  </StoryParagraph>
                  <StoryParagraph isHighlight>
                    The part I was best at, and the part I loved the
                    most, was not the execution. It was the moment
                    before. Walking into a business, sitting with
                    the problem, understanding what was actually
                    broken, and mapping the path from where they
                    were to where they needed to be.
                  </StoryParagraph>
                </ScrollableStoryBox>
              </SmoothReveal>
            </div>
          </div>
        </section>

        <GlowLine />

        <section className="relative z-10 py-16 lg:py-24">
          <FloatingOrbs count={3} className="-z-10 opacity-30" />

          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-14">
              <SmoothReveal direction="left">
                <ScrollableStoryBox maxHeight="520px">
                  <StoryParagraph>
                    Founders would bring me in to fix a sales
                    pipeline and I would come back with a question
                    about their positioning. CTOs would want to talk
                    product and I would end up mapping their entire
                    go-to-market blind spot. That pattern repeated
                    enough times that it stopped being a coincidence
                    and started being a calling.
                  </StoryParagraph>
                  <StoryParagraph>
                    I realised I was not just a revenue operator. I
                    was a business diagnostician who happened to be
                    very good at building the thing once the
                    diagnosis was done.
                  </StoryParagraph>
                  <StoryParagraph>
                    Somewhere in the middle of all that, I
                    accidentally became a copywriter. That sentence
                    sounds like a punchline, and honestly, it kind
                    of is.
                  </StoryParagraph>
                  <StoryParagraph isHighlight>
                    Organic reach that outperformed paid campaigns.
                    Inbound leads from a single post. Executives
                    suddenly receiving calls they had been chasing
                    for months. Personal brand went from a buzzword
                    I rolled my eyes at to the most underrated
                    growth channel I had ever seen up close.
                  </StoryParagraph>
                  <StoryParagraph>
                    Then came AI. And this is where the story shifts
                    gear entirely.
                  </StoryParagraph>
                  <StoryParagraph>
                    Working alongside cloud and enterprise
                    ecosystems serving the US market, I stopped
                    advising on AI and started building it. I
                    co-architected and shipped a production-grade
                    agentic voice platform that handled over 180,000
                    live calls and converted real enterprise leads
                    at scale.
                  </StoryParagraph>
                  <StoryParagraph isBold>
                    Seven figures of ARR built from the ground up.
                    Deals closed at the CTO table. Startups taken
                    from zero to acquisition. A platform taken from
                    a blank whiteboard to 180,000 live calls in
                    production. That is not a CV. That is a case
                    study.
                  </StoryParagraph>
                  <StoryParagraph isHighlight>
                    I do not hand over decks and disappear. I stay
                    until the thing works. That has never once
                    changed regardless of the industry, the country,
                    or the size of the problem.
                  </StoryParagraph>
                  <StoryParagraph>
                    Today I split my time between Bangalore and Goa,
                    travel across India for clients, and work with
                    startups, growth-stage companies, and ambitious
                    businesses across the US and Europe who are
                    serious about building something that actually
                    lasts. The timezone situation is always
                    negotiable. The standard of work is not.
                  </StoryParagraph>
                </ScrollableStoryBox>
              </SmoothReveal>

              <div className="hidden lg:block">
                <div className="sticky top-28">
                  <ProfileImage
                    src="/images/Untitled-design.png"
                    alt="Rohan Dsouza"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Team />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
