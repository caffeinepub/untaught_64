import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const RED = "0.72 0.2 29";

const ROUNDS = [
  {
    week: "Week 1",
    context:
      "You are a mid-level manager at a construction firm. During a site inspection, you notice a colleague has been approving materials that technically meet code but are below the standard used by competitors. It's legal. But you know the building is for a school.",
    question: "Your first response?",
    options: [
      {
        text: "Raise it informally with the colleague — maybe there's context you're missing",
        outcome:
          "Good. Start with curiosity, not accusation. You may be missing information. This is both professionally smart and ethically appropriate.",
        points: 1,
      },
      {
        text: "Document it and say nothing yet",
        outcome:
          "Defensible as an initial step, but only if you plan to act. Documenting while staying silent indefinitely isn't ethical neutrality — it's avoidance.",
        points: 0,
      },
    ],
  },
  {
    week: "Week 2",
    context:
      "Your colleague explains the budget was cut and the materials were approved by the project director. 'Everyone knows,' they say. 'It's not your call.'",
    question: "How do you respond?",
    options: [
      {
        text: "'If everyone knows, there should be documentation. Can I see it?'",
        outcome:
          "Excellent. You're not accusing — you're requesting accountability. If it's truly sanctioned, documentation exists. If not, you've identified the real problem.",
        points: 1,
      },
      {
        text: "Accept the explanation — if it came from above, it's not your responsibility",
        outcome:
          "Diffusion of responsibility is one of the most common mechanisms of institutional wrongdoing. 'Not my call' has been said before every major corporate ethics failure.",
        points: 0,
      },
    ],
  },
  {
    week: "Week 3",
    context:
      "The project director confirms the decision and asks you to 'stay in your lane.' You've found no documentation. The school opens in 3 months.",
    question: "What do you do?",
    options: [
      {
        text: "Escalate internally — go above the project director",
        outcome:
          "Correct next step. Internal escalation exhausts the legitimate channel before external action. It also creates a record.",
        points: 1,
      },
      {
        text: "Contact the building inspector directly",
        outcome:
          "Skipping internal channels prematurely can backfire professionally and legally. Internal escalation first is both ethically and practically sound.",
        points: 0,
      },
    ],
  },
  {
    week: "Week 4",
    context:
      "Senior leadership says materials are 'compliant with all regulations' and the matter is closed. You're told not to bring it up again. You have a family and a mortgage.",
    question: "This is the hardest moment. What do you do?",
    options: [
      {
        text: "Consult a lawyer about whistleblower protections before doing anything",
        outcome:
          "This is practically wise and ethically sound. Understanding your legal protections doesn't delay action — it enables sustainable action. Martyrdom isn't required for integrity.",
        points: 1,
      },
      {
        text: "Let it go — you did your part internally",
        outcome:
          "You raised it internally, which matters. But children will use this building. Applied ethics sometimes requires accepting personal cost for genuine duty. There's no clean exit here.",
        points: 0,
      },
    ],
  },
  {
    week: "Week 5",
    context:
      "Your lawyer says you have strong whistleblower protection. You can report to the building authority with legal protection. The school is 6 weeks from opening.",
    question: "Final decision?",
    options: [
      {
        text: "Report to the building authority with full documentation",
        outcome:
          "You have exhausted internal channels, obtained legal protection, and face a genuine safety risk to children. The ethical case for action is clear. This is what applied ethical reasoning leads to.",
        points: 1,
      },
      {
        text: "Give the company one final chance to self-report",
        outcome:
          "Also defensible. It gives the institution a chance to do the right thing and may produce a better outcome. But it requires a hard deadline — if they don't act, you do.",
        points: 1,
      },
    ],
  },
];

export function Sim3AppliedEthics() {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ points: number }[]>([]);
  const [done, setDone] = useState(false);

  const currentRound = ROUNDS[round];
  const totalPoints = answers.reduce((s, a) => s + a.points, 0);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
  };
  const handleNext = () => {
    if (selected === null) return;
    setAnswers([...answers, { points: currentRound.options[selected].points }]);
    if (round + 1 >= ROUNDS.length) setDone(true);
    else {
      setRound(round + 1);
      setSelected(null);
    }
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5"
      >
        <div
          className="rounded-xl p-5 text-center"
          style={{
            backgroundColor: `oklch(${RED} / 0.08)`,
            border: `1px solid oklch(${RED} / 0.2)`,
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-1"
            style={{ color: `oklch(${RED})` }}
          >
            Simulation Complete
          </p>
          <p className="font-display text-2xl font-semibold text-foreground mb-2">
            Score: {totalPoints}/{ROUNDS.length}
          </p>
          <p className="text-muted-foreground text-sm">
            Applied ethics requires courage, patience, and practical wisdom —
            not just principles. The hardest part isn't knowing what's right;
            it's acting on it when there are real personal costs.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      {round === 0 && (
        <div
          className="rounded-xl p-4"
          style={{
            backgroundColor: `oklch(${RED} / 0.06)`,
            border: `1px solid oklch(${RED} / 0.15)`,
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.18em] mb-1"
            style={{ color: `oklch(${RED})` }}
          >
            Scenario Setup
          </p>
          <p className="text-sm text-foreground/80">
            You are a manager who discovers a safety concern at work. Over 5
            weeks, you'll face escalating decisions about when and how to act.
            Your choices accumulate.
          </p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-border/30 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(round / ROUNDS.length) * 100}%`,
              backgroundColor: `oklch(${RED})`,
            }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {currentRound.week} — {round + 1} of {ROUNDS.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={round}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div
            className="rounded-lg p-4"
            style={{ backgroundColor: `oklch(${RED} / 0.08)` }}
          >
            <p className="text-sm text-foreground/85 leading-relaxed mb-3">
              {currentRound.context}
            </p>
            <p className="font-medium text-foreground">
              {currentRound.question}
            </p>
          </div>
          <div className="space-y-2">
            {currentRound.options.map((opt, i) => {
              const isSelected = selected === i;
              const isAnswered = selected !== null;
              return (
                <button
                  key={opt.text}
                  type="button"
                  data-ocid={`sim.option.${i + 1}`}
                  onClick={() => handleSelect(i)}
                  disabled={isAnswered}
                  className="w-full text-left px-4 py-3 rounded-lg border text-sm min-h-[44px] transition-all duration-200"
                  style={{
                    borderColor: isSelected
                      ? `oklch(${RED} / 0.6)`
                      : "oklch(0.28 0.01 275 / 0.5)",
                    backgroundColor: isSelected
                      ? `oklch(${RED} / 0.1)`
                      : "transparent",
                    color: isSelected ? `oklch(${RED})` : "oklch(0.9 0.01 80)",
                    cursor: isAnswered ? "default" : "pointer",
                  }}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold border"
                      style={{
                        borderColor: isSelected
                          ? `oklch(${RED})`
                          : "oklch(0.4 0.01 275)",
                        backgroundColor: isSelected
                          ? `oklch(${RED})`
                          : "transparent",
                        color: isSelected ? "white" : "oklch(0.6 0.01 275)",
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
          <AnimatePresence>
            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg p-4"
                style={{
                  backgroundColor: `oklch(${RED} / 0.07)`,
                  borderLeft: `3px solid oklch(${RED} / 0.5)`,
                }}
              >
                <p className="text-sm text-foreground/85 leading-relaxed">
                  {currentRound.options[selected].outcome}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          {selected !== null && (
            <Button
              size="sm"
              onClick={handleNext}
              data-ocid="sim.next.button"
              style={{ backgroundColor: `oklch(${RED})`, color: "white" }}
            >
              {round + 1 < ROUNDS.length ? "Next Week" : "See Results"}
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
