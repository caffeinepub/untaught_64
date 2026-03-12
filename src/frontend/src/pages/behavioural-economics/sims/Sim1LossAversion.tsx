import { useState } from "react";

const AMBER = "0.72 0.18 75";

type Choice = "A" | "B" | null;

export function Sim1LossAversion() {
  const [started, setStarted] = useState(false);
  const [round1, setRound1] = useState<Choice>(null);
  const [round2, setRound2] = useState<Choice>(null);
  const showResult = round1 !== null && round2 !== null;

  const switchedBehaviour = round1 !== round2;

  if (!started) {
    return (
      <div
        className="rounded-xl p-6 sm:p-8 space-y-5"
        style={{
          backgroundColor: `oklch(${AMBER} / 0.06)`,
          border: `1px solid oklch(${AMBER} / 0.2)`,
        }}
      >
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
            style={{ color: `oklch(${AMBER})` }}
          >
            Scenario Setup
          </p>
          <h3 className="font-display text-xl font-semibold text-foreground mb-3">
            The Identical Choice
          </h3>
          <p className="text-sm text-foreground leading-relaxed mb-3">
            You're a financial adviser deciding between investment options for a
            client. In this simulation, you'll face the{" "}
            <strong>same mathematical choice twice</strong> — but framed in two
            different ways.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            <strong className="text-foreground/80">What's at stake:</strong>{" "}
            Both rounds offer identical expected outcomes. The only thing that
            changes is whether choices are described as <em>gains</em> or{" "}
            <em>losses</em>. Watch whether that framing changes your decision.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground/80">Your role:</strong> Make the
            choice that feels right to you. There's no trick — just honest
            introspection.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStarted(true)}
          data-ocid="be_sim1.start.button"
          className="w-full rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 min-h-[44px]"
          style={{
            backgroundColor: `oklch(${AMBER})`,
            color: "oklch(0.15 0.02 75)",
          }}
        >
          Start Simulation
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Round 1 — Gain frame */}
      <div className="rounded-lg border border-border/50 bg-card p-4 sm:p-5">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: `oklch(${AMBER})` }}
        >
          Round 1 — Gain Frame
        </p>
        <p className="text-foreground mb-4 leading-relaxed">
          You have nothing. Choose one option:
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              id: "A" as const,
              label: "Option A",
              desc: "Certain gain of £50",
            },
            {
              id: "B" as const,
              label: "Option B",
              desc: "50% chance of £100, 50% chance of £0",
            },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setRound1(opt.id)}
              data-ocid={`be_sim1.round1.${opt.id === "A" ? "primary_button" : "secondary_button"}`}
              className="rounded-lg border p-3 text-left transition-all duration-150 min-h-[44px]"
              style={{
                borderColor:
                  round1 === opt.id
                    ? `oklch(${AMBER} / 0.6)`
                    : "oklch(0.28 0.01 275 / 0.5)",
                backgroundColor:
                  round1 === opt.id ? `oklch(${AMBER} / 0.1)` : "transparent",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{
                  color:
                    round1 === opt.id
                      ? `oklch(${AMBER})`
                      : "oklch(0.6 0.01 275)",
                }}
              >
                {opt.label}
              </p>
              <p className="text-sm text-foreground">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Round 2 — Loss frame */}
      <div className="rounded-lg border border-border/50 bg-card p-4 sm:p-5">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: `oklch(${AMBER})` }}
        >
          Round 2 — Loss Frame
        </p>
        <p className="text-foreground mb-4 leading-relaxed">
          You have £100. Choose one option:
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              id: "A" as const,
              label: "Option A",
              desc: "Certain loss of £50 (keep £50)",
            },
            {
              id: "B" as const,
              label: "Option B",
              desc: "50% chance of losing £100, 50% chance of losing £0",
            },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setRound2(opt.id)}
              data-ocid={`be_sim1.round2.${opt.id === "A" ? "primary_button" : "secondary_button"}`}
              className="rounded-lg border p-3 text-left transition-all duration-150 min-h-[44px]"
              style={{
                borderColor:
                  round2 === opt.id
                    ? `oklch(${AMBER} / 0.6)`
                    : "oklch(0.28 0.01 275 / 0.5)",
                backgroundColor:
                  round2 === opt.id ? `oklch(${AMBER} / 0.1)` : "transparent",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{
                  color:
                    round2 === opt.id
                      ? `oklch(${AMBER})`
                      : "oklch(0.6 0.01 275)",
                }}
              >
                {opt.label}
              </p>
              <p className="text-sm text-foreground">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {showResult && (
        <div
          className="rounded-lg p-4 sm:p-5"
          style={{
            backgroundColor: `oklch(${AMBER} / 0.08)`,
            border: `1px solid oklch(${AMBER} / 0.25)`,
          }}
        >
          <p
            className="font-semibold mb-2"
            style={{ color: `oklch(${AMBER})` }}
          >
            {switchedBehaviour
              ? "You chose differently in each round."
              : "You chose the same option in both rounds."}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {switchedBehaviour
              ? `Round 1 (gain frame): Option ${round1}. Round 2 (loss frame): Option ${round2}. Both options are mathematically identical — the expected value is exactly the same. Yet most people choose differently depending on how the choice is framed.`
              : "Both rounds offered the same mathematical choice in different language. Most people switch — choosing the safe option when gains are framed positively, then gambling to avoid a certain loss."}
          </p>
          <div
            className="rounded-md px-3 py-2 text-sm font-medium"
            style={{
              backgroundColor: `oklch(${AMBER} / 0.12)`,
              color: `oklch(${AMBER})`,
            }}
          >
            Key pattern: Same expected value. Different frame. Different choice.
          </div>
        </div>
      )}
    </div>
  );
}
