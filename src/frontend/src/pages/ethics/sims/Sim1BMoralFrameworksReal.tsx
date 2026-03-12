import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const RED = "0.72 0.2 29";

const ROUNDS = [
  {
    context: "Day 1: Discovery",
    situation:
      "You are a journalist. A whistleblower has sent you documents proving a pharmaceutical company is suppressing trial data showing their drug increases heart attack risk in elderly patients. Thousands of people are taking this drug.",
    question: "Your first decision: verify before acting?",
    options: [
      {
        text: "Begin verification — ethics of publishing requires knowing it's true",
        outcome:
          "Correct journalistic ethics. Publishing unverified information causes harm even when motivated by good intent. Verification is a deontological duty of your profession.",
        points: 1,
      },
      {
        text: "Publish immediately — people could die waiting",
        outcome:
          "Consequentialist urgency, but publishing falsehoods also causes harm. False alarms destroy trust and harm future whistleblowing. The frameworks converge on verification.",
        points: 0,
      },
    ],
  },
  {
    context: "Day 3: The Source",
    situation:
      "The whistleblower is a company insider who accessed documents illegally. Publishing will almost certainly expose them to prosecution.",
    question: "Do you protect source identity even at legal risk to yourself?",
    options: [
      {
        text: "Yes — protecting sources is a non-negotiable journalistic duty",
        outcome:
          "Strong deontological position: betraying sources violates the trust that makes whistleblowing possible, destroying the public interest it serves.",
        points: 1,
      },
      {
        text: "Warn the source but you cannot guarantee protection",
        outcome:
          "Honest and defensible. Virtue ethics: don't make promises you can't keep. But it may prevent the story from coming out.",
        points: 1,
      },
    ],
  },
  {
    context: "Day 5: The Company",
    situation:
      "The company's legal team contacts you. They offer to 'address your concerns internally' if you hold the story. They also threaten to sue if you publish.",
    question: "How do you respond?",
    options: [
      {
        text: "Decline and proceed — 'addressing internally' is not public accountability",
        outcome:
          "Consequentially: the public cannot be protected by a private fix. Deontologically: the public interest duty cannot be traded away.",
        points: 1,
      },
      {
        text: "Seek comment from the company and include it in the story",
        outcome:
          "Best practice. Fairness is both a journalistic duty and a virtue. But it must not become a delay tactic that lets them suppress the story.",
        points: 1,
      },
    ],
  },
  {
    context: "Day 7: Named Individuals",
    situation:
      "The documents name three mid-level researchers who signed off on the suppressed data. Publishing names them publicly.",
    question: "Do you name them in the published story?",
    options: [
      {
        text: "Yes — accountability requires names, not just institutions",
        outcome:
          "Consequentialist: institutional accountability requires individual accountability. Deontological concern: individuals have rights to due process.",
        points: 0,
      },
      {
        text: "Name the company but contact individuals for comment first",
        outcome:
          "Best practice. Virtue ethics: fairness. Deontology: right to respond. Consequences: protects against defamation claims. All three frameworks align here.",
        points: 1,
      },
    ],
  },
  {
    context: "Day 9: Publication Decision",
    situation:
      "Your editors support publication. Legal says risk is manageable. The drug company has not withdrawn the product. Elderly patients are still taking it.",
    question: "Final decision: publish?",
    options: [
      {
        text: "Publish the full investigation with all supporting evidence",
        outcome:
          "The moral calculus is clear: verified information about a public health risk, in the public interest, with fairness to those named. All frameworks support publication.",
        points: 1,
      },
      {
        text: "Alert regulators privately and give them 48 hours to act before publishing",
        outcome:
          "A sophisticated consequentialist move: faster patient protection without the reputational risk of publication. But it gives regulators the power to bury it. Both defensible.",
        points: 1,
      },
    ],
  },
];

export function Sim1BMoralFrameworksReal() {
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
            Investigation Complete
          </p>
          <p className="font-display text-2xl font-semibold text-foreground mb-2">
            Ethical Score: {totalPoints}/{ROUNDS.length}
          </p>
          <p className="text-muted-foreground text-sm">
            Journalism ethics is applied ethics in high-stakes real time. Every
            decision involved competing duties, uncertain consequences, and
            genuine moral costs.
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
          Day {round + 1} of {ROUNDS.length}
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
              className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1"
              style={{ color: `oklch(${RED})` }}
            >
              {currentRound.context}
            </p>
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
              {round + 1 < ROUNDS.length ? "Next Day" : "See Results"}
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
