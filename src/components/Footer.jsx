import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./ui/ScrollReveal";
import { siteInfo } from "../data/team";

const serviceLinks = [
  { label: "Go-To-Market", href: "/go-to-market" },
  { label: "GenAI & Agents", href: "/genai-and-agents" },
  { label: "Influence and Inbound", href: "/influence-and-inbound" },
  { label: "Product & Design", href: "/product-and-design" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about-me" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/#contact" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-background">
      <ScrollReveal>
        <div className="mx-auto max-w-[1380px] px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_0.75fr]">
            <div>
              <img
                src="/images/Rohan-Dsouza-Monogram.png"
                alt="Rohan Dsouza"
                className="mb-4 h-10 w-auto"
                loading="lazy"
              />
              <p className="text-sm leading-relaxed text-muted">
                {siteInfo.brand} &mdash; {siteInfo.tagline}
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-heading text-sm font-extrabold uppercase tracking-wider text-text">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={siteInfo.phoneHref}
                    className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent"
                  >
                    <Phone size={15} className="flex-shrink-0 text-accent/60" />
                    {siteInfo.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteInfo.email}`}
                    className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent"
                  >
                    <Mail size={15} className="flex-shrink-0 text-accent/60" />
                    {siteInfo.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted">
                  <MapPin size={15} className="flex-shrink-0 text-accent/60" />
                  {siteInfo.location}
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-heading text-sm font-extrabold uppercase tracking-wider text-text">
                Our Services
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-heading text-sm font-extrabold uppercase tracking-wider text-text">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 border-t border-line pt-6 text-center text-xs text-muted/60">
            Copyright 2026 All rights reserved
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
