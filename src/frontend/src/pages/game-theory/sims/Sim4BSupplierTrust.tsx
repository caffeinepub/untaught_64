import { Button } from "@/components/ui/button";
import { useState } from "react";

const TOTAL_ROUNDS = 5;

type BuyerMove = "honor" | "squeeze";
type SupplierMove = "quality" | "cut";
type RoundResult = {
  round: number;
  buyerMove: BuyerMove;
  supplierMove: SupplierMove;
  yourValue: number;
  aiValue: number;
};

function getPayoffs(
  buyer: BuyerMove,
  supplier: SupplierMove,
): [number, number] {
  if (buyer === "honor" && supplier === "quality") return [4, 4];
  if (buyer === "squeeze" && supplier === "quality") return [6, 1];
  if (buyer === "honor" && supplier === "cut") return [1, 6];
  return [2, 2];
}

function getSupplierMove(rounds: RoundResult[]): SupplierMove {
  if (rounds.length === 0) return "quality";
  const lastTwo = rounds.slice(-2);
  const squeezed = lastTwo.filter((r) => r.buyerMove === "squeeze").length;
  if (squeezed >= 1) return Math.random() < 0.8 ? "cut" : "quality";
  return "quality";
}

export function Sim4BSupplierTrust() {
  const [started, setStarted] = useState(false);
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  const yourTotal = rounds.reduce((s, r) => s + r.yourValue, 0);
  const aiTotal = rounds.reduce((s, r) => s + r.aiValue, 0);

  function choose(move: BuyerMove) {
    if (gameOver || rounds.length >= TOTAL_ROUNDS) return;
    const supplierMove = getSupplierMove(rounds);
    const [yourValue, aiValue] = getPayoffs(move, supplierMove);
    const result: RoundResult = {
      round: rounds.length + 1,
      buyerMove: move,
      supplierMove,
      yourValue,
      aiValue,
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
            Supplier Contract
          </h2>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Repeated Games · Applied Scenario
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
            You are the procurement director at a mid-sized electronics
            manufacturer. You've just signed a 5-year contract with a components
            supplier — a small family business that has been making parts for
            the industry for decades. Every year, when the invoice arrives, you
            face a decision.
          </p>
          <p className="text-muted-foreground">
            You can Honor the contract — pay the agreed price and maintain the
            relationship. Or you can Squeeze — demand a last-minute discount,
            citing "market pressures." The supplier usually complies. They need
            your business. But they're not a machine. They have memory, pride,
            and limited tolerance.
          </p>
          <p className="text-muted-foreground">
            Squeeze them repeatedly and they start cutting corners: cheaper
            materials, deprioritised orders, rising defect rates. The short-term
            saving costs you far more in rework and delays. This is repeated
            games in action — your reputation is your strategy, and trust, once
            lost, is expensive to rebuild.
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
            Value Points Per Year (Your Value / Supplier Value)
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                You Honor + Supplier delivers Quality
              </span>
              <span style={{ color: "oklch(0.65 0.18 145)" }}>+4 / +4</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                You Squeeze + Supplier delivers Quality
              </span>
              <span style={{ color: "oklch(0.72 0.2 265)" }}>+6 / +1</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                You Honor + Supplier cuts Corners
              </span>
              <span style={{ color: "oklch(0.72 0.12 25)" }}>+1 / +6</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">
                You Squeeze + Supplier cuts Corners
              </span>
              <span className="text-muted-foreground">+2 / +2</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          The supplier starts in good faith — they deliver quality in year one.
          But they're watching. One squeeze, and things change. You have 5
          annual renewals. What will this relationship look like at the end?
        </p>

        <Button
          data-ocid="gt_sim4b.start_button"
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
          Supplier Contract
        </h2>
        <p className="text-sm text-muted-foreground">
          You are the Buyer. Each year: Honor the contract or Squeeze for a
          discount. The supplier remembers every decision — and reacts. 5 years.
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
          <div className="text-xs text-muted-foreground mt-0.5">Your Value</div>
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
            Supplier Value
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
            <strong>Contract Complete.</strong> Your total value:{" "}
            <span style={{ color: "oklch(0.72 0.2 265)" }}>{yourTotal}</span> ·
            Supplier:{" "}
            <span style={{ color: "oklch(0.72 0.12 25)" }}>{aiTotal}</span>.
            Maximum: 20 (all Honor + Quality).
          </div>
          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{
              backgroundColor: "oklch(0.72 0.2 265 / 0.08)",
              borderLeft: "3px solid oklch(0.72 0.2 265 / 0.4)",
              color: "oklch(0.8 0.01 265)",
            }}
          >
            <strong>Insight:</strong> Long-term supplier relationships succeed
            when both sides resist short-term exploitation. The supplier's
            reaction to being squeezed illustrates how reputation and history
            shape strategy — a key feature of repeated games that disappears in
            one-shot interactions.
          </div>
          <Button
            data-ocid="gt_sim4b.restart_button"
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
                    r.buyerMove === "honor" && r.supplierMove === "quality"
                      ? "oklch(0.65 0.18 145 / 0.08)"
                      : r.buyerMove === "squeeze" && r.supplierMove === "cut"
                        ? "oklch(0.62 0.22 25 / 0.08)"
                        : "oklch(0.72 0.2 265 / 0.06)",
                }}
              >
                <span className="text-muted-foreground">Year {r.round}</span>
                <span className="text-foreground">
                  You: {r.buyerMove === "honor" ? "🤝 Honor" : "💼 Squeeze"} ·
                  Supplier:{" "}
                  {r.supplierMove === "quality"
                    ? "✅ Quality"
                    : "✂️ Cut corners"}
                </span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.72 0.2 265)" }}
                >
                  +{r.yourValue}
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
                backgroundColor:
                  lastResult.supplierMove === "cut"
                    ? "oklch(0.62 0.22 25 / 0.1)"
                    : "oklch(0.65 0.18 145 / 0.08)",
                color: "oklch(0.8 0.01 265)",
              }}
            >
              Last year: Supplier{" "}
              <strong>
                {lastResult.supplierMove === "quality"
                  ? "delivered full quality ✅"
                  : "cut corners ✂️"}
              </strong>
              . You got <strong>+{lastResult.yourValue}</strong>.
              {lastResult.supplierMove === "cut" &&
                lastResult.buyerMove === "squeeze" && (
                  <span
                    className="block mt-1 text-xs"
                    style={{ color: "oklch(0.72 0.12 25)" }}
                  >
                    They responded to being squeezed — repeated game logic at
                    work.
                  </span>
                )}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              data-ocid="gt_sim4b.honor_button"
              onClick={() => choose("honor")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">🤝</div>
              <div>Honor</div>
              <div className="text-xs text-muted-foreground mt-1">
                Pay agreed price, build trust
              </div>
            </button>
            <button
              type="button"
              data-ocid="gt_sim4b.squeeze_button"
              onClick={() => choose("squeeze")}
              className="rounded-lg border border-border/60 bg-card py-6 text-center font-semibold text-foreground transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="text-lg">💼</div>
              <div>Squeeze</div>
              <div className="text-xs text-muted-foreground mt-1">
                Demand discount, risk retaliation
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
        <strong>Payoffs:</strong> Honor + Quality → +4/+4 · Squeeze + Quality →
        +6/+1 · Honor + Cut → +1/+6 · Squeeze + Cut → +2/+2
      </div>
    </div>
  );
}
