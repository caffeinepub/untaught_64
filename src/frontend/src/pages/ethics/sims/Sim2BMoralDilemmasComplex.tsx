import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const RED = "0.72 0.2 29";

const ROUNDS = [
  {
    day: "Day 1",
    context:
      "A pandemic has arrived. Your ICU has 8 ventilators. 12 patients need them. All will die without a ventilator. You must decide the allocation criteria.",
    question: "Which allocation principle do you adopt?",
    options: [
      {
        text: "Likelihood of survival — maximise lives saved",
        outcome:
          "This is the standard utilitarian triage approach used in most pandemic protocols. It produces the best aggregate outcome but may disadvantage the chronically ill.",
        points: 1,
      },
      {
        text: "First-come, first-served — treat arrival as fair",
        outcome:
          "Egalitarian, but clinically arbitrary. It doesn't maximise lives and can exclude those who delay seeking care due to stigma or transport barriers.",
        points: 0,
      },
    ],
  },
  {
    day: "Day 4",
    context:
      "A 34-year-old frontline nurse arrives in critical condition. She has been working double shifts treating pandemic patients. Under your survival-likelihood criteria, an 80-year-old patient currently on a ventilator has a slightly better prognosis.",
    question: "Do you reassign the ventilator to the nurse?",
    options: [
      {
        text: "No — the current patient has a right to continued treatment",
        outcome:
          "Deontological: once treatment is given, withdrawal is morally different from withholding. Most protocols protect ongoing treatment.",
        points: 1,
      },
      {
        text: "Yes — she contributed more future benefit to society",
        outcome:
          "Social utility reasoning is legally and ethically problematic. It discriminates based on social role and sets dangerous precedents for who 'deserves' care.",
        points: 0,
      },
    ],
  },
  {
    day: "Day 7",
    context:
      "You have 2 ventilators available. A patient who refused vaccination arrives in critical condition. Another patient with no prior risk factor also needs one.",
    question: "Does prior vaccine status affect allocation?",
    options: [
      {
        text: "No — medical need is the criterion, not life choices",
        outcome:
          "Most ethical guidelines reject prior behaviour as an allocation criterion. It risks punishing people for complex decisions involving access, misinformation, and autonomy.",
        points: 1,
      },
      {
        text: "Yes — responsibility for illness is a legitimate tiebreaker",
        outcome:
          "Some ethicists accept this as a tiebreaker of last resort, but it's highly contested. Who decides which life choices are 'responsible'? The principle is difficult to apply consistently.",
        points: 0,
      },
    ],
  },
  {
    day: "Day 10",
    context:
      "A pharmaceutical company offers the hospital ten additional ventilators — at a price that would exhaust your annual drug budget.",
    question: "Do you accept?",
    options: [
      {
        text: "Yes — the immediate deaths prevented justify the cost",
        outcome:
          "Short-term consequentialism. But the long-term cost — reduced drug access for chronic patients all year — may cause more total harm.",
        points: 0,
      },
      {
        text: "No — and escalate to the health ministry to requisition supply",
        outcome:
          "Systemic thinking: the problem isn't your budget, it's supply. Using institutional channels protects you, the patients, and the system from exploitation.",
        points: 1,
      },
    ],
  },
  {
    day: "Day 14",
    context:
      "The crisis has passed. You are asked to write the protocol used for future pandemics. What principle anchors it?",
    question: "What is the primary allocation criterion in your protocol?",
    options: [
      {
        text: "Clinical prognosis only — maximise lives saved",
        outcome:
          "The most defensible and widely-used criterion. It avoids social judgments and is clinically grounded. It can feel cold but is the most equitable under genuine scarcity.",
        points: 1,
      },
      {
        text: "A lottery system for equally urgent cases, clinical prognosis otherwise",
        outcome:
          "Sophisticated approach: clinical first, then fair randomisation when clinical criteria are equal. Philosophically robust and increasingly endorsed.",
        points: 1,
      },
    ],
  },
];

export function Sim2BMoralDilemmasComplex() {
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
    const newAnswers = [
      ...answers,
      { points: currentRound.options[selected].points },
    ];
    setAnswers(newAnswers);
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
            Crisis Resolved
          </p>
          <p className="font-display text-2xl font-semibold text-foreground mb-2">
            Ethical Score: {totalPoints}/{ROUNDS.length}
          </p>
          <p className="text-muted-foreground text-sm">
            Pandemic triage is a genuine moral dilemma at institutional scale.
            No protocol is clean. The task is to be principled, consistent, and
            transparent about the values you're applying.
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
            Scenario
          </p>
          <p className="text-sm text-foreground/80">
            You are the Chief Medical Officer of a hospital during a pandemic.
            You must make real-time allocation decisions with limited resources
            and no perfect options.
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
          {currentRound.day} — Decision {round + 1} of {ROUNDS.length}
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
              {round + 1 < ROUNDS.length ? "Next Decision" : "See Results"}
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
