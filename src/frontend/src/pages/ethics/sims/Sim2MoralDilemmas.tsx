import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const RED = "0.72 0.2 29";

const DILEMMAS = [
  {
    title: "The Classic Trolley Problem",
    setup:
      "A runaway trolley is heading toward five people tied to the tracks. You can pull a lever to divert it to a side track with one person.",
    question: "Do you pull the lever?",
    options: [
      {
        text: "Pull the lever — save five at the cost of one",
        agree: 85,
        outcome:
          "85% of people choose this. Consequentialist reasoning: five lives outweigh one. The action is indirect — you redirect existing harm rather than directly causing new harm.",
        points: 1,
      },
      {
        text: "Do nothing — acting would make you responsible",
        agree: 15,
        outcome:
          "15% choose this. Deontological reasoning: doing nothing vs actively killing someone feel morally different, even if the outcomes aren't. Neither choice is obviously wrong.",
        points: 1,
      },
    ],
  },
  {
    title: "The Footbridge",
    setup:
      "Same trolley, same five people. But now you're on a bridge above the tracks. The only way to stop the trolley is to push the large person standing next to you onto the tracks, killing them but stopping the trolley.",
    question: "Do you push?",
    options: [
      {
        text: "Push — same logic as the lever, five vs one",
        agree: 11,
        outcome:
          "Only 11% choose this, despite identical arithmetic. Directly using a person as a means — physically pushing them — violates something most people feel is categorically different from redirecting harm.",
        points: 1,
      },
      {
        text: "Refuse — directly using someone as a means is different",
        agree: 89,
        outcome:
          "89% refuse. This reveals that how we cause harm matters morally, not just how much harm results. Pure consequentialism struggles to explain this widespread intuition.",
        points: 1,
      },
    ],
  },
  {
    title: "The Transplant Surgeon",
    setup:
      "You are a surgeon with five patients dying from organ failure. A healthy patient comes in for a check-up. You could harvest their organs, killing them, and save all five.",
    question: "Do you harvest the organs?",
    options: [
      {
        text: "Yes — five lives saved outweigh one lost",
        agree: 3,
        outcome:
          "Almost no one endorses this, even though the arithmetic is the same as the trolley problem. This shows how context and the nature of the action change our intuitions dramatically.",
        points: 1,
      },
      {
        text: "No — using a person as a medical resource violates their fundamental rights",
        agree: 97,
        outcome:
          "97% refuse. Rights aren't just strong preferences — they constrain what we can do even for good outcomes. This is the core of deontological thinking.",
        points: 1,
      },
    ],
  },
  {
    title: "The Lifeboat",
    setup:
      "A lifeboat carries 12 people in freezing water. It can safely hold 10. Two people must go overboard or everyone dies. No one volunteers.",
    question: "What do you do?",
    options: [
      {
        text: "Draw lots — random selection is the only fair method",
        agree: 61,
        outcome:
          "Most people prefer random selection as the fairest method when no other criteria exist. It treats everyone as equally valuable and removes bias.",
        points: 1,
      },
      {
        text: "Ask for volunteers — autonomy should come first",
        agree: 39,
        outcome:
          "Respecting autonomy before coercion is a strong deontological principle. But what if no one volunteers? The dilemma is genuine — there may be no clean answer.",
        points: 1,
      },
    ],
  },
  {
    title: "The Bomber",
    setup:
      "A terrorist has planted a bomb that will kill 1,000 people. You have captured their associate. Torturing this person will definitely reveal the bomb's location. There is no other way.",
    question: "Do you authorise torture?",
    options: [
      {
        text: "Yes — 1,000 lives clearly outweigh one person's suffering",
        agree: 43,
        outcome:
          "Consequentialist reasoning supports this in the hypothetical. But: these scenarios are designed to isolate our intuitions. Real ticking-bomb cases are far less certain. The philosophical question is whether any outcome can justify torture.",
        points: 1,
      },
      {
        text: "No — torture is categorically wrong and cannot be justified by outcomes",
        agree: 57,
        outcome:
          "Deontological position: some acts are wrong regardless of consequences. If we accept torture for 1,000 lives, what about 100? 10? 2? The principle doesn't hold a stable line once consequences alone justify it.",
        points: 1,
      },
    ],
  },
];

export function Sim2MoralDilemmas() {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const currentDilemma = DILEMMAS[round];

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
  };

  const handleNext = () => {
    if (selected === null) return;
    setAnswers([...answers, selected]);
    if (round + 1 >= DILEMMAS.length) setDone(true);
    else {
      setRound(round + 1);
      setSelected(null);
    }
  };

  if (done) {
    const majority =
      answers.filter((a, i) => a === 0 && DILEMMAS[i].options[0].agree > 50)
        .length +
      answers.filter((a, i) => a === 1 && DILEMMAS[i].options[1].agree > 50)
        .length;
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
            Dilemmas Faced: {DILEMMAS.length}
          </p>
          <p className="font-display text-2xl font-semibold text-foreground mb-2">
            You agreed with the majority {majority} of 5 times
          </p>
          <p className="text-muted-foreground text-sm">
            The point isn't what the majority chooses — it's understanding why
            your intuitions lead where they lead, and which moral framework they
            reflect.
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
            How This Works
          </p>
          <p className="text-sm text-foreground/80">
            You'll face 5 classic moral dilemmas. For each, choose what you
            would do — then see how your answer compares to thousands of others
            and what it reveals about your moral reasoning.
          </p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-border/30 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(round / DILEMMAS.length) * 100}%`,
              backgroundColor: `oklch(${RED})`,
            }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          Dilemma {round + 1} of {DILEMMAS.length}
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
            <p
              className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2"
              style={{ color: `oklch(${RED})` }}
            >
              {currentDilemma.title}
            </p>
            <p className="text-sm text-foreground/85 leading-relaxed mb-3">
              {currentDilemma.setup}
            </p>
            <p className="font-medium text-foreground">
              {currentDilemma.question}
            </p>
          </div>

          <div className="space-y-2">
            {currentDilemma.options.map((opt, i) => {
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
                className="rounded-lg p-4 space-y-2"
                style={{
                  backgroundColor: `oklch(${RED} / 0.07)`,
                  borderLeft: `3px solid oklch(${RED} / 0.5)`,
                }}
              >
                <div className="flex gap-4 text-xs">
                  {currentDilemma.options.map((opt, i) => (
                    <span
                      key={opt.text}
                      className="font-medium"
                      style={{
                        color:
                          selected === i
                            ? `oklch(${RED})`
                            : "oklch(0.6 0.01 275)",
                      }}
                    >
                      {String.fromCharCode(65 + i)}: {opt.agree}% choose this
                    </span>
                  ))}
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  {currentDilemma.options[selected].outcome}
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
              {round + 1 < DILEMMAS.length ? "Next Dilemma" : "See Results"}
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
