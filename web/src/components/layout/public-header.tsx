"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Programs", href: "/#programs" },
  { label: "Learning Path", href: "/#pathway" },
  { label: "Mentors", href: "/#mentors" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
];

export function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalProgress, setPortalProgress] = useState(0);
  const [portalLocked, setPortalLocked] = useState(false);

  const portalInMotion = portalLocked && portalProgress > 0.015;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPortalState = (event: Event) => {
      const { progress, locked } = (event as CustomEvent<{ progress: number; locked: boolean }>).detail;
      setPortalProgress(progress);
      setPortalLocked(locked);
      if (locked && progress > 0.015) setMobileOpen(false);
    };
    window.addEventListener("abhi-portal-state", onPortalState);
    const stateFrame = window.requestAnimationFrame(() => {
      const storedProgress = Number(document.documentElement.dataset.abhiPortalProgress);
      const storedLock = document.documentElement.dataset.abhiPortalLocked;
      if (Number.isFinite(storedProgress)) setPortalProgress(storedProgress);
      if (storedLock) setPortalLocked(storedLock === "true");
    });
    return () => {
      window.removeEventListener("abhi-portal-state", onPortalState);
      window.cancelAnimationFrame(stateFrame);
    };
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{ opacity: portalInMotion ? 0 : 1, y: portalInMotion ? -16 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-8 sm:pt-4"
      style={{ pointerEvents: portalInMotion ? "none" : "auto" }}
    >
      <motion.nav
        initial={false}
        animate={{ 
          scale: scrolled ? 0.95 : 1,
          width: scrolled ? "92%" : "100%",
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className={`relative flex max-w-[1400px] items-center justify-between overflow-hidden rounded-2xl border px-3 shadow-[0_18px_55px_rgba(0,0,0,.18)] backdrop-blur-2xl transition-all duration-700 sm:px-5 ${
          scrolled
            ? "border-white/15 bg-[#070711]/85 py-2"
            : "border-white/10 bg-[#070711]/45 py-2.5"
        }`}
      >
        <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        <Link href="/" className="flex items-center gap-2 px-1.5 sm:gap-3 sm:px-2">
          <div className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-[11px] border border-fuchsia-200/55 bg-[radial-gradient(circle_at_50%_40%,rgba(255,230,253,.28),rgba(177,72,255,.12)_30%,transparent_62%)] shadow-[0_0_28px_rgba(192,109,255,.24)] sm:h-10 sm:w-10 sm:rounded-[14px]">
            <svg viewBox="0 0 48 48" className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true"><defs><linearGradient id="portal-stroke" x1="8" x2="40" y1="8" y2="40"><stop stopColor="#f4b8ff" /><stop offset=".52" stopColor="#bb6cff" /><stop offset="1" stopColor="#7e78ff" /></linearGradient></defs><circle cx="24" cy="24" r="15" fill="none" stroke="url(#portal-stroke)" strokeWidth="1.35" /><circle cx="24" cy="24" r="9" fill="none" stroke="url(#portal-stroke)" strokeDasharray="18 7" strokeWidth="1.2" /><path d="M24 16v16M16 24h16" stroke="url(#portal-stroke)" strokeWidth="1" opacity=".75" /><circle cx="24" cy="24" r="2.2" fill="#fff" /></svg>
          </div>
          <span className="flex items-baseline gap-1 text-white sm:gap-1.5"><span className="font-serif text-[1.05rem] leading-none tracking-[.06em] sm:text-[1.45rem]">ABHI</span><span className="text-[.48rem] font-semibold tracking-[.18em] text-fuchsia-100/80 sm:text-[.58rem] sm:tracking-[.22em]">LMS</span></span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-white/75 transition-all hover:bg-white/5 hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border border-white/15 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(117,60,255,.28)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-x-0 top-0 h-px bg-white/50" />
            <span className="relative z-10">Get Started</span>
            <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/75 sm:h-10 sm:w-10"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl border border-white/10 bg-[#090911]/95 p-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-white/10" />
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white"
              >
                Get Started <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
