"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Loader2,
  MailCheck,
} from "lucide-react";
import { ApplicationFields } from "@/components/marketing/application-form-fields";
import { useAuth } from "@/hooks/useAuth";

export const steps = ["Course", "Details", "Education", "Account", "Review & Submit"];

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
  password: string;
  confirmPassword: string;
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
  password: "",
  confirmPassword: "",
};

export function ApplicationForm() {
  const { isLoading, signup, user } = useAuth();
  const [application, setApplication] = useState(initialApplication);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [verificationToken, setVerificationToken] = useState<string>();
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
      user ? [] : ["password", "confirmPassword"],
    ];
    if (requiredFields[step]?.some((field) => !application[field].trim())) {
      setError("Complete the required fields to continue.");
      return;
    }
    if (step === 3 && !user && application.password !== application.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const submitApplication = async () => {
    setSubmitting(true);
    setError("");
    try {
      if (!user) {
        const result = await signup(
          application.email,
          application.password,
          "student",
          undefined,
          application.fullName,
        );
        if (result.error) {
          setError(result.error.message);
          return;
        }
        setVerificationToken(result.verificationToken);
      }
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <SuccessState email={application.email} verificationToken={verificationToken} />;

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
        {!isLoading && (
          <p className="mt-4 text-sm text-white/55">
            {user ? (
              <>Welcome back, {user.fullName?.split(" ")[0] || "learner"}. Your application is ready when you are.</>
            ) : (
              <>Already a learner? <Link href="/login" className="font-semibold text-fuchsia-200 transition hover:text-white">Sign in</Link></>
            )}
          </p>
        )}
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
                STEP {step + 1} OF {steps.length}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white">
                {steps[step]}
              </h2>
            </div>
          </div>
          <ApplicationFields
            application={application}
            isAuthenticated={Boolean(user)}
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
            onSubmit={submitApplication}
            submitting={submitting}
          />
        </div>
      </div>
    </section>
  );
}

function ProgressIndicator({ step }: { step: number }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-5">
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
  submitting,
}: {
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  step: number;
  submitting: boolean;
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
          {step === steps.length - 1 ? "Back / Edit" : "Back"}
        </button>
      ) : (
        <span />
      )}
      {step < steps.length - 1 ? (
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
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(16,185,129,.22)] transition hover:-translate-y-0.5"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          {submitting ? "Creating your account..." : "Submit Application"}
        </button>
      )}
    </div>
  );
}

function SuccessState({
  email,
  verificationToken,
}: {
  email: string;
  verificationToken?: string;
}) {
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
          Application Submitted Successfully
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-white/70">
          Your learner account is ready. Use your email connection to verify your account and receive enrollment updates.
        </p>
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/10 bg-black/20 p-4 text-left">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-fuchsia-300/10 text-fuchsia-100"><MailCheck className="h-5 w-5" /></span>
            <div>
              <p className="text-sm font-semibold text-white">Email connection</p>
              <p className="text-sm text-white/60">{email}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={`mailto:${email}`} className="rounded-lg px-3 py-2 text-sm font-semibold text-fuchsia-100 transition hover:bg-white/5">Open your email</a>
            {verificationToken && <a href={`/api/auth/verify-email?token=${verificationToken}`} className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/85">Verify email</a>}
          </div>
        </div>
      </div>
    </section>
  );
}
