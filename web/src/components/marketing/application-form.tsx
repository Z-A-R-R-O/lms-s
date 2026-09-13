"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Sparkles,
} from "lucide-react";
import { ApplicationFields } from "@/components/marketing/application-form-fields";

export const steps = ["Course", "Details", "Education", "Review & Submit"];

export type Application = {
  course: string;
  learningMode: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  qualification: string;
  institution: string;
  completionYear: string;
  experience: string;
};

const initialApplication: Application = {
  course: "",
  learningMode: "",
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  qualification: "",
  institution: "",
  completionYear: "",
  experience: "",
};

export function ApplicationForm() {
  const [application, setApplication] = useState(initialApplication);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof Application, value: string) => {
    setApplication((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const moveForward = () => {
    const requiredFields: (keyof Application)[][] = [
      ["course", "learningMode"],
      ["fullName", "email", "phone"],
      ["qualification", "institution", "completionYear"],
    ];
    if (requiredFields[step]?.some((field) => !application[field].trim())) {
      setError("Complete the required fields to continue.");
      return;
    }
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  if (submitted) return <SuccessState />;

  return (
    <section className="mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-8 sm:pt-40 lg:px-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-[.2em] text-fuchsia-300">
          YOUR NEXT STEP
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight text-white sm:text-6xl">
          Enroll in a Course
        </h1>
        <p className="mt-5 text-base leading-7 text-white/65 sm:text-lg">
          Complete the form below to begin your learning journey.
        </p>
      </div>
      <div className="mt-12 rounded-[28px] border border-white/10 bg-[#0c0d16]/85 p-5 shadow-[0_24px_80px_rgba(0,0,0,.25)] backdrop-blur sm:p-8">
        <ProgressIndicator step={step} />
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="mb-7 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-fuchsia-400/10 text-fuchsia-200">
              <ClipboardCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold tracking-[.16em] text-fuchsia-300">
                STEP {step + 1} OF 4
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white">
                {steps[step]}
              </h2>
            </div>
          </div>
          <ApplicationFields
            application={application}
            onChange={updateField}
            step={step}
          />
          {error && (
            <p
              role="alert"
              className="mt-6 rounded-xl border border-rose-300/25 bg-rose-300/10 px-4 py-3 text-sm text-rose-100"
            >
              {error}
            </p>
          )}
          <Navigation
            step={step}
            onBack={() => {
              setError("");
              setStep((current) => current - 1);
            }}
            onNext={moveForward}
            onSubmit={() => setSubmitted(true)}
          />
        </div>
      </div>
    </section>
  );
}

function ProgressIndicator({ step }: { step: number }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-4">
      {steps.map((label, index) => (
        <li
          key={label}
          className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${index === step ? "bg-white/10 text-white" : index < step ? "text-fuchsia-200" : "text-white/40"}`}
        >
          <span
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-semibold ${index <= step ? "border-fuchsia-300/60 bg-fuchsia-300/15" : "border-white/15"}`}
          >
            {index + 1}
          </span>
          <span className="font-medium">{label}</span>
        </li>
      ))}
    </ol>
  );
}

function Navigation({
  onBack,
  onNext,
  onSubmit,
  step,
}: {
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  step: number;
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
      {step > 0 ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {step === 3 ? "Back / Edit" : "Back"}
        </button>
      ) : (
        <span />
      )}
      {step < 3 ? (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(117,60,255,.25)] transition hover:-translate-y-0.5"
        >
          Next <ArrowRight className="h-4 w-4" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(16,185,129,.22)] transition hover:-translate-y-0.5"
        >
          <Sparkles className="h-4 w-4" />
          Submit Application
        </button>
      )}
    </div>
  );
}

function SuccessState() {
  return (
    <section className="mx-auto flex min-h-[62vh] max-w-2xl items-center px-4 py-20 sm:px-8">
      <div className="w-full rounded-[28px] border border-emerald-300/25 bg-emerald-300/[.06] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,.25)] sm:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-300/15 text-emerald-200">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <p className="mt-7 text-xs font-semibold tracking-[.2em] text-emerald-200">
          APPLICATION COMPLETE
        </p>
        <h2 className="mt-4 font-serif text-4xl tracking-tight text-white sm:text-5xl">
          🎉 Application Submitted Successfully!
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-white/70">
          The application has been submitted successfully.
        </p>
      </div>
    </section>
  );
}
