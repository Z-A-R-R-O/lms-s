"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Compass,
  Layers3,
  MoveRight,
  Sparkles,
  Star,
  Target,
  UsersRound,
  WandSparkles,
} from "lucide-react";
import { ScrollVideoHero } from "@/components/marketing/scroll-video-hero";
import { PortalStats } from "@/components/marketing/portal-stats";
import { InteractiveTerminalCta } from "@/components/marketing/interactive-terminal-cta";

const tabs = ["All Programs", "Engineering", "Data Science", "Design", "Business", "AI / ML"];

const programs = [
  { slug: "full-stack-development", title: "Full Stack\nDevelopment", category: "Engineering", description: "Build modern web apps from scratch to deployment.", duration: "6 Months", icon: Code2, accent: "from-violet-600/70 via-fuchsia-700/30 to-transparent", orb: "bg-violet-500", image: "/images/programs/full-stack-development.webp" },
  { slug: "data-science-ai", title: "Data Science\n& AI", category: "Data Science", description: "Master ML, data analysis and real-world projects.", duration: "6 Months", icon: Layers3, accent: "from-blue-600/65 via-cyan-600/25 to-transparent", orb: "bg-cyan-400", image: "/images/programs/data-science-ai.webp" },
  { slug: "ui-ux-design", title: "UI/UX\nDesign", category: "Design", description: "Design beautiful, functional digital experiences.", duration: "4 Months", icon: WandSparkles, accent: "from-teal-500/60 via-emerald-600/25 to-transparent", orb: "bg-emerald-400", image: "/images/programs/ui-ux-design.webp" },
  { slug: "cloud-computing", title: "Cloud\nComputing", category: "Engineering", description: "Learn AWS, DevOps and cloud architecture.", duration: "5 Months", icon: BriefcaseBusiness, accent: "from-orange-500/65 via-amber-500/25 to-transparent", orb: "bg-orange-400", image: "/images/programs/cloud-computing.webp" },
  { slug: "product-management", title: "Product\nManagement", category: "Business", description: "Shape products people need from insight to launch.", duration: "4 Months", icon: Target, accent: "from-rose-500/65 via-orange-600/20 to-transparent", orb: "bg-rose-400", image: "/images/programs/product-management.webp" },
  { slug: "generative-ai", title: "Generative\nAI", category: "AI / ML", description: "Create practical AI systems and intelligent workflows.", duration: "3 Months", icon: Bot, accent: "from-indigo-500/65 via-violet-600/20 to-transparent", orb: "bg-indigo-400", image: "/images/programs/generative-ai.webp" },
];

const benefits = [
  { title: "Learn by building", body: "Turn every new concept into portfolio-ready work, not passive notes.", icon: Code2, span: "md:col-span-2" },
  { title: "Industry mentors", body: "Weekly feedback from people who work in the roles you want.", icon: UsersRound, span: "" },
  { title: "AI study companion", body: "Get unstuck, review concepts, and keep momentum at any hour.", icon: Bot, span: "" },
  { title: "Career launch system", body: "Interview practice, project reviews, hiring partner access, and clear next steps.", icon: Compass, span: "md:col-span-2" },
];

const pathway = [
  ["01", "Choose your path", "Find a program aligned with the work you want to do."],
  ["02", "Build in public", "Learn live, ship guided projects, and get useful feedback."],
  ["03", "Prove your skills", "Graduate with a portfolio that shows how you think."],
  ["04", "Launch your career", "Prepare for interviews and meet hiring partners."],
];

const mentors = [
  { name: "Ananya Rao", role: "Product Designer", company: "Adobe", image: "/images/people/ananya-rao.webp", focus: "object-[center_38%]" },
  { name: "Rahul Mehta", role: "AI Engineer", company: "IBM", image: "/images/people/rahul-mehta.webp", focus: "object-[center_34%]" },
  { name: "Nisha Kumar", role: "Cloud Architect", company: "Amazon", image: "/images/people/nisha-kumar.webp", focus: "object-[center_32%]" },
];

const testimonials = [
  { quote: "I came in with curiosity and left with a portfolio, a clear plan, and the confidence to interview.", name: "Ishita Sharma", outcome: "Placed as Product Designer", initials: "IS" },
  { quote: "The project reviews were the difference. I learned to explain decisions like a real engineer.", name: "Arjun Nair", outcome: "Placed as Full Stack Developer", initials: "AN" },
  { quote: "The program made AI feel practical. Every module led to something I could actually show recruiters.", name: "Maya Joseph", outcome: "Data Analyst at a fintech startup", initials: "MJ" },
];

const plans = [
  { name: "Starter", monthly: "₹4,999", annual: "₹3,999", description: "For learners starting a focused skill journey.", features: ["One guided program", "Community access", "Project templates"], featured: false },
  { name: "Pro", monthly: "₹8,999", annual: "₹7,499", description: "The complete path from skill-building to interviews.", features: ["Everything in Starter", "Weekly mentor reviews", "Career preparation", "AI study companion"], featured: true },
  { name: "Elite", monthly: "₹14,999", annual: "₹12,499", description: "High-touch support for ambitious career transitions.", features: ["Everything in Pro", "1:1 mentor sessions", "Portfolio strategy", "Priority placement support"], featured: false },
];

const faqs = [
  ["Who are these programs for?", "They are designed for beginners, career switchers, and working professionals who want structured, project-led learning."],
  ["How much time should I plan each week?", "Most learners spend 8 to 10 hours a week across live sessions, guided practice, and project work."],
  ["Do I get help with placements?", "Pro and Elite plans include career preparation, portfolio review, and access to relevant hiring opportunities."],
  ["Can I learn while working full-time?", "Yes. Sessions, guided work, and the AI companion are designed to support flexible learning schedules."],
];

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  const introRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: introRef, offset: ["start 90%", "start 42%"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [30, 0]), { damping: 28, stiffness: 130 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.985, 1]), { damping: 28, stiffness: 130 });
  const opacity = useTransform(scrollYProgress, [0, 0.72, 1], [0, 0.88, 1]);

  return <motion.div ref={introRef} style={{ y, scale, opacity }} className="max-w-2xl will-change-transform"><p className="text-xs font-semibold tracking-[.2em] text-fuchsia-300">{eyebrow}</p><h2 className="mt-4 font-serif text-4xl leading-[.95] tracking-tight sm:text-5xl">{title}</h2><p className="mt-5 text-base leading-7 text-white/60 sm:text-lg">{copy}</p></motion.div>;
}

export function LandingPage() {
  const [activeTab, setActiveTab] = useState("All Programs");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [annualBilling, setAnnualBilling] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const visiblePrograms = activeTab === "All Programs" ? programs.slice(0, 4) : programs.filter((program) => program.category === activeTab);
  const testimonial = testimonials[testimonialIndex];

  const changeTestimonial = (direction: number) => setTestimonialIndex((current) => (current + direction + testimonials.length) % testimonials.length);

  useEffect(() => {
    const revealTargets = [
      ["#programs > div", "program-reveal"],
    ] as const;

    const observers = revealTargets.flatMap(([selector, revealClass]) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) return [];

      element.classList.add(revealClass);
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      }, { threshold: 0.42 });

      observer.observe(element);
      return [observer];
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    const liquidSelectors = [
      "main > section:nth-of-type(5) > div:last-child > div",
      "#why-abhi article",
      "#pathway > div:last-child > div:last-child > article",
      "#mentors article",
      "#stories > div > div > div:last-child",
      "#pricing article",
      "#faq > div > div:last-child > article",
      "#start > div > div:last-child",
      "footer > div:first-child > div",
      "footer > div:last-child",
    ];

    const observers = liquidSelectors.flatMap((selector) => Array.from(document.querySelectorAll<HTMLElement>(selector)).map((element, index) => {
      element.classList.add("liquid-reveal");
      element.style.setProperty("--liquid-delay", `${80 + (index % 4) * 75}ms`);

      const observer = new IntersectionObserver(([entry]) => {
        element.classList.toggle("is-visible", entry.isIntersecting);
      }, { threshold: 0.14, rootMargin: "0px 0px -10% 0px" });

      observer.observe(element);
      return observer;
    }));

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#05060d] text-white selection:bg-fuchsia-500/50">
      <ScrollVideoHero>
        <PortalStats />
      </ScrollVideoHero>

      <section className="border-y border-white/[.06] bg-[#05060d] px-4 py-6 sm:px-8 lg:px-12">
        <p className="mb-5 text-center text-[10px] font-semibold tracking-[.28em] text-white/55">TRUSTED BY LEADING COMPANIES</p>
        <div className="mx-auto flex max-w-[1090px] flex-wrap items-center justify-center gap-x-7 gap-y-3 text-lg font-semibold tracking-tight text-white/40 sm:justify-between sm:gap-x-10 sm:text-2xl">{["Google", "Microsoft", "amazon", "IBM", "Adobe", "TESLA", "Meta"].map((name) => <span className="transition-colors hover:text-white/80" key={name}>{name}</span>)}</div>
      </section>

      <section id="programs" className="px-4 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1360px] rounded-[26px] border border-white/10 bg-gradient-to-br from-[#0d0d19] to-[#07070d] p-4 shadow-[0_30px_90px_rgba(0,0,0,.25)] sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><h2 className="font-serif text-3xl tracking-tight sm:text-5xl">Explore Our Programs</h2><div className="mt-5 flex flex-wrap gap-2">{tabs.map((tab) => <button type="button" onClick={() => setActiveTab(tab)} key={tab} className={`rounded-full border px-3 py-2 text-xs transition sm:px-4 ${activeTab === tab ? "border-white/10 bg-white/10 text-white" : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"}`}><span className={activeTab === tab ? "mr-2 text-fuchsia-400" : "hidden"}>●</span>{tab}</button>)}</div></div><Link href="/programs" className="group flex items-center gap-3 text-sm text-white/65 hover:text-white">View all programs <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-transform group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span></Link></div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{visiblePrograms.map((program, index) => { const Icon = program.icon; return <motion.article layout initial={{ opacity: 0, y: 22, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.42, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -6 }} key={program.title} className="group relative min-h-[250px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0b13] p-5 transition-colors hover:border-white/25 sm:min-h-[260px]"><Image src={program.image} alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover opacity-55 transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#080911] via-[#080911]/80 to-black/10" /><div className={`absolute inset-0 bg-gradient-to-br ${program.accent} opacity-35`} /><div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full ${program.orb} opacity-30 blur-3xl transition-transform duration-500 group-hover:scale-150`} /><div className="relative"><span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-black/35 backdrop-blur"><Icon className="h-5 w-5 text-white/90" /></span><h3 className="mt-4 whitespace-pre-line text-xl font-medium leading-6">{program.title}</h3><p className="mt-2 max-w-[230px] text-sm leading-5 text-white/70">{program.description}</p></div><Link href={`/programs/${program.slug}`} aria-label={`Explore ${program.title.replace("\n", " ")}`} className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white/75"><span>{program.duration} <span className="mx-1.5 text-white/35">•</span> Beginner to Advanced</span><span className="grid h-9 w-9 place-items-center rounded-full border border-white/35 transition-transform group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span></Link></motion.article>; })}</div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-20 sm:px-8 lg:px-12 lg:py-32"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(136,72,255,.28),transparent_25%),radial-gradient(circle_at_24%_100%,rgba(36,108,255,.14),transparent_30%)]" /><div className="relative mx-auto grid max-w-[1360px] items-end gap-8 lg:grid-cols-[1.1fr_.9fr]"><div><p className="text-xs font-semibold tracking-[.22em] text-fuchsia-300">THE ABHI DIFFERENCE</p><h2 className="mt-6 max-w-4xl font-serif text-[clamp(3.4rem,7vw,7.6rem)] leading-[.84] tracking-[-.06em]">You&apos;re not taking a course.<br /><span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-200 bg-clip-text text-transparent">You&apos;re rehearsing your next role.</span></h2></div><div className="rounded-3xl border border-white/15 bg-white/[.045] p-7 backdrop-blur-xl"><p className="text-4xl font-semibold tracking-tight">01</p><p className="mt-10 max-w-sm text-lg leading-7 text-white/70">Every week ends with evidence of progress: work you have made, decisions you can defend, and feedback that makes the next version stronger.</p><Link href="#pathway" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">See the learning path <MoveRight className="h-4 w-4" /></Link></div></div></section>

      <section id="why-abhi" className="marketing-stage px-4 py-16 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1360px]"><SectionIntro eyebrow="WHY ABHI LMS" title="Your career needs more than a course." copy="A considered system that turns learning time into work you can show, discuss, and build on." /><div className="mt-10 grid gap-4 md:grid-cols-3">{benefits.map((benefit) => { const Icon = benefit.icon; return <motion.article whileHover={{ y: -7, scale: 1.005 }} key={benefit.title} className={`luminous-panel rounded-3xl border border-white/10 p-7 ${benefit.span}`}><Icon className="relative z-10 h-7 w-7 text-violet-300" strokeWidth={1.5} /><h3 className="relative z-10 mt-12 text-2xl font-medium">{benefit.title}</h3><p className="relative z-10 mt-3 max-w-md leading-6 text-white/60">{benefit.body}</p><span className="absolute bottom-7 right-7 text-xs font-semibold tracking-[.18em] text-white/30">ABHI / {benefit.title.slice(0, 2).toUpperCase()}</span></motion.article>; })}</div></div></section>

      <section id="pathway" className="relative overflow-hidden border-y border-white/[.06] bg-[#080912] px-4 py-16 sm:px-8 lg:px-12 lg:py-28"><div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_right,rgba(95,58,255,.2),transparent_65%)]" /><div className="relative mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[.76fr_1.24fr]"><SectionIntro eyebrow="THE LEARNING PATH" title="From first step to first offer." copy="No vague finish line. See exactly what happens at every stage of your learning journey." /><div className="relative grid gap-3 sm:grid-cols-2"><div className="pointer-events-none absolute bottom-10 left-[25%] top-10 hidden w-px bg-gradient-to-b from-fuchsia-300/60 via-violet-300/20 to-transparent sm:block" />{pathway.map(([number, title, copy], index) => <article key={number} className={`relative rounded-2xl border border-white/10 p-6 ${index === 0 || index === 3 ? "luminous-panel" : "bg-white/[.025]"}`}><span className="relative z-10 text-sm font-semibold text-fuchsia-300">{number}</span><h3 className="relative z-10 mt-9 text-xl font-medium">{title}</h3><p className="relative z-10 mt-3 text-sm leading-6 text-white/60">{copy}</p><MoveRight className="relative z-10 mt-8 h-5 w-5 text-white/45" /></article>)}</div></div></section>

      <section id="mentors" className="marketing-stage px-4 py-16 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1360px]"><div className="flex flex-wrap items-end justify-between gap-5"><SectionIntro eyebrow="LEARN FROM PRACTITIONERS" title="Mentors who have done the work." copy="Get perspective, review, and practical direction from people building in the industry today." /><Link href="/about" className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white">Meet the network <ArrowUpRight className="h-4 w-4" /></Link></div><div className="mt-10 grid gap-4 md:grid-cols-3">{mentors.map((mentor, index) => <motion.article whileHover={{ y: -8, rotate: index === 1 ? 0 : index === 0 ? -0.5 : 0.5 }} key={mentor.name} className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0b0c15] shadow-[0_24px_70px_rgba(0,0,0,.2)]"><div className="relative h-64 overflow-hidden"><Image src={mentor.image} alt={`${mentor.name}, ${mentor.role}`} fill sizes="(min-width: 768px) 33vw, 100vw" className={`object-cover ${mentor.focus} transition duration-700 group-hover:scale-[1.035]`} /><div className="absolute inset-0 bg-gradient-to-t from-[#0b0c15]/80 via-transparent to-black/10" /><span className="absolute right-6 top-6 text-[13px] font-semibold tracking-[.18em] text-white/80">0{index + 1} / 03</span></div><div className="p-6"><p className="text-xl font-medium">{mentor.name}</p><p className="mt-1 text-sm text-white/65">{mentor.role} · {mentor.company}</p><div className="mt-6 flex items-center gap-2 text-[13px] text-white/60"><span className="rounded-full border border-white/10 px-3 py-1.5">Portfolio reviews</span><span className="rounded-full border border-white/10 px-3 py-1.5">Live sessions</span></div></div></motion.article>)}</div></div></section>

      <section id="stories" className="px-4 py-16 sm:px-8 lg:px-12 lg:py-24"><div className="relative mx-auto max-w-[1360px] overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-violet-950/70 via-[#0c0b17] to-[#090a10] p-6 sm:p-10"><Image src="/images/fallbacks/learning-card.webp" alt="" fill sizes="100vw" className="object-cover opacity-[.12]" /><div className="absolute inset-0 bg-gradient-to-r from-[#10091e]/95 via-[#0c0b17]/88 to-[#090a10]/78" /><div className="relative grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><SectionIntro eyebrow="STUDENT STORIES" title="The work changes how you show up." copy="A better outcome starts with a more deliberate learning experience." /><div className="flex flex-col justify-between"><div><div className="flex gap-1 text-amber-300">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div><blockquote className="mt-6 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">“{testimonial.quote}”</blockquote><div className="mt-8 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-sm font-semibold">{testimonial.initials}</span><div><p className="font-medium">{testimonial.name}</p><p className="text-sm text-white/55">{testimonial.outcome}</p></div></div></div><div className="mt-10 flex gap-3"><button type="button" aria-label="Previous story" onClick={() => changeTestimonial(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition hover:bg-white/10"><ArrowLeft className="h-4 w-4" /></button><button type="button" aria-label="Next story" onClick={() => changeTestimonial(1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition hover:bg-white/10"><ArrowRight className="h-4 w-4" /></button></div></div></div></div></section>

      <section id="pricing" className="px-4 py-16 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto max-w-[1360px]"><div className="flex flex-wrap items-end justify-between gap-6"><SectionIntro eyebrow="SIMPLE PRICING" title="Invest in momentum." copy="Choose the level of structure and support that fits your goal." /><div className="flex rounded-full border border-white/10 bg-white/[.04] p-1 text-sm"><button type="button" onClick={() => setAnnualBilling(true)} className={`rounded-full px-4 py-2 transition ${annualBilling ? "bg-white text-black" : "text-white/60"}`}>Annual <span className="text-emerald-500">Save 16%</span></button><button type="button" onClick={() => setAnnualBilling(false)} className={`rounded-full px-4 py-2 transition ${!annualBilling ? "bg-white text-black" : "text-white/60"}`}>Monthly</button></div></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{plans.map((plan) => <article key={plan.name} className={`relative rounded-3xl border p-7 ${plan.featured ? "border-fuchsia-400/60 bg-gradient-to-b from-fuchsia-500/15 to-[#0b0b14] shadow-[0_20px_70px_rgba(177,72,255,.15)]" : "border-white/10 bg-white/[.025]"}`}>{plan.featured && <span className="absolute right-6 top-6 rounded-full bg-fuchsia-400 px-3 py-1 text-xs font-semibold text-black">Most popular</span>}<p className="text-xl font-medium">{plan.name}</p><p className="mt-3 max-w-xs text-sm leading-6 text-white/60">{plan.description}</p><p className="mt-8 text-4xl font-semibold tracking-tight">{annualBilling ? plan.annual : plan.monthly}<span className="text-sm font-normal text-white/50"> / month</span></p><Link href="/signup" className={`mt-8 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition ${plan.featured ? "bg-white text-black hover:bg-white/85" : "border border-white/15 hover:bg-white/10"}`}>Choose {plan.name} <ArrowUpRight className="h-4 w-4" /></Link><ul className="mt-8 space-y-3 text-sm text-white/70">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-3"><Check className="h-4 w-4 text-emerald-300" />{feature}</li>)}</ul></article>)}</div></div></section>

      <section id="faq" className="border-y border-white/[.06] bg-white/[.015] px-4 py-16 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[.8fr_1.2fr]"><SectionIntro eyebrow="FAQ" title="Questions, answered." copy="Everything you need to know before you begin." /><div className="divide-y divide-white/10 border-y border-white/10">{faqs.map(([question, answer], index) => { const isOpen = openFaq === index; return <article key={question}><button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 py-5 text-left font-medium"><span>{question}</span><ChevronDown className={`h-5 w-5 shrink-0 text-white/60 transition-transform ${isOpen ? "rotate-180" : ""}`} /></button><div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}><p className="overflow-hidden leading-7 text-white/60">{answer}</p></div></article>; })}</div></div></section>

      <section id="start" className="px-4 py-16 sm:px-8 lg:px-12 lg:py-24"><div className="relative mx-auto max-w-[1360px] overflow-hidden rounded-[30px] border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-700 via-violet-800 to-indigo-950 px-6 py-14 text-center shadow-[0_30px_100px_rgba(105,53,255,.35)] sm:px-12 sm:py-20"><div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-[100px]" /><div className="relative mx-auto max-w-3xl"><Sparkles className="mx-auto h-7 w-7 text-fuchsia-100" /><h2 className="mt-6 font-serif text-4xl leading-[.95] tracking-tight sm:text-6xl">Ready to become part of the top 1%?</h2><p className="mx-auto mt-6 max-w-xl text-lg leading-7 text-white/75">Choose a path, build the work, and make your next opportunity feel possible.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/courses" className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-white/85">Explore Programs <ArrowUpRight className="h-4 w-4" /></Link><Link href="/pricing" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-4 font-semibold transition hover:bg-white/10">Compare plans</Link></div></div></div></section>

      <footer id="about" className="border-t border-white/[.08] px-4 pb-8 pt-14 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-[1360px] gap-10 md:grid-cols-[1.2fr_.8fr_.8fr_1.25fr]"><div><p className="text-2xl font-semibold tracking-[.06em]">ABHI LMS</p><p className="mt-4 max-w-xs text-sm leading-6 text-white/55">The practical learning platform for people building their next chapter.</p></div><div><p className="text-sm font-semibold">Explore</p><div className="mt-4 grid gap-3 text-sm text-white/55"><Link href="#programs">Programs</Link><Link href="#pathway">Learning path</Link><Link href="#mentors">Mentors</Link></div></div><div><p className="text-sm font-semibold">Company</p><div className="mt-4 grid gap-3 text-sm text-white/55"><Link href="/about">About</Link><Link href="#stories">Stories</Link><Link href="#pricing">Pricing</Link></div></div><div><p className="text-sm font-semibold">Stay in the loop</p><p className="mt-3 text-sm leading-6 text-white/55">New programs, resources, and career insights—occasionally.</p><form onSubmit={(event) => { event.preventDefault(); setIsSubscribed(true); }} className="mt-4 flex rounded-xl border border-white/15 bg-white/[.04] p-1"><input value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} required type="email" placeholder="Email address" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-white/35" /><button type="submit" className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black">{isSubscribed ? "Joined" : "Join"}</button></form></div></div><div className="mx-auto mt-12 flex max-w-[1360px] flex-wrap justify-between gap-4 border-t border-white/[.08] pt-6 text-xs text-white/40"><span>© 2026 ABHI LMS. Built for the next generation of builders.</span><span className="flex gap-4"><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a></span></div></footer>
      <InteractiveTerminalCta />
    </main>
  );
}
