import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const RED = "0.72 0.2 29";

const ROUNDS = [
  {
    situation:
      "You are a diplomat negotiating a human rights treaty between two countries. Country A has mandatory child marriage in rural areas, endorsed by local community leaders. Country B (your country) views this as a rights violation.",
    question: "How do you open the negotiation?",
    options: [
      {
        text: "Assert that child marriage is a universal human rights violation regardless of cultural context",
        outcome:
          "This is the realist diplomatic position — it asserts that rights exist independent of cultural endorsement. It's principled but may be dismissed as cultural imperialism.",
        points: 1,
      },
      {
        text: "Ask Country A to explain the cultural basis and values underpinning the practice",
        outcome:
          "Good diplomatic opening. Understanding the internal logic of a practice is necessary before effective engagement. It doesn't require accepting the practice.",
        points: 1,
      },
    ],
  },
  {
    situation:
      "Country A's negotiators argue: 'Your condemnation is Western moral imperialism. Your ancestors had different practices we now find barbaric. Who are you to judge?'",
    question: "This is the relativist challenge. Your response?",
    options: [
      {
        text: "'You're right that our own history includes wrongs. That's exactly why we believe moral progress is real — and applicable to all cultures.'",
        outcome:
          "Strong realist counter: acknowledging your own history's wrongs while asserting that progress is real (not just change) avoids the self-righteousness charge without conceding relativism.",
        points: 1,
      },
      {
        text: "Concede that the practice may be acceptable within their cultural framework",
        outcome:
          "This collapses into relativism. If practices are acceptable within their cultural context, you lose all basis for human rights diplomacy. Rights become preferences.",
        points: 0,
      },
    ],
  },
  {
    situation:
      "Country A offers a compromise: raise the minimum marriage age to 14 and require community consent. By their own standards, this is a significant concession.",
    question: "Is this a meaningful moral improvement?",
    options: [
      {
        text: "Yes — imperfect progress is still progress, and progress is better than deadlock",
        outcome:
          "Applied consequentialism: an imperfect improvement that prevents some harm is better than a perfect standard that achieves nothing. This is the pragmatic realist position.",
        points: 1,
      },
      {
        text: "No — accepting 14 as a compromise legitimises the framework",
        outcome:
          "Principled deontological position. But if the result is that nothing changes, it's harder to defend this stance purely on principle when real girls are affected.",
        points: 0,
      },
    ],
  },
  {
    situation:
      "A senior official in Country A privately tells you: 'Many of us oppose this practice but can't say so publicly. A treaty gives us cover to change it.' This is critical information.",
    question: "How does this change your strategy?",
    options: [
      {
        text: "Shift focus to supporting internal reform advocates rather than external pressure",
        outcome:
          "This is excellent applied ethics: the most effective change is often internally-led. External pressure that strengthens reformers is more sustainable than imposed standards that breed resistance.",
        points: 1,
      },
      {
        text: "Use this information to press harder in public negotiations",
        outcome:
          "This risks betraying a private confidence and weakening the internal reformers by exposing them. Tactical subtlety serves the moral goal better here.",
        points: 0,
      },
    ],
  },
  {
    situation:
      "The treaty is drafted but Country A insists on language saying practices are 'culturally sensitive matters' rather than 'rights violations.' This framing matters.",
    question: "Do you accept the framing change?",
    options: [
      {
        text: "No — language about rights is not cosmetic; it determines enforceability and future precedent",
        outcome:
          "Correct. In human rights diplomacy, language is the substance. 'Culturally sensitive' removes enforceability and signals relativism in an international instrument.",
        points: 1,
      },
      {
        text: "Yes — the substance matters more than the framing",
        outcome:
          "This is a common diplomatic error. In international law, framing IS substance. Treaties that use rights language create binding obligations; 'culturally sensitive' language creates none.",
        points: 0,
      },
    ],
  },
];

export function Sim4BMetaEthicsReal() {
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
            Negotiation Complete
          </p>
          <p className="font-display text-2xl font-semibold text-foreground mb-2">
            Diplomatic Score: {totalPoints}/{ROUNDS.length}
          </p>
          <p className="text-muted-foreground text-sm">
            Meta-ethics is not just academic. Whether you're a realist or
            relativist about morality determines what human rights diplomacy is
            even possible. The stakes are real.
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
            You are a human rights diplomat. Over 5 rounds, you'll navigate the
            real tension between moral universalism (realism) and cultural
            relativism. Your meta-ethical position has practical consequences.
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
          Round {round + 1} of {ROUNDS.length}
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
              {currentRound.situation}
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
              {round + 1 < ROUNDS.length ? "Next Round" : "See Results"}
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
