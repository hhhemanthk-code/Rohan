import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function TextReveal({
  text,
  className = "",
  as: Tag = "h2",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <SingleWord
            key={`${word}-${i}`}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            isLast={i === words.length - 1}
          />
        );
      })}
    </Tag>
  );
}

function SingleWord({ word, progress, range, isLast }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <motion.span
      style={{ opacity, y, display: "inline-block" }}
    >
      {word}{isLast ? "" : "\u00A0"}
    </motion.span>
  );
}
