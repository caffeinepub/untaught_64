import { Button } from "@/components/ui/button";
import { useState } from "react";

const TOTAL_ROUNDS = 5;

type Decision = "development" | "defense";
type RoundResult = {
  round: number;
  yourDecision: Decision;
  aiDecision: Decision;
  yourPoints: number;
  aiPoints: number;
};

function getPayoffs(yours: Decision, theirs: Decision): [number, number] {
  if (yours === "development" && theirs === "development") return [4, 4];
  if (yours === "defense" && theirs === "development") return [6, 1];
  if (yours === "development" && theirs === "defense") return [1, 6];
  return [2, 2];
}

function getAIDecision(): Decision {
  return Math.random() < 0.65 ? "defense" : "development";
}

export function Sim2BArmsRace() {
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  const yourTotal = rounds.reduce((s, r) => s + r.yourPoints, 0);
  const aiTotal = rounds.reduce((s, r) => s + r.aiPoints, 0);

  function decide(decision: Decision) {
    if (gameOver || rounds.length >= TOTAL_ROUNDS) return;
    const aiDecision = getAIDecision();
    const [yourPoints, aiPoints] = getPayoffs(decision, aiDecision);
    const result: RoundResult = {
      round: rounds.length + 1,
      yourDecision: decision,
      aiDecision,
      yourPoints,
      aiPoints,
    };
    const newRounds = [...rounds, result];
    setLastResult(result);
    setRounds(newRounds);
    if (newRounds.length >= TOTAL_ROUNDS) setGameOver(true);
  }

  function restart() {
    setRounds([]);
    setGameOver(false);
    setLastResult(null);
    setStarted(false);
  }

  if (!started) {
    return (
      <div className="space-y-5">
        <div>
          <h2 className="font-semibold text-foreground text-lg mb-1">
            Arms Race
          </h2>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Prisoner's Dilemma · Applied Scenario
          </p>
        </div>

        <div
          className="rounded-lg p-4 text-sm space-y-3"
          style={{
            backgroundColor: "oklch(0.72 0.2 265 / 0.07)",
            borderLeft: "3px solid oklch(0.72 0.2 265 / 0.5)",
          }}
        >
          <p className="text-foreground font-medium">The Scenario</p>
          <p className="text-muted-foreground">
            It's the Cold War era. You lead Nation A, and across the border sits
            Nation B — a rival with similar military and economic capacity.
            Every year, your cabinet meets to decide the national budget
            priority: Defence (military spending, deterrence) or Development
            (schools, hospitals, infrastructure).
          </p>
          <p className="text-muted-foreground">
            If you both invest in Development, your nations flourish. If you
            invest in Defence while they invest in Development, you gain a
            military advantage — but they're exposed and resentful. If you both
            spend on Defence, you stagnate: resources poured into weapons
            neither side wants to use, while hospitals go underfunded.
          </p>
          <p className="text-muted-foreground">
            This is the Prisoner's Dilemma scaled to geopolitics. The fear of
            being caught defenceless drives both nations toward mutual
            impoverishment — not malice, just rational self-preservation.
          </p>
        </div>

        <div
          className="rounded-lg px-4 py-3 text-sm"
          style={{
            backgroundColor: "oklch(0.13 0.005 275)",
            border: "1px solid oklch(0.22 0.01 275 / 0.6)",
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Prosperity Points (Your Score / Rival Score)
          </p>
          <div className="grid grid-cols-3 gap-1 text-xs text-center">
            <div />
            <div className="text-muted-foreground font-medium">
              They: Develop
            </div>
            <div className="text-muted-foreground font-medium">
              They: Defend
            </div>
            <div className="text-muted-foreground font-medium text-left">
              You: Develop
            </div>
            <div style={{ color: "oklch(0.65 0.18 145)" }}>+4 / +4</div>
            <div style={{ color: "oklch(0.72 0.12 25)" }}>+1 / +6</div>
            <div className="text-muted-foreground font-medium text-left">
              You: Defend
            </div>
            <div style={{ color: "oklch(0.72 0.2 265)" }}>+6 / +1</div>
            <div className="text-muted-foreground">+2 / +2</div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Your rival is cautious — they lean toward Defence year after year. You
          have 5 years in power. Can you break the cycle, or will you be dragged
          into mutual decline?
        </p>

        <Button
          data-ocid="gt_sim2b.start_button"
          onClick={() => setStarted(true)}
          className="w-full"
          style={{
            backgroundColor: "oklch(0.72 0.2 265)",
            color: "oklch(0.98 0.005 265)",
          }}
        >
          Start Simulation
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-foreground mb-1">
          Arms Race — Cold War
        </h2>
        <p className="text-sm text-muted-foreground">
          You are Nation A. Each year, allocate your budget: Defence or
          Development. Your rival is cautious and leans toward Defence. Maximise
          prosperity over 5 years.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-lg px-4 py-3 text-center"
          style={{ backgroundColor: "oklch(0.72 0.2 265 / 0.1)" }}
        >
          <div
            className="text-2xl font-bold"
            style={{ color: "oklch(0.72 0.2 265)" }}
          >
            {yourTotal}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Your Prosperity
          </div>
        </div>
        <div
          className="rounded-lg px-4 py-3 text-center"
          style={{ backgroundColor: "oklch(0.62 0.22 25 / 0.08)" }}
        >
          <div
            className="text-2xl font-bold"
            style={{ color: "oklch(0.72 0.12 25)" }}
          >
            {aiTotal}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Rival Prosperity
          </div>
        </div>
      </div>

      {gameOver ? (
        <div className="space-y-4">
          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{
              backgroundColor: "oklch(0.72 0.2 265 / 0.08)",
              color: "oklch(0.85 0.01 265)",
            }}
          >
            <strong>5 Years Complete.</strong> Your prosperity:{" "}
            <span style={{ color: "oklch(0.72 0.2 265)" }}>{yourTotal}</span> ·
            Rival:{" "}
            <span style={{ color: "oklch(0.72 0.12 25)" }}>{aiTotal}</span>. Max
            possible: 20 (all Development).
          </div>
          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{
              backgroundColor: "oklch(0.72 0.2 265 / 0.08)",
              borderLeft: "3px solid oklch(0.72 0.2 265 / 0.4)",
              color: "oklch(0.8 0.01 265)",
            }}
          >
            <strong>Insight:</strong> The arms race is the Prisoner's Dilemma at
            a national scale. Both nations would be richer if they both invested
            in development — but neither can risk the other defecting. The fear
            of mutual vulnerability produces mutual poverty.
          </div>
          <Button
            data-ocid="gt_sim2b.restart_button"
            onClick={restart}
            variant="outline"
            className="w-full"
            style={{
              backgroundColor: "oklch(0.72 0.2 265 / 0.15)",
              color: "oklch(0.72 0.2 265)",
              border: "1px solid oklch(0.72 0.2 265 / 0.3)",
            }}
          >
            Play Again
          </Button>
          <div className="space-y-1">
            {rounds.map((r) => (
              <div
                key={r.round}
                className="flex items-center justify-between text-xs px-3 py-1.5 rounded"
                style={{
                  backgroundColor:
                    r.yourDecision === "development" &&
                    r.aiDecision === "development"
                      ? "oklch(0.65 0.18 145 / 0.08)"
                      : "oklch(0.62 0.22 25 / 0.06)",
                }}
              >
                <span className="text-muted-foreground">Year {r.round}</span>
                <span className="text-foreground">
                  You:{" "}
                  {r.yourDecision === "development" ? "🏗 Develop" : "🛡 Defend"}{" "}
                  · Rival:{" "}
                  {r.aiDecision === "development" ? "🏗 Develop" : "🛡 Defend"}
                </span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.72 0.2 265)" }}
                >
                  +{r.yourPoints}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Year {rounds.length + 1} of {TOTAL_ROUNDS}
            </span>
          </div>
          {lastResult && (
            <div
              className="rounded-lg px-4 py-2 text-sm"
              style={{
                backgroundColor: "oklch(0.72 0.2 265 / 0.06)",
                color: "oklch(0.8 0.01 265)",
              }}
            >
              Last year: You got <strong>+{lastResult.yourPoints}</strong>,
              rival got <strong>+{lastResult.aiPoints}</strong>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              data-ocid="gt_sim2b.defense_button"
              onClick={() => decide("defense")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">🛡</div>
              <div>Defence</div>
              <div className="text-xs text-muted-foreground mt-1">
                Military spending, stay safe
              </div>
            </button>
            <button
              type="button"
              data-ocid="gt_sim2b.development_button"
              onClick={() => decide("development")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">🏗</div>
              <div>Development</div>
              <div className="text-xs text-muted-foreground mt-1">
                Invest in people, risk exposure
              </div>
            </button>
          </div>
        </div>
      )}

      <div
        className="rounded-lg px-4 py-3 text-sm"
        style={{
          backgroundColor: "oklch(0.72 0.2 265 / 0.06)",
          borderLeft: "3px solid oklch(0.72 0.2 265 / 0.3)",
          color: "oklch(0.75 0.01 265)",
        }}
      >
        <strong>Payoffs:</strong> Both Develop → +4/+4 · You Defend, They
        Develop → +6/+1 · You Develop, They Defend → +1/+6 · Both Defend → +2/+2
      </div>
    </div>
  );
}
