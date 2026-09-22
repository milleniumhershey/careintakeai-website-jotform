"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";

export const CALENDLY = "https://calendly.com/guilletgreg/audit-meeting";
export const FACEBOOK = "https://www.facebook.com/profile.php?id=61592884481362";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <Link className="brand" href="/" aria-label="CAREINTAKEAI home">
        <img src="/careintakeai-logo.png" width="190" height="58" alt="CAREINTAKEAI" />
      </Link>
      <nav id="primary-navigation" className={open ? "open" : ""} aria-label="Primary navigation">
        <Link href="/services">Services</Link>
        <Link href="/audit">System Finder</Link>
        <Link href="/about">About</Link>
        <Link href="/resources">Resources</Link>
        <Link className="mobile-book" href="/book">Book an Audit</Link>
      </nav>
      <Link className="button header-cta" href="/book">Book an Audit ↗</Link>
      <button className="menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-navigation" aria-label="Toggle navigation">
        <span />
        <span />
      </button>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div>
        <Link className="brand" href="/">
          <img src="/careintakeai-logo.png" width="190" height="58" alt="CAREINTAKEAI" />
        </Link>
        <p>Connected growth and operations systems for senior-care providers.</p>
      </div>
      <div>
        <strong>EXPLORE</strong>
        <Link href="/services">Services</Link>
        <Link href="/audit">System Finder</Link>
        <Link href="/resources">Resources</Link>
      </div>
      <div>
        <strong>CONNECT</strong>
        <Link href="/book">Book an Audit</Link>
        <a href={FACEBOOK} target="_blank" rel="noreferrer">Facebook</a>
        <a href="mailto:gguillet@careintakeai.com">gguillet@careintakeai.com</a>
        <a href="tel:+16785610670">678-561-0670</a>
      </div>
      <div>
        <strong>LEGAL</strong>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/accessibility">Accessibility</Link>
      </div>
      <small>© {new Date().getFullYear()} CAREINTAKEAI. Technology supports your team; it does not replace professional judgment.</small>
    </footer>
  );
}

export function PageHero({ kicker, title, copy }: { kicker: string; title: string; copy: string }) {
  return (
    <section className="page-hero">
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      <p>{copy}</p>
    </section>
  );
}
