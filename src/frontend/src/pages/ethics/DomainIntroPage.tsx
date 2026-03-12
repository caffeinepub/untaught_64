import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

const RED = "0.72 0.2 29";

const REAL_WORLD_EXAMPLES = [
  {
    title: "The trolley problem — and why it's not academic",
    description:
      "Should a self-driving car be programmed to minimise total deaths, even if that means sacrificing its passenger? This is the trolley problem embedded in real engineering. How you answer reveals which moral framework you're applying.",
  },
  {
    title: "Whistleblowing",
    description:
      "An employee discovers their company is causing harm. Staying silent protects their family's income. Speaking out may prevent harm to thousands. Every moral framework gives a different answer about where the duty lies.",
  },
  {
    title: "Medical triage in a pandemic",
    description:
      "A hospital has one ventilator and two critical patients. No option is clean. The doctor will cause a death either way. Applied ethics is the project of reasoning well about situations where every choice carries a moral cost.",
  },
];

export function DomainIntroPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-10">
        <BackButton to="/" label="All domains" />
      </div>

      <p
        className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: `oklch(${RED})` }}
      >
        Ethics
      </p>

      <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-foreground leading-tight mb-6">
        Every moral choice you've ever made was guided by a framework.
        <span className="text-muted-foreground font-normal">
          {" "}
          Most people don't know which one.
        </span>
      </h1>

      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        Ethics is the study of right and wrong — and more importantly, how to
        reason about it. Not feelings, not rules handed down from authority, but
        structured thinking about why some actions are good, why others are
        wrong, and what to do when two things you care about pull in opposite
        directions.
      </p>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-5">
          What ethics actually involves
        </h2>
        <div className="space-y-4">
          {[
            {
              n: 1,
              text: "Understanding the frameworks: consequentialism, deontology, and virtue ethics each ask a different question about what makes something right.",
            },
            {
              n: 2,
              text: "Reasoning through dilemmas where every option has a moral cost — and where pretending otherwise is itself a failure of ethical thinking.",
            },
            {
              n: 3,
              text: "Applying these frameworks to real situations: professional life, relationships, institutions, and society.",
            },
          ].map(({ n, text }) => (
            <div key={n} className="flex gap-4">
              <span
                className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: `oklch(${RED} / 0.15)`,
                  color: `oklch(${RED})`,
                }}
              >
                {n}
              </span>
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-5">
          Ethics in the real world
        </h2>
        <div className="space-y-3">
          {REAL_WORLD_EXAMPLES.map((example) => (
            <div
              key={example.title}
              className="rounded-lg border border-border/50 bg-card p-4 sm:p-5"
            >
              <h3 className="font-semibold text-foreground mb-1">
                {example.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {example.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-5">
          What you'll learn
        </h2>
        <div className="space-y-2">
          {[
            {
              n: 1,
              title: "Moral Frameworks",
              desc: "Consequentialism, deontology, and virtue ethics",
            },
            {
              n: 2,
              title: "Moral Dilemmas",
              desc: "The trolley problem and reasoning under genuine conflict",
            },
            {
              n: 3,
              title: "Applied Ethics",
              desc: "Professional life, whistleblowing, and real decisions",
            },
            {
              n: 4,
              title: "Meta-Ethics",
              desc: "What makes moral claims true or false — if anything",
            },
          ].map((module) => (
            <div
              key={module.n}
              className="flex items-center gap-4 rounded-md border border-border/40 bg-card/50 px-4 py-3"
            >
              <span
                className="font-display text-2xl font-semibold opacity-60 w-6 text-center shrink-0"
                style={{ color: `oklch(${RED})` }}
              >
                {module.n}
              </span>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {module.title}
                </p>
                <p className="text-xs text-muted-foreground">{module.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Link
        to="/domain/ethics/module/$moduleId/lesson"
        params={{ moduleId: "1" }}
      >
        <Button
          size="lg"
          className="gap-2 w-full sm:w-auto"
          style={{
            backgroundColor: `oklch(${RED})`,
            color: "oklch(0.98 0.005 29)",
          }}
        >
          Start Module 1
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </main>
  );
}
