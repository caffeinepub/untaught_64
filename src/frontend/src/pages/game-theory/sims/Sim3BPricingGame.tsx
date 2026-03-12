import { Button } from "@/components/ui/button";
import { useState } from "react";

const TOTAL_ROUNDS = 5;

type Price = "high" | "low";
type RoundResult = {
  round: number;
  yourPrice: Price;
  aiPrice: Price;
  yourProfit: number;
  aiProfit: number;
};

function getPayoffs(yours: Price, theirs: Price): [number, number] {
  if (yours === "high" && theirs === "high") return [90, 90];
  if (yours === "low" && theirs === "high") return [80, 40];
  if (yours === "high" && theirs === "low") return [40, 80];
  return [55, 55];
}

function getAIPrice(rounds: RoundResult[]): Price {
  if (rounds.length === 0) return Math.random() < 0.5 ? "high" : "low";
  const recentLow = rounds
    .slice(-2)
    .filter((r) => r.yourPrice === "low").length;
  if (recentLow >= 1) return "low";
  return "high";
}

export function Sim3BPricingGame() {
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  const yourTotal = rounds.reduce((s, r) => s + r.yourProfit, 0);
  const aiTotal = rounds.reduce((s, r) => s + r.aiProfit, 0);

  function choosePrice(price: Price) {
    if (gameOver || rounds.length >= TOTAL_ROUNDS) return;
    const aiPrice = getAIPrice(rounds);
    const [yourProfit, aiProfit] = getPayoffs(price, aiPrice);
    const result: RoundResult = {
      round: rounds.length + 1,
      yourPrice: price,
      aiPrice,
      yourProfit,
      aiProfit,
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
            Two Coffee Shops
          </h2>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Nash Equilibrium · Applied Scenario
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
            You own a coffee shop on a busy high street. Your only competitor —
            an almost identical café — sits directly across the road. Every
            week, you each independently set your espresso price: £4.50 (High)
            or £3.00 (Low). Neither of you sees what the other decides before
            committing.
          </p>
          <p className="text-muted-foreground">
            Customers on this street are price-sensitive. Charge more than your
            rival and most will cross the road. Charge the same and you split
            the market evenly. The question isn't just "what makes me the most
            money this week?" — it's "what strategy is stable, where neither of
            us has any reason to change?"
          </p>
          <p className="text-muted-foreground">
            That stable point is called a Nash Equilibrium. Here's the twist:
            the Nash Equilibrium in this game is NOT the outcome that produces
            the most profit for either player. Can you figure out why — and
            whether you can escape it?
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
            Weekly Profit (Your £ / Rival £)
          </p>
          <div className="grid grid-cols-3 gap-1 text-xs text-center">
            <div />
            <div className="text-muted-foreground font-medium">They: £4.50</div>
            <div className="text-muted-foreground font-medium">They: £3.00</div>
            <div className="text-muted-foreground font-medium text-left">
              You: £4.50
            </div>
            <div style={{ color: "oklch(0.65 0.18 145)" }}>£90 / £90</div>
            <div style={{ color: "oklch(0.72 0.12 25)" }}>£40 / £80</div>
            <div className="text-muted-foreground font-medium text-left">
              You: £3.00
            </div>
            <div style={{ color: "oklch(0.72 0.2 265)" }}>£80 / £40</div>
            <div className="text-muted-foreground">£55 / £55</div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Your rival is adaptive — they watch your pricing and mirror it. You
          have 5 weeks. Can you maintain high prices, or will competitive
          pressure drag you both down to the Nash Equilibrium?
        </p>

        <Button
          data-ocid="gt_sim3b.start_button"
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
        <h2 className="font-semibold text-foreground mb-1">Two Coffee Shops</h2>
        <p className="text-sm text-muted-foreground">
          You and a rival coffee shop set prices each week. £4.50 (High) or
          £3.00 (Low). Your rival watches your strategy and adapts. 5 weeks
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
            £{yourTotal}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Your Profit
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
            £{aiTotal}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Rival Profit
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
            <strong>5 Weeks Done.</strong> Your profit:{" "}
            <span style={{ color: "oklch(0.72 0.2 265)" }}>£{yourTotal}</span> ·
            Rival:{" "}
            <span style={{ color: "oklch(0.72 0.12 25)" }}>£{aiTotal}</span>.
            Maximum possible: £450 (all High).
          </div>
          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{
              backgroundColor: "oklch(0.72 0.2 265 / 0.08)",
              borderLeft: "3px solid oklch(0.72 0.2 265 / 0.4)",
              color: "oklch(0.8 0.01 265)",
            }}
          >
            <strong>Insight:</strong> The Nash Equilibrium here is Both Low —
            neither player gains by switching alone. But Both High produces more
            profit for everyone. Nash Equilibrium and optimal outcome are not
            the same thing.
          </div>
          <Button
            data-ocid="gt_sim3b.restart_button"
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
                    r.yourPrice === "high" && r.aiPrice === "high"
                      ? "oklch(0.65 0.18 145 / 0.08)"
                      : r.yourPrice === "low" && r.aiPrice === "low"
                        ? "oklch(0.62 0.22 25 / 0.08)"
                        : "oklch(0.72 0.2 265 / 0.06)",
                }}
              >
                <span className="text-muted-foreground">Week {r.round}</span>
                <span className="text-foreground">
                  You: {r.yourPrice === "high" ? "☕ £4.50" : "💰 £3.00"} ·
                  Rival: {r.aiPrice === "high" ? "☕ £4.50" : "💰 £3.00"}
                </span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.72 0.2 265)" }}
                >
                  £{r.yourProfit}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Week {rounds.length + 1} of {TOTAL_ROUNDS}
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
              Last week: You got <strong>£{lastResult.yourProfit}</strong>,
              rival got <strong>£{lastResult.aiProfit}</strong>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              data-ocid="gt_sim3b.high_price_button"
              onClick={() => choosePrice("high")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">☕</div>
              <div>£4.50 High</div>
              <div className="text-xs text-muted-foreground mt-1">
                Better margins if rival matches
              </div>
            </button>
            <button
              type="button"
              data-ocid="gt_sim3b.low_price_button"
              onClick={() => choosePrice("low")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">💰</div>
              <div>£3.00 Low</div>
              <div className="text-xs text-muted-foreground mt-1">
                Grab customers, risk a price war
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
        <strong>Payoffs:</strong> Both High → £90/£90 · You Low, They High →
        £80/£40 · You High, They Low → £40/£80 · Both Low → £55/£55
      </div>
    </div>
  );
}
