import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const RED = "0.72 0.2 29";

const SCENARIO = {
  title: "The Hospital Budget Decision",
  setup:
    "You are the director of a regional hospital. A government grant gives you £500,000 — but you can only fund one of two wards: the cancer ward (treats 20 patients per year, many terminal) or the emergency ward (treats 400 patients per year, mostly non-terminal).",
  stake: "Your decision directly determines who receives care this year.",
  context:
    "Every framework gives a different answer. Your task is to apply each one and see where it leads.",
};

const ROUNDS = [
  {
    framework: "Consequentialist Reasoning",
    question:
      "Thinking only about outcomes: which ward produces the most total wellbeing?",
    options: [
      {
        text: "Emergency ward — 400 patients benefit vs 20",
        outcome:
          "Consequentialist analysis supports this. More people helped = more total wellbeing, assuming similar benefit per patient.",
        points: 1,
        align: "consequentialist",
      },
      {
        text: "Cancer ward — end-of-life care is more urgent",
        outcome:
          "A sophisticated consequentialist might agree if quality-adjusted life years are higher. But raw numbers favour emergency.",
        points: 0,
        align: "mixed",
      },
    ],
  },
  {
    framework: "Rights-Based Reasoning",
    question:
      "Do the cancer patients have a prior claim — a right to care they were promised?",
    options: [
      {
        text: "Yes — existing patients have contractual and moral rights to continuity",
        outcome:
          "Deontological thinking: patients who entered treatment have a duty-based claim that can't be overridden by arithmetic.",
        points: 1,
        align: "deontological",
      },
      {
        text: "No — rights are equal; numbers decide",
        outcome:
          "This collapses back to consequentialism. Pure deontology would resist purely numerical reasoning.",
        points: 0,
        align: "mixed",
      },
    ],
  },
  {
    framework: "Virtue Ethics Question",
    question:
      "What would a hospital director of genuine integrity and compassion do?",
    options: [
      {
        text: "Seek a third option: partial funding, advocacy, partnerships",
        outcome:
          "Virtue ethics often resists false dilemmas. A practically wise person doesn't just pick between two bad options — they work to change the framing.",
        points: 1,
        align: "virtue",
      },
      {
        text: "Pick the emergency ward and accept the moral cost",
        outcome:
          "This shows pragmatic virtue — accepting tragic choices rather than pretending there's a clean answer. Also a legitimate response.",
        points: 0,
        align: "virtue",
      },
    ],
  },
  {
    framework: "Stakeholder Analysis",
    question:
      "Who are you ignoring if you only consider the patients in front of you?",
    options: [
      {
        text: "Future patients who won't exist yet",
        outcome:
          "Good. A well-functioning emergency ward prevents future serious illness. Long-term thinking changes the calculus.",
        points: 1,
        align: "consequentialist",
      },
      {
        text: "The hospital staff's morale and retention",
        outcome:
          "Valid but secondary. Staff morale matters, but it shouldn't be the primary ethical consideration.",
        points: 0,
        align: "mixed",
      },
    ],
  },
  {
    framework: "Final Synthesis",
    question: "After applying all three frameworks, which is most persuasive?",
    options: [
      {
        text: "Consequentialism — numbers and outcomes should decide",
        outcome:
          "A defensible position if you can measure and compare wellbeing across cases. Many public health decisions use this logic.",
        points: 1,
        align: "consequentialist",
      },
      {
        text: "Deontology + virtue combined — honour existing commitments while seeking better options",
        outcome:
          "This is philosophically richer: it takes rights seriously and demands practical wisdom rather than calculation.",
        points: 1,
        align: "deontological",
      },
    ],
  },
];

export function Sim1MoralFrameworks() {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ option: number; points: number }[]>(
    [],
  );
  const [done, setDone] = useState(false);

  const currentRound = ROUNDS[round];
  const totalPoints = answers.reduce((s, a) => s + a.points, 0);

  const handleSelect = (optIdx: number) => {
    if (selected !== null) return;
    setSelected(optIdx);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [
      ...answers,
      { option: selected, points: currentRound.options[selected].points },
    ];
    setAnswers(newAnswers);
    if (round + 1 >= ROUNDS.length) {
      setDone(true);
    } else {
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
            Frameworks Applied: {totalPoints}/5
          </p>
          <p className="text-muted-foreground text-sm">
            You've reasoned through a budget dilemma using three moral
            frameworks. The point isn't which answer is correct — it's that each
            framework reveals a different aspect of the moral landscape.
          </p>
        </div>
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: `oklch(${RED} / 0.05)` }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: `oklch(${RED})` }}
          >
            Key Insight
          </p>
          <p className="text-sm text-foreground/85 leading-relaxed">
            Frameworks don't give you answers — they give you better questions.
            The best ethical decisions draw on all three, rather than
            mechanically applying one.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Scenario setup — only on round 0 */}
      {round === 0 && (
        <div
          className="rounded-xl p-5 space-y-3"
          style={{
            backgroundColor: `oklch(${RED} / 0.06)`,
            border: `1px solid oklch(${RED} / 0.15)`,
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: `oklch(${RED})` }}
          >
            Scenario
          </p>
          <p className="font-semibold text-foreground">{SCENARIO.title}</p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {SCENARIO.setup}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground/70">At stake:</strong>{" "}
            {SCENARIO.stake}
          </p>
        </div>
      )}

      {/* Progress */}
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
          Round {round + 1} of {ROUNDS.length}
        </span>
      </div>

      {/* Round card */}
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
            <p
              className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1"
              style={{ color: `oklch(${RED})` }}
            >
              {currentRound.framework}
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

          {/* Outcome reveal */}
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
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: `oklch(${RED})` }}
                >
                  Analysis
                </p>
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
              className="gap-2"
            >
              {round + 1 < ROUNDS.length ? "Next Round" : "See Results"}
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
