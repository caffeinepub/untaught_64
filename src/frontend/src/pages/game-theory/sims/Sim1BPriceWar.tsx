import { Button } from "@/components/ui/button";
import { useState } from "react";

const TOTAL_ROUNDS = 5;

type Price = "high" | "low";
type RoundResult = {
  round: number;
  yourPrice: Price;
  aiPrice: Price;
  yourRevenue: number;
  aiRevenue: number;
};

function getPayoffs(yours: Price, theirs: Price): [number, number] {
  if (yours === "high" && theirs === "high") return [8, 8];
  if (yours === "low" && theirs === "high") return [12, 3];
  if (yours === "high" && theirs === "low") return [3, 12];
  return [5, 5];
}

function getAIPrice(rounds: RoundResult[]): Price {
  if (rounds.length === 0) return Math.random() < 0.5 ? "high" : "low";
  const lastRound = rounds[rounds.length - 1];
  if (Math.random() < 0.6) return lastRound.yourPrice;
  return Math.random() < 0.5 ? "high" : "low";
}

export function Sim1BPriceWar() {
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  const currentRound = rounds.length + 1;
  const yourTotal = rounds.reduce((s, r) => s + r.yourRevenue, 0);
  const aiTotal = rounds.reduce((s, r) => s + r.aiRevenue, 0);

  function choosePrice(price: Price) {
    if (gameOver || rounds.length >= TOTAL_ROUNDS) return;
    const aiPrice = getAIPrice(rounds);
    const [yourRevenue, aiRevenue] = getPayoffs(price, aiPrice);
    const result: RoundResult = {
      round: rounds.length + 1,
      yourPrice: price,
      aiPrice,
      yourRevenue,
      aiRevenue,
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
            Price War
          </h2>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Zero-Sum Games · Applied Scenario
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
            Two airlines — yours and a rival — both fly the same route between
            London and Manchester. Every quarter, both companies independently
            set their ticket price: Premium or Budget. Neither airline sees the
            other's decision before committing.
          </p>
          <p className="text-muted-foreground">
            If you go Premium and they go Budget, they steal your customers and
            you're left with scraps. If you both go Budget, you're locked in a
            race to the bottom with thin margins. If you both stay Premium, the
            market stays healthy and you both profit.
          </p>
          <p className="text-muted-foreground">
            This is the zero-sum trap: the temptation to defect for short-term
            gain can destroy the conditions that make long-term profit possible.
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
            Payoff Matrix (Your Revenue / Rival Revenue)
          </p>
          <div className="grid grid-cols-3 gap-1 text-xs text-center">
            <div />
            <div className="text-muted-foreground font-medium">
              They: Premium
            </div>
            <div className="text-muted-foreground font-medium">
              They: Budget
            </div>
            <div className="text-muted-foreground font-medium text-left">
              You: Premium
            </div>
            <div style={{ color: "oklch(0.65 0.18 145)" }}>+8 / +8</div>
            <div style={{ color: "oklch(0.72 0.12 25)" }}>+3 / +12</div>
            <div className="text-muted-foreground font-medium text-left">
              You: Budget
            </div>
            <div style={{ color: "oklch(0.72 0.2 265)" }}>+12 / +3</div>
            <div className="text-muted-foreground">+5 / +5</div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          You are the CEO of Airline A. Play 5 quarters. Can you maintain the
          premium equilibrium, or will competition drag you both down?
        </p>

        <Button
          data-ocid="gt_sim1b.start_button"
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
          Price War — Airline Route
        </h2>
        <p className="text-sm text-muted-foreground">
          You are Airline A. Each quarter, set your ticket pricing: Premium or
          Budget. Revenue depends on what both airlines choose. 5 quarters
          total.
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
            Your Revenue
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
            Rival Revenue
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
            <strong>5 Quarters Done.</strong> You earned{" "}
            <span style={{ color: "oklch(0.72 0.2 265)" }}>{yourTotal}</span> vs
            rival's{" "}
            <span style={{ color: "oklch(0.72 0.12 25)" }}>{aiTotal}</span>. Max
            possible: 40 (all Premium).
          </div>
          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{
              backgroundColor: "oklch(0.72 0.2 265 / 0.08)",
              borderLeft: "3px solid oklch(0.72 0.2 265 / 0.4)",
              color: "oklch(0.8 0.01 265)",
            }}
          >
            <strong>Insight:</strong> The price war trap is zero-sum at its
            worst — when both players race to the bottom, the total value in the
            market shrinks. The stable outcome (both staying Premium) requires
            trust, and trust is fragile.
          </div>
          <Button
            data-ocid="gt_sim1b.restart_button"
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
                    r.yourRevenue > r.aiRevenue
                      ? "oklch(0.65 0.18 145 / 0.08)"
                      : r.yourRevenue < r.aiRevenue
                        ? "oklch(0.62 0.22 25 / 0.08)"
                        : "oklch(0.72 0.2 265 / 0.06)",
                }}
              >
                <span className="text-muted-foreground">Q{r.round}</span>
                <span className="text-foreground">
                  You: {r.yourPrice === "high" ? "✈ Premium" : "💸 Budget"} ·
                  Rival: {r.aiPrice === "high" ? "✈ Premium" : "💸 Budget"}
                </span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.72 0.2 265)" }}
                >
                  +{r.yourRevenue}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Quarter {currentRound} of {TOTAL_ROUNDS}
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
              Last quarter: You got <strong>+{lastResult.yourRevenue}</strong>,
              rival got <strong>+{lastResult.aiRevenue}</strong>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              data-ocid="gt_sim1b.high_button"
              onClick={() => choosePrice("high")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">✈️</div>
              <div>Premium</div>
              <div className="text-xs text-muted-foreground mt-1">
                Higher margin, needs trust
              </div>
            </button>
            <button
              type="button"
              data-ocid="gt_sim1b.low_button"
              onClick={() => choosePrice("low")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">💸</div>
              <div>Budget</div>
              <div className="text-xs text-muted-foreground mt-1">
                Steal share, risk race to bottom
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
        <strong>Payoffs:</strong> Both Premium → +8/+8 · You Budget, They
        Premium → +12/+3 · You Premium, They Budget → +3/+12 · Both Budget →
        +5/+5
      </div>
    </div>
  );
}
