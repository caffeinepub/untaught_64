import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const RED = "0.72 0.2 29";

const ROUNDS = [
  {
    phase: "Phase 1: Discovery",
    context:
      "You work in product safety at a consumer electronics company. Lab tests show your new wireless charger has a 0.3% failure rate that can cause fires under specific conditions. Legal says 0.3% is below the regulatory threshold for mandatory recall. Marketing wants to launch in 3 weeks.",
    question: "What do you recommend?",
    options: [
      {
        text: "Recommend a voluntary delay to fix the defect before launch",
        outcome:
          "Applied consequentialism + virtue ethics: the expected harm (fires in 0.3% of millions of units) justifies delay even if not legally required. A person of integrity doesn't hide behind regulatory minimums.",
        points: 1,
      },
      {
        text: "Document the risk and let leadership decide",
        outcome:
          "Procedurally defensible, but ethically weak. Passing responsibility upward without a clear recommendation is how individual ethical agency gets dissolved into institutional decisions.",
        points: 0,
      },
    ],
  },
  {
    phase: "Phase 2: Leadership Response",
    context:
      "Leadership decides to launch. They note the defect is disclosed in the warranty fine print. Your direct manager tells you: 'You've raised the flag. Now step back.'",
    question: "Do you accept this outcome?",
    options: [
      {
        text: "No — request the decision be escalated with a formal risk assessment",
        outcome:
          "You're not done. Formal escalation creates a record, forces explicit decision-making, and demonstrates that professional ethics requires more than flag-raising.",
        points: 1,
      },
      {
        text: "Yes — you've done your job",
        outcome:
          "You've technically met your minimal obligation, but warranty fine print is not meaningful disclosure. People will be harmed. The ethical case for further action is strong.",
        points: 0,
      },
    ],
  },
  {
    phase: "Phase 3: Launch Week",
    context:
      "The product launches. Within a week, three fire incidents are reported in early adopters. No injuries, but the pattern matches your predicted failure mode.",
    question: "What do you do now?",
    options: [
      {
        text: "Formally document the incidents and their match to your predicted failure mode",
        outcome:
          "Critical. You now have evidence that the risk was real and foreseeable. Documentation protects you legally and creates the factual basis for any further action.",
        points: 1,
      },
      {
        text: "Alert your manager verbally",
        outcome:
          "Insufficient. Verbal alerts can be forgotten or denied. Written documentation is essential when safety evidence is emerging.",
        points: 0,
      },
    ],
  },
  {
    phase: "Phase 4: Cover or Disclose",
    context:
      "An internal meeting discusses how to handle the incidents. One executive suggests framing them as 'user error' in public communications. You have data showing they're not.",
    question: "What is your responsibility?",
    options: [
      {
        text: "State clearly in writing that the data does not support 'user error' framing",
        outcome:
          "Essential. You cannot participate in false public communications. This is the clearest ethical line in the scenario — professional integrity requires stating the truth on the record.",
        points: 1,
      },
      {
        text: "Stay silent in the meeting but note your disagreement internally later",
        outcome:
          "Not enough. Silence in a meeting where a false framing is being adopted constitutes implicit assent. Your professional duty requires explicit dissent.",
        points: 0,
      },
    ],
  },
  {
    phase: "Phase 5: The Decision",
    context:
      "Leadership proceeds with the 'user error' framing. You've been told your concerns are noted. More incidents are reported. You have a clear documented record of the risk.",
    question: "Final decision?",
    options: [
      {
        text: "Contact the relevant product safety regulator directly",
        outcome:
          "You have exhausted internal channels, have documented evidence, and face ongoing public harm. Regulatory reporting is both legally appropriate and ethically required. This is what applied ethics leads to.",
        points: 1,
      },
      {
        text: "Consult a whistleblower lawyer first, then act",
        outcome:
          "Equally correct. Protecting yourself legally enables sustained ethical action. Martyrdom doesn't serve the public interest as well as a protected, documented report does.",
        points: 1,
      },
    ],
  },
];

export function Sim3BAppliedEthicsReal() {
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
            Case Complete
          </p>
          <p className="font-display text-2xl font-semibold text-foreground mb-2">
            Ethical Score: {totalPoints}/{ROUNDS.length}
          </p>
          <p className="text-muted-foreground text-sm">
            Corporate applied ethics is a test of whether individual integrity
            survives institutional pressure. The Boeing 737 MAX case shows what
            happens when it doesn't.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
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
          {currentRound.phase} — {round + 1} of {ROUNDS.length}
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
              {round + 1 < ROUNDS.length ? "Next Phase" : "See Results"}
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
