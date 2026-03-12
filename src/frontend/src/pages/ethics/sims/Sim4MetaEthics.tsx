import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const RED = "0.72 0.2 29";

const CLAIMS = [
  {
    claim:
      "'Torturing children for fun is wrong — in every culture, in every era.'",
    question: "Which meta-ethical position is most consistent with this claim?",
    options: [
      {
        text: "Moral Realism — there's an objective fact that this is wrong",
        correct: true,
        outcome:
          "Correct. The conviction that this is wrong regardless of cultural belief or historical context is the hallmark of moral realism. If it was wrong 2,000 years ago and is wrong now, that implies a fact that transcends culture.",
      },
      {
        text: "Moral Relativism — it's wrong in our culture but might be acceptable elsewhere",
        correct: false,
        outcome:
          "Relativism struggles with cases like this. If torture of children were accepted in some culture, a relativist would have to say it was 'acceptable there.' Most people find this incoherent. This is one of the strongest arguments against relativism.",
      },
      {
        text: "Error Theory — all moral claims are false, including this one",
        correct: false,
        outcome:
          "Error theory would say this claim purports to state an objective fact, but since no moral facts exist, the statement is technically false. Most people find this deeply counterintuitive, which is a challenge for error theory.",
      },
    ],
  },
  {
    claim:
      "'In ancient Rome, gladiatorial combat was morally acceptable. Today it isn't. Neither view is more correct than the other.'",
    question: "This statement best reflects:",
    options: [
      {
        text: "Moral Realism",
        correct: false,
        outcome:
          "A moral realist would say one of these views is more accurate — either gladiatorial combat was wrong even when accepted, or the modern rejection is based on moral progress. They would not say 'neither is more correct.'",
      },
      {
        text: "Moral Relativism",
        correct: true,
        outcome:
          "Correct. This is the relativist position: moral norms are correct relative to the cultural context in which they operate. Neither the Roman view nor the modern view is universally more accurate — they're just different.",
      },
      {
        text: "Virtue Ethics",
        correct: false,
        outcome:
          "Virtue ethics is a first-order ethical theory (what should we do?), not a meta-ethical position (are moral claims objective?). You can be a virtue ethicist while being either a realist or relativist about moral foundations.",
      },
    ],
  },
  {
    claim:
      "'When someone says slavery is wrong, they're really just expressing their dislike of slavery — not stating a fact.'",
    question: "This claim reflects:",
    options: [
      {
        text: "Moral Realism",
        correct: false,
        outcome:
          "A realist says 'slavery is wrong' is a genuine factual claim — true or false, independent of anyone's feelings. The claim being tested says the opposite.",
      },
      {
        text: "Expressivism",
        correct: true,
        outcome:
          "Correct. Expressivism (a form of anti-realism) holds that moral statements don't express beliefs or facts — they express attitudes. 'Slavery is wrong' means something like 'Boo slavery!' — an expression of disapproval, not a description of the world.",
      },
      {
        text: "Moral Relativism",
        correct: false,
        outcome:
          "Relativism says moral claims are true or false relative to a cultural standard. Expressivism says they're not fact-stating at all. These are different positions.",
      },
    ],
  },
  {
    claim:
      "'The Holocaust was an atrocity — not merely something that violated 20th century Western values, but something that was genuinely, catastrophically wrong.'",
    question: "This claim most strongly implies:",
    options: [
      {
        text: "Expressivism — it just expresses very strong disapproval",
        correct: false,
        outcome:
          "If the claim is 'merely' expressing disapproval, it doesn't have the force people intend. Saying the Holocaust was 'genuinely, catastrophically wrong' seems to assert something stronger than an attitude — it asserts a fact.",
      },
      {
        text: "Moral Realism — it was wrong independent of anyone's values",
        correct: true,
        outcome:
          "Correct. The insistence that the Holocaust was wrong 'not merely' by our standards strongly implies moral realism — the wrongness is not relative, not an expression of attitude, but a fact independent of cultural belief.",
      },
      {
        text: "Moral Relativism — it violated the standards of most cultures",
        correct: false,
        outcome:
          "Relativism can say the Holocaust violated widely shared values. But the claim being tested says more than that — it denies that the wrongness is merely relative. That denial is a realist move.",
      },
    ],
  },
  {
    claim:
      "'No moral claim is ever strictly true or false — they're just elaborate expressions of what we want others to do.'",
    question: "This is closest to:",
    options: [
      {
        text: "Moral Realism",
        correct: false,
        outcome:
          "Realism is the direct opposite of this claim: it holds that moral claims can be true or false, and that some are genuinely true.",
      },
      {
        text: "Expressivism / Non-Cognitivism",
        correct: true,
        outcome:
          "Correct. Non-cognitivism (which includes expressivism) holds that moral claims aren't truth-apt — they don't express beliefs that can be true or false. They express prescriptions, approvals, or commands.",
      },
      {
        text: "Error Theory",
        correct: false,
        outcome:
          "Error theory says moral claims ARE truth-apt (they purport to state facts) but are all false because moral facts don't exist. Non-cognitivism says they're not truth-apt in the first place. These are importantly different.",
      },
    ],
  },
];

export function Sim4MetaEthics() {
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const currentClaim = CLAIMS[round];
  const score = answers.filter(Boolean).length;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
  };
  const handleNext = () => {
    if (selected === null) return;
    setAnswers([...answers, currentClaim.options[selected].correct]);
    if (round + 1 >= CLAIMS.length) setDone(true);
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
            Meta-Ethics Mastery
          </p>
          <p className="font-display text-2xl font-semibold text-foreground mb-2">
            {score} of {CLAIMS.length} correct
          </p>
          <p className="text-muted-foreground text-sm">
            Recognising which meta-ethical position underlies a claim is the
            foundation of understanding moral disagreement. Most disagreements
            are both first-order AND meta-ethical.
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
            You'll see 5 moral claims. For each, identify which meta-ethical
            position — moral realism, relativism, or expressivism — it most
            closely reflects. There is a correct answer for each.
          </p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-border/30 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(round / CLAIMS.length) * 100}%`,
              backgroundColor: `oklch(${RED})`,
            }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          Claim {round + 1} of {CLAIMS.length}
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
              Moral Claim
            </p>
            <p className="text-base font-medium text-foreground italic mb-3">
              {currentClaim.claim}
            </p>
            <p className="text-sm font-medium text-foreground/80">
              {currentClaim.question}
            </p>
          </div>

          <div className="space-y-2">
            {currentClaim.options.map((opt, i) => {
              const isSelected = selected === i;
              const isAnswered = selected !== null;
              const isCorrect = isAnswered && opt.correct;
              const isWrong = isAnswered && isSelected && !opt.correct;
              return (
                <button
                  key={opt.text}
                  type="button"
                  data-ocid={`sim.option.${i + 1}`}
                  onClick={() => handleSelect(i)}
                  disabled={isAnswered}
                  className="w-full text-left px-4 py-3 rounded-lg border text-sm min-h-[44px] transition-all duration-200"
                  style={{
                    borderColor: isCorrect
                      ? "oklch(0.65 0.18 145 / 0.6)"
                      : isWrong
                        ? `oklch(${RED} / 0.6)`
                        : isSelected
                          ? `oklch(${RED} / 0.6)`
                          : "oklch(0.28 0.01 275 / 0.5)",
                    backgroundColor: isCorrect
                      ? "oklch(0.65 0.18 145 / 0.1)"
                      : isWrong
                        ? `oklch(${RED} / 0.1)`
                        : isSelected
                          ? `oklch(${RED} / 0.1)`
                          : "transparent",
                    color: isCorrect
                      ? "oklch(0.8 0.1 145)"
                      : isWrong
                        ? `oklch(${RED})`
                        : isSelected
                          ? `oklch(${RED})`
                          : "oklch(0.9 0.01 80)",
                    cursor: isAnswered ? "default" : "pointer",
                  }}
                >
                  {opt.text}
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
                  {currentClaim.options[selected].outcome}
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
              {round + 1 < CLAIMS.length ? "Next Claim" : "See Results"}
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
