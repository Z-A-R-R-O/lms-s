"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { marketingPrograms, programCategories } from "@/lib/programs/catalog";

export function PopularPrograms() {
  const [category, setCategory] = useState(programCategories[0]);
  const programs = marketingPrograms.filter((program) =>
    program.programGroups.includes(category),
  );

  return (
    <section id="programs" className="px-4 py-16 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1360px]">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[.2em] text-fuchsia-300">
            EXPLORE YOUR PATH
          </p>
          <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-6xl">
            Our Popular Courses &amp; Programs
          </h2>
        </div>
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {programCategories.map((item) => {
            const active = item === category;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`relative shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${active ? "border-fuchsia-300/35 text-white" : "border-white/10 text-white/55 hover:border-white/25 hover:text-white"}`}
              >
                <span className="relative z-10">{item}</span>
                {active && (
                  <motion.span
                    layoutId="program-category"
                    className="bg-fuchsia-500/18 absolute inset-0 rounded-full"
                    transition={{
                      type: "spring",
                      bounce: 0.15,
                      duration: 0.45,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </motion.div>
        </AnimatePresence>
        <div className="mt-10 flex justify-center">
          <Link
            href="/programs"
            className="group inline-flex items-center gap-3 text-sm font-semibold text-white/75 transition hover:text-white"
          >
            View All Programs{" "}
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({
  program,
}: {
  program: (typeof marketingPrograms)[number];
}) {
  return (
    <article className="group relative min-h-[340px] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0b13] p-6 transition hover:-translate-y-1 hover:border-white/25">
      <Image
        src={program.coverImage}
        alt={program.coverAlt}
        fill
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover opacity-45 transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090a12] via-[#090a12]/85 to-[#090a12]/15" />
      <div
        className={`absolute inset-0 bg-gradient-to-br ${program.accent} opacity-20`}
      />
      <div className="relative flex h-full flex-col">
        <p className="text-xs font-semibold tracking-[.16em] text-fuchsia-200">
          {program.level}
        </p>
        <h3 className="mt-5 max-w-sm font-serif text-3xl leading-[.95] tracking-tight">
          {program.title}
        </h3>
        <p className="mt-5 max-w-md text-sm leading-6 text-white/70">
          {program.description}
        </p>
        <Link
          href={`/programs/${program.slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-white"
        >
          View Program{" "}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
