import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { useState } from "react";

const RED = "0.72 0.2 29";

const PROMPTS = [
  {
    label: "Consequentialist lens",
    question:
      "What are the likely outcomes of each option? Who is helped, who is harmed, and by how much? Which option produces the best total result?",
  },
  {
    label: "Deontological lens",
    question:
      "Are there duties, rights, or rules at stake? Does any option use a person merely as a means? Are there commitments or promises involved?",
  },
  {
    label: "Virtue ethics lens",
    question:
      "What would a person of integrity, compassion, and practical wisdom do here? Which option best reflects the person you want to be?",
  },
  {
    label: "Your verdict",
    question:
      "Where do the three frameworks agree? Where do they conflict? Which feels most persuasive to you — and what does that reveal about your deepest values?",
  },
];

export function DomainChallengePage() {
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allFilled = PROMPTS.every(
    (_, i) => (responses[i] ?? "").trim().length > 10,
  );

  if (submitted) {
    return (
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        <div
          className="rounded-xl p-8 text-center"
          style={{
            backgroundColor: `oklch(${RED} / 0.07)`,
            border: `1px solid oklch(${RED} / 0.2)`,
          }}
        >
          <div
            className="inline-flex items-center justify-center h-12 w-12 rounded-full mb-4"
            style={{ backgroundColor: `oklch(${RED} / 0.15)` }}
          >
            <Trophy className="h-6 w-6" style={{ color: `oklch(${RED})` }} />
          </div>
          <p
            className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
            style={{ color: `oklch(${RED})` }}
          >
            Ethics Domain Complete
          </p>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
            You've reasoned through it all
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
            The ability to apply multiple ethical frameworks to the same
            situation — and know which one you're trusting most, and why — is
            one of the most practically valuable skills you can develop.
          </p>
          <Link to="/">
            <Button
              style={{
                backgroundColor: `oklch(${RED})`,
                color: "oklch(0.98 0.005 29)",
              }}
            >
              Return to All Domains
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-10">
        <BackButton
          to="/domain/ethics/module/4/wild"
          label="Back to Spot It in the Wild"
        />
      </div>

      <p
        className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: `oklch(${RED})` }}
      >
        Ethics
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
        Domain Challenge
      </h1>
      <p className="text-muted-foreground leading-relaxed mb-8">
        Think of a real ethical dilemma you've faced or witnessed — something
        where you genuinely weren't sure what was right. Apply each of the three
        frameworks to it. See where they agree, where they diverge, and what
        that reveals.
      </p>

      <div className="space-y-6 mb-8">
        {PROMPTS.map((prompt, i) => (
          <div key={prompt.label} data-ocid={`challenge.prompt.item.${i + 1}`}>
            <div className="mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ color: `oklch(${RED})` }}
              >
                {prompt.label}
              </span>
              <p className="text-sm text-foreground/85 mt-1 leading-relaxed">
                {prompt.question}
              </p>
            </div>
            <Textarea
              data-ocid={`challenge.textarea.${i + 1}`}
              value={responses[i] ?? ""}
              onChange={(e) =>
                setResponses((prev) => ({ ...prev, [i]: e.target.value }))
              }
              placeholder="Write your thoughts here..."
              className="min-h-[100px] bg-card/50 border-border/50 focus:border-border resize-none"
            />
          </div>
        ))}
      </div>

      <Button
        size="lg"
        onClick={() => setSubmitted(true)}
        disabled={!allFilled}
        data-ocid="challenge.submit.button"
        className="gap-2 w-full sm:w-auto"
        style={{
          backgroundColor: `oklch(${RED})`,
          color: "oklch(0.98 0.005 29)",
        }}
      >
        <Trophy className="h-4 w-4" />
        Complete Domain Challenge
      </Button>
    </main>
  );
}
