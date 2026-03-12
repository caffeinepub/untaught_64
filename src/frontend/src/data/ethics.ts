export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Module {
  id: number;
  title: string;
  lessonId: string;
  simulationId: string;
  simulation2Id?: string;
  quizId: string;
}

export type LessonSectionType =
  | "concept"
  | "mechanism"
  | "warning"
  | "example"
  | "trap"
  | "fix";

export interface LessonSection {
  heading: string;
  body: string | string[];
  type?: LessonSectionType;
  example?: string;
  check?: {
    question: string;
    options: string[];
    correctIndex: number;
    hint: string;
  };
}

export interface Lesson {
  title: string;
  sections: LessonSection[];
}

export const ETHICS_MODULES: Module[] = [
  {
    id: 1,
    title: "Moral Frameworks",
    lessonId: "et-m1-lesson",
    simulationId: "et-m1-sim",
    simulation2Id: "et-m1-sim2",
    quizId: "et-m1-quiz",
  },
  {
    id: 2,
    title: "Moral Dilemmas",
    lessonId: "et-m2-lesson",
    simulationId: "et-m2-sim",
    simulation2Id: "et-m2-sim2",
    quizId: "et-m2-quiz",
  },
  {
    id: 3,
    title: "Applied Ethics",
    lessonId: "et-m3-lesson",
    simulationId: "et-m3-sim",
    simulation2Id: "et-m3-sim2",
    quizId: "et-m3-quiz",
  },
  {
    id: 4,
    title: "Meta-Ethics",
    lessonId: "et-m4-lesson",
    simulationId: "et-m4-sim",
    simulation2Id: "et-m4-sim2",
    quizId: "et-m4-quiz",
  },
];

// ─── Module 1: Moral Frameworks ────────────────────────────────────────────────
export const M1_LESSON: Lesson = {
  title: "Moral Frameworks",
  sections: [
    {
      heading: "Every moral choice you make is guided by a hidden rulebook",
      type: "concept",
      body: [
        "Every time you judge an action as right or wrong, you're applying a moral framework — a structured set of principles for evaluating conduct. Most people do this without knowing it. They're following rules they've absorbed from culture, upbringing, and intuition without ever examining those rules explicitly.",
        "A moral framework isn't just philosophy for its own sake. It's a tool for being consistent, for understanding why you disagree with others, and for making better decisions in genuinely difficult situations. When you know which frameworks exist and what they claim, you can reason about ethics rather than just reacting.",
        "Three frameworks dominate Western ethics: consequentialism, deontology, and virtue ethics. Each asks a different question and gives a different answer — sometimes wildly different — to the same ethical situation. Understanding all three is the starting point for any serious ethical reasoning.",
      ],
      example:
        "A hospital has one ventilator and two patients who need it. A consequentialist asks who is most likely to survive. A deontologist asks whether either patient has a prior claim. A virtue ethicist asks what a compassionate, wise doctor would do. Same situation, three different questions — and often three different answers.",
      check: {
        question:
          "Why is it useful to know which moral framework you're using?",
        options: [
          "So you can pick the one that justifies what you already want to do",
          "So you can reason consistently and understand disagreements",
          "Because philosophers require it",
          "To avoid making moral judgments at all",
        ],
        correctIndex: 1,
        hint: "Knowing your framework helps you reason consistently — applying the same principles across similar situations — and helps you understand why others disagree. Disagreements are often not about facts but about which framework people are applying.",
      },
    },
    {
      heading: "Consequentialism: the outcome is the only thing that matters",
      type: "mechanism",
      body: [
        "Consequentialism holds that the moral value of an action is determined entirely by its consequences. An action is right if it produces the best outcome; wrong if it produces worse outcomes than the alternatives. The most famous version is utilitarianism: maximise total wellbeing.",
        "This framework is powerful because it's grounded in things we actually care about — suffering, flourishing, happiness, harm. It doesn't rely on arbitrary rules. It's flexible and responsive to context: the same action can be right in one situation and wrong in another, depending on outcomes.",
        "The challenge is that consequentialism can justify actions that feel deeply wrong. If torturing one innocent person prevents the deaths of many, a strict consequentialist must endorse it. The framework follows the logic wherever it leads, even when the destination offends our intuitions.",
      ],
      example:
        "During the trolley problem — a runaway trolley is heading toward five people; you can pull a lever to divert it to a track with one person — most people pull the lever. That's consequentialist reasoning: five lives saved outweigh one lost. But when asked to push someone off a bridge to stop the trolley, most refuse, even though the maths is identical. The discomfort reveals the limits of pure consequentialism.",
      check: {
        question:
          "A factory pollutes a river, harming 10 families, but provides jobs to 500 people. What does consequentialism say?",
        options: [
          "Pollution is always wrong regardless of benefits",
          "It depends on whether total wellbeing is increased or decreased",
          "Jobs are more important than environmental harm",
          "The factory owners should decide",
        ],
        correctIndex: 1,
        hint: "Consequentialism doesn't have a fixed answer — it depends on the total outcome. If the wellbeing gained by 500 employed people genuinely exceeds the harm to 10 families, a strict consequentialist might endorse it. This is exactly what makes the framework both powerful and troubling.",
      },
    },
    {
      heading: "Deontology: some things are just wrong, full stop",
      type: "mechanism",
      body: [
        "Deontology holds that some actions are intrinsically right or wrong, regardless of their consequences. Associated with philosopher Immanuel Kant, it focuses on duties, rules, and rights. You must never use a person merely as a means to an end — they always have intrinsic worth.",
        "Kant's central principle, the Categorical Imperative, says: act only according to rules you could will to become universal laws. If lying is wrong, it's wrong for everyone in all circumstances. If it's acceptable in one case, it must be acceptable whenever the same conditions hold. Morality isn't situational — it's universal.",
        "Deontology takes rights seriously in a way consequentialism struggles to. It explains why we feel that torture is wrong even when it might save lives: the person being tortured has a right not to be treated as a mere instrument. That right doesn't vanish because of arithmetic.",
      ],
      example:
        "The classic test: a murderer knocks on your door asking if your friend is inside (they are). Kant says you must not lie, even to protect your friend, because lying is intrinsically wrong regardless of consequences. Most people find this deeply unsatisfying — which is itself useful data about the limits of absolute deontology.",
      check: {
        question:
          "A deontologist would say the trolley lever is acceptable because:",
        options: [
          "Five lives saved outweigh one lost",
          "You have a duty to save as many people as possible",
          "You are redirecting harm, not actively causing it — your duty is different",
          "Deontologists would refuse to pull the lever",
        ],
        correctIndex: 2,
        hint: "Many deontologists distinguish between redirecting existing harm (lever) and actively using someone as a means (pushing). The distinction isn't about numbers — it's about the nature of the action and your duty. This is why the lever case and the bridge case feel morally different to most people.",
      },
    },
    {
      heading: "Virtue ethics: the question is who you're becoming",
      type: "mechanism",
      body: [
        "Virtue ethics, rooted in Aristotle, shifts the question from 'what should I do?' to 'what kind of person should I be?' A good action is what a person of excellent character would do — and the goal of ethics is to cultivate that character over a lifetime.",
        "Virtues are stable character traits that enable you to act well: courage, honesty, compassion, justice, practical wisdom (phronesis). These can't be reduced to rules because good action requires judgment about context. A courageous person doesn't follow a rule — they read the situation and act appropriately.",
        "The framework captures something the others miss: ethics isn't just a set of constraints or calculations. It's a practice of becoming. The person who avoids lying only because a rule says so is different from the person who's honest because honesty is part of who they are. Virtue ethics takes the inner life seriously.",
      ],
      example:
        "In a business meeting, someone shares a false claim that benefits your company. Consequentialism says: what are the outcomes of correcting vs staying silent? Deontology says: you have a duty to correct false information. Virtue ethics says: what would an honest person with integrity do here? Often the answers converge — but the question you ask shapes the reasoning.",
      check: {
        question:
          "A virtue ethicist asks 'what would a courageous person do?' rather than 'what produces the best outcome' because:",
        options: [
          "Outcomes are irrelevant in ethics",
          "Good character is the foundation of good action, not a formula",
          "Rules are more important than character",
          "Courage always produces good outcomes",
        ],
        correctIndex: 1,
        hint: "Virtue ethics holds that acting well flows from being a certain kind of person — someone who has developed practical wisdom and good character. A formula or rule can tell you what to do, but it can't make you the kind of person who does it for the right reasons, with the right judgment.",
      },
    },
  ],
};

export const M1_WILD = {
  title: "Spot It in the Wild",
  examples: [
    {
      title: "Criminal sentencing debates",
      description:
        "Consequentialists argue for rehabilitation (what reduces future crime?). Deontologists argue for retribution (justice as a right). Virtue ethicists ask what a just society looks like.",
    },
    {
      title: "Whistleblowing",
      description:
        "A consequentialist whistleblower weighs public good against personal risk. A deontologist may feel duty-bound to report wrongdoing regardless of consequences. A virtue ethicist asks: what would an honest, courageous person do?",
    },
    {
      title: "Animal welfare",
      description:
        "Consequentialists include animal suffering in their calculus. Deontologists debate whether animals have rights. Virtue ethicists ask what compassion toward other creatures looks like.",
    },
  ],
};

export const M1_QUIZ: QuizQuestion[] = [
  {
    id: "et-m1q1",
    question: "A consequentialist evaluates an action primarily by:",
    options: [
      "Whether it follows a universal rule",
      "Whether it reflects good character",
      "Whether it produces the best overall outcome",
      "Whether it respects individual rights",
    ],
    correctIndex: 2,
    explanation:
      "Consequentialism judges actions by their results. The action that produces the best outcome — usually measured in wellbeing or happiness — is the right one. Rules and character matter only insofar as they tend to produce good outcomes.",
  },
  {
    id: "et-m1q2",
    question:
      "Kant's Categorical Imperative says you should act according to rules that:",
    options: [
      "Produce the most happiness",
      "You could will to be universal laws",
      "Most people would agree with",
      "Your community endorses",
    ],
    correctIndex: 1,
    explanation:
      "The Categorical Imperative tests whether a rule could be universalised without contradiction. If you make an exception for yourself — 'I'll lie when it suits me' — but couldn't endorse everyone lying when it suits them, the rule fails the test. Morality must be universal, not self-serving.",
  },
  {
    id: "et-m1q3",
    question: "Virtue ethics focuses primarily on:",
    options: [
      "The consequences of actions",
      "The rules that govern actions",
      "The character of the person acting",
      "The rights of those affected",
    ],
    correctIndex: 2,
    explanation:
      "Virtue ethics asks: 'What kind of person should I be?' and 'What would a person of good character do?' It shifts the focus from rules and outcomes to the inner life of the moral agent — their dispositions, habits, and practical wisdom.",
  },
  {
    id: "et-m1q4",
    question:
      "The trolley problem reveals a tension in consequentialism because:",
    options: [
      "People refuse to pull the lever",
      "People act differently when the action is direct vs indirect, even with identical outcomes",
      "Five is always more than one",
      "The maths is too complex",
    ],
    correctIndex: 1,
    explanation:
      "Most people pull the lever (redirect harm) but refuse to push someone off a bridge, even though both save five at the cost of one. The identical arithmetic produces different moral intuitions, suggesting that how we cause harm matters independently of outcomes — a challenge consequentialism struggles with.",
  },
  {
    id: "et-m1q5",
    question:
      "Which framework is most likely to endorse lying to protect someone from serious harm?",
    options: [
      "Strict Kantian deontology",
      "Consequentialism",
      "A rule that prohibits all deception regardless of context",
      "Virtue ethics applied mechanically",
    ],
    correctIndex: 1,
    explanation:
      "Consequentialism weighs outcomes: if lying prevents serious harm and produces a better overall result, it's justified. Strict deontology (Kant's version) prohibits lying absolutely. Virtue ethics would ask what a compassionate, honest person would do — and many virtue ethicists would endorse protective lies as an expression of care.",
  },
];

// ─── Module 2: Moral Dilemmas ────────────────────────────────────────────────
export const M2_LESSON: Lesson = {
  title: "Moral Dilemmas",
  sections: [
    {
      heading: "Not all hard choices are dilemmas — but some really are",
      type: "concept",
      body: [
        "A moral dilemma is a situation where every available option involves a genuine moral wrong or cost. It's not just a hard decision — it's a situation where no matter what you choose, you violate something that matters. The discomfort isn't weakness; it's an accurate response to a genuine ethical conflict.",
        "Most hard choices aren't true dilemmas. Choosing between a convenient lie and an uncomfortable truth is hard, but the right answer is usually clear. A genuine dilemma exists when two legitimate moral claims — two real duties, two genuine rights — pull in opposite directions, and you can only satisfy one.",
        "Understanding this distinction matters because people often avoid moral reasoning by treating genuine dilemmas as if they have obvious answers. They do not. The goal of reasoning through a dilemma is not to make the discomfort go away — it's to act well despite it.",
      ],
      example:
        "A doctor has one dose of a scarce medicine. Two patients need it equally urgently. Giving it to one saves them; the other dies. This is a genuine dilemma — not a failure of creativity or resources. The doctor will cause a death either way. The task is to reason about how to make the least-wrong choice, not to find a way out.",
      check: {
        question:
          "What distinguishes a genuine moral dilemma from a merely difficult choice?",
        options: [
          "Genuine dilemmas have no right answer at all",
          "Genuine dilemmas involve a moral cost on every available path",
          "Difficult choices are just dilemmas you haven't thought through yet",
          "Dilemmas involve only two options",
        ],
        correctIndex: 1,
        hint: "A genuine moral dilemma isn't just hard — it's a situation where every option involves violating something of real moral value. The choice isn't between good and bad; it's between two things that are each genuinely important. Accepting this prevents the false comfort of thinking the problem can be solved cleanly.",
      },
    },
    {
      heading: "The trolley problem isn't about trolleys",
      type: "example",
      body: [
        "The trolley problem, devised by philosopher Philippa Foot in 1967, is a thought experiment designed to isolate our moral intuitions about harm. A runaway trolley is heading toward five people. You can pull a lever to divert it to a track with one person. Do you pull?",
        "Most people say yes — five lives saved outweigh one lost. Now change the scenario: you're on a bridge above the tracks. The only way to stop the trolley is to push the large person next to you onto the tracks, killing them but saving the five. Same arithmetic — do you push?",
        "Most people say no. This is the puzzle. The outcomes are mathematically identical (five saved, one killed), but the moral intuition reverses completely. This tells us something important: our moral instincts don't run on arithmetic alone. The way we cause harm — directly vs indirectly, using someone as a means vs redirecting existing harm — changes how we evaluate the action.",
      ],
      example:
        "This thought experiment has shaped real-world policy debates: autonomous vehicle ethics (should a self-driving car be programmed to minimise deaths even if that means harming its passenger?), military targeting rules, and medical triage. The trolley problem isn't academic — it's a simplified version of decisions societies and systems actually make.",
      check: {
        question:
          "Why do most people pull the lever but refuse to push the person off the bridge?",
        options: [
          "Because they're being inconsistent",
          "Because physical contact makes them squeamish",
          "Because directly using a person as a means feels different from redirecting existing harm",
          "Because the bridge scenario is physically impossible",
        ],
        correctIndex: 2,
        hint: "The intuition isn't irrational — it reflects a genuine moral distinction. Pushing someone uses them as a tool to achieve your goal (even a good one). Pulling the lever redirects harm that already exists. This distinction between using someone as a means and redirecting harm is the core of deontological thinking about dilemmas.",
      },
    },
    {
      heading: "When your gut and your logic disagree — take both seriously",
      type: "warning",
      body: [
        "One of the most important skills in ethical reasoning is knowing when to trust your moral intuitions and when to override them with argument. Philosophers call this 'tollensing the ponens' — when a logically valid argument leads to a monstrous conclusion, the right response might be to reject a premise rather than accept the conclusion.",
        "If an argument says: 'If maximising wellbeing is always right, and torturing one innocent person would maximise wellbeing, then torturing that person is right' — the logical conclusion is torture. But if the conclusion feels clearly wrong, that's evidence against the premise. Strong intuitions are data, not just feelings.",
        "Equally, intuitions can be wrong. Historical moral progress has often required overriding widespread intuitions — about slavery, about who counts as a person, about the treatment of women. The skill is judging when an intuition reflects a genuine moral truth and when it reflects bias, unfamiliarity, or self-interest.",
      ],
      example:
        "Peter Singer's famous argument: you can save a drowning child in front of you at the cost of your expensive shoes. Most people say yes, clearly. But by the same reasoning, you could save a distant child dying of malnutrition for the same cost. Our intuition says these are different — Singer argues they're not. You don't have to accept his conclusion, but you should grapple with why the intuitions differ.",
      check: {
        question:
          "When a valid argument leads to a conclusion that seems clearly monstrous, what is the most sophisticated response?",
        options: [
          "Accept the conclusion — logic must be right",
          "Reject all logical arguments in ethics",
          "Question the premises — a strong intuition against the conclusion is evidence one premise is wrong",
          "Ignore the argument and follow your gut",
        ],
        correctIndex: 2,
        hint: "Philosophers call this 'modus tollens' — using the falsity of a conclusion to infer the falsity of a premise. In ethics, strong intuitions serve as evidence. If an argument's conclusion is clearly unacceptable, that tells you something is wrong with the argument, even if you can't immediately identify which premise is false.",
      },
    },
    {
      heading: "How to reason through a dilemma when frameworks disagree",
      type: "fix",
      body: [
        "When facing a genuine moral dilemma, no framework will give you a clean answer. But having a structured approach helps you reason well rather than freeze or pick arbitrarily. Start by identifying what moral claims are genuinely at stake — not what you want to do, but what competing values are in tension.",
        "Apply multiple frameworks deliberately. What does each say? Where do they agree? The overlapping consensus is stronger ground than any single framework. Where they disagree, examine why — the disagreement often reveals which premise you're most committed to.",
        "Accept that in a genuine dilemma, you may need to act and carry the moral remainder — the residue of the value you couldn't honour. A doctor who chooses one patient over another hasn't done nothing wrong. They've done the least-wrong thing. Acknowledging this isn't weakness; it's moral seriousness.",
      ],
      example:
        "A financial advisor discovers their firm is about to make decisions they believe will harm clients. They can stay silent (protect their job and family's income), speak internally (risk retaliation), or blow the whistle externally (risk criminal exposure). No option is clean. Reasoning through frameworks — who has the greatest claim? what would an honest person do? what are the likely outcomes? — doesn't eliminate the cost, but it makes the decision deliberate rather than reactive.",
    },
  ],
};

export const M2_WILD = {
  title: "Spot It in the Wild",
  examples: [
    {
      title: "Medical triage",
      description:
        "Doctors in emergencies must choose who receives scarce treatment. Every framework — save the most people, honour prior claims, act with compassion — gives different guidance. Real protocols reflect uneasy compromises.",
    },
    {
      title: "Self-driving car ethics",
      description:
        "When an accident is unavoidable, how should autonomous vehicles be programmed to allocate harm? The trolley problem became a real engineering question.",
    },
    {
      title: "Wartime targeting decisions",
      description:
        "Military commanders regularly face dilemmas where reducing civilian casualties conflicts with achieving military objectives. International humanitarian law attempts to codify minimum standards — but the dilemmas remain.",
    },
  ],
};

export const M2_QUIZ: QuizQuestion[] = [
  {
    id: "et-m2q1",
    question: "What defines a genuine moral dilemma?",
    options: [
      "A situation that is too complicated to reason about",
      "A situation where every option involves a genuine moral cost",
      "A situation where you don't know the right answer",
      "A situation that requires expert knowledge to resolve",
    ],
    correctIndex: 1,
    explanation:
      "A genuine dilemma isn't about ignorance or complexity — it's about moral structure. Every available path violates something of real moral value. The discomfort is the correct response to a real conflict, not a sign that you're reasoning poorly.",
  },
  {
    id: "et-m2q2",
    question:
      "In the trolley problem, most people pull the lever but refuse to push someone off a bridge. This shows:",
    options: [
      "People are inconsistent and irrational",
      "Consequences are what matter, not means",
      "How we cause harm matters morally, not just how much harm results",
      "People prefer inaction over action",
    ],
    correctIndex: 2,
    explanation:
      "The identical arithmetic (five saved, one killed) produces different moral responses. This reveals that the mechanism of harm — directly using a person vs redirecting existing harm — carries moral weight independently of outcomes. Pure consequentialism struggles to explain this widespread intuition.",
  },
  {
    id: "et-m2q3",
    question: "'Tollensing the ponens' in ethics means:",
    options: [
      "Accepting all logical conclusions regardless of how troubling they are",
      "Rejecting logic in favour of intuition",
      "Using a clearly wrong conclusion as evidence against a premise",
      "Applying multiple frameworks simultaneously",
    ],
    correctIndex: 2,
    explanation:
      "When an argument leads to a conclusion that seems clearly monstrous, you can run the argument backwards: the conclusion is unacceptable, so one of the premises must be wrong. Strong moral intuitions serve as evidence — they don't override all arguments, but they're not nothing either.",
  },
  {
    id: "et-m2q4",
    question:
      "A doctor must choose between two equally urgent patients but only has one treatment. After making the best decision possible, she feels guilty. This feeling:",
    options: [
      "Shows she made the wrong choice",
      "Is irrational and should be dismissed",
      "Is the appropriate moral remainder from a genuine dilemma",
      "Means she should have chosen differently",
    ],
    correctIndex: 2,
    explanation:
      "In genuine dilemmas, doing the least-wrong thing still involves a moral cost. The lingering guilt — called 'moral remainder' by philosophers — is the appropriate emotional response to having violated a genuine moral claim, even when you acted as well as you could. Its absence would suggest a lack of moral seriousness.",
  },
  {
    id: "et-m2q5",
    question:
      "Which approach is most useful for reasoning through a genuine moral dilemma?",
    options: [
      "Pick one framework and follow it mechanically",
      "Wait for more information until a clear answer emerges",
      "Identify the competing moral claims, apply multiple frameworks, and act on the overlapping consensus",
      "Do whatever causes you the least personal discomfort",
    ],
    correctIndex: 2,
    explanation:
      "No single framework resolves all dilemmas cleanly. Applying multiple frameworks and looking for convergence gives you stronger grounds for action. Where they disagree, examining why illuminates which premises you're most committed to. Then act — and accept the moral remainder.",
  },
];

// ─── Module 3: Applied Ethics ────────────────────────────────────────────────
export const M3_LESSON: Lesson = {
  title: "Applied Ethics",
  sections: [
    {
      heading: "Abstract frameworks don't make decisions — you do",
      type: "concept",
      body: [
        "Applied ethics is the practice of bringing ethical frameworks to bear on real situations. It's where theory meets context — where you have to judge not just what's right in principle but what's right here, given these constraints, these people, and these consequences.",
        "The gap between knowing ethical theory and reasoning well about concrete situations is large. A consequentialist framework tells you to maximise wellbeing — but it doesn't tell you how to weigh short-term against long-term, or individual against collective, or certain harm against probable benefit. That judgment requires practice and wisdom, not just principles.",
        "Applied ethics isn't softer than theoretical ethics — it's harder, because you lose the protection of abstraction. Every case is specific. Every decision has a real person bearing the consequences. The frameworks are tools; you are the one who has to use them.",
      ],
      example:
        "A pharmacist is asked to fill a prescription they believe is being misused. The principles are clear: respect patient autonomy (deontology), prevent harm (consequentialism), act with professional integrity (virtue ethics). Applied ethics is the hard work of determining which principle prevails in this specific context, with this specific patient.",
      check: {
        question:
          "Applied ethics differs from theoretical ethics primarily because:",
        options: [
          "It ignores abstract principles",
          "It requires judgment about specific contexts, not just principles",
          "It's easier — real situations clarify what's right",
          "It only applies to professional settings",
        ],
        correctIndex: 1,
        hint: "Theoretical ethics gives you frameworks and principles. Applied ethics is the practice of using them wisely in concrete situations — which requires judgment, knowledge of context, and awareness of consequences that no abstract principle can fully specify.",
      },
    },
    {
      heading: "Professional ethics: when your role creates special duties",
      type: "mechanism",
      body: [
        "Professions like medicine, law, and engineering create special ethical obligations that go beyond ordinary moral duties. A lawyer must maintain client confidentiality even if the information is damaging to third parties. A doctor must prioritise patient welfare even against institutional pressures. An engineer must flag safety concerns even at personal cost.",
        "These professional duties exist because role relationships create trust and dependency. A patient who cannot evaluate their own medical situation depends entirely on their doctor's honest judgment. Violating that dependency isn't just a breach of rules — it's a betrayal of the trust that makes the profession possible.",
        "Professional ethics also creates conflicts: your duty to a client may conflict with your duty to the public. The lawyer who knows their client is guilty. The accountant who discovers fraud. The engineer who discovers a structural flaw. In each case, professional frameworks provide guidance, but genuine ethical judgment remains necessary.",
      ],
      example:
        "The 1986 Challenger space shuttle disaster illustrates this exactly. Engineers at Morton Thiokol raised serious concerns about O-ring performance in cold temperatures. Institutional pressure to launch overrode technical judgment. Seven astronauts died. The engineers faced a classic professional ethics conflict: their duty to flag safety concerns vs institutional pressure to proceed. The ones who stayed silent didn't just make a technical error — they failed an ethical test.",
      check: {
        question:
          "A lawyer discovers their client has lied in testimony. What is the core ethical tension?",
        options: [
          "They want to win the case but shouldn't",
          "Client confidentiality conflicts with duty to the court and justice",
          "Lying is always wrong regardless of context",
          "They should report the client to the police",
        ],
        correctIndex: 1,
        hint: "Legal professional ethics creates a genuine conflict between duties: the duty to protect client confidentiality and the duty not to assist in fraud or obstruction of justice. Most legal codes require the lawyer to withdraw from the case. Neither duty fully trumps the other — the conflict is managed, not resolved.",
      },
    },
    {
      heading: "When rules produce bad outcomes — and what to do",
      type: "warning",
      body: [
        "Rules exist because we can't reason through every decision from scratch. They encode accumulated moral wisdom and create predictability and trust. But rules are designed for typical cases; they don't anticipate every situation. Sometimes following a rule produces an outcome that's clearly worse than breaking it.",
        "The tension between rule-following and outcome-maximising is permanent in applied ethics. A doctor who never bends administrative rules will protect the institution but sometimes harm patients. One who always bends rules will sometimes help patients but will also make decisions that can't be generalised without chaos.",
        "The practical wisdom approach: follow rules as the strong default, especially when the reasons for them aren't fully visible to you. Override rules only when you can clearly articulate why, can accept the consequence of the rule-breaking becoming general practice, and have genuinely exhausted the path within the rules.",
      ],
      example:
        "A hospital policy requires two senior sign-offs before a high-risk procedure. The patient is deteriorating and one senior doctor is unavailable. The attending doctor can wait (rule-following, patient may die) or proceed (rule-breaking, may save patient). This is not an excuse to break rules casually — it's a genuine conflict that requires deliberate, accountable judgment.",
      check: {
        question: "When is it ethically acceptable to break a rule?",
        options: [
          "Whenever following the rule produces a worse outcome",
          "Never — rules must be followed regardless of consequences",
          "When you can clearly articulate the reason, accept the consequences if generalised, and have exhausted rule-following options",
          "Whenever you personally believe the outcome justifies it",
        ],
        correctIndex: 2,
        hint: "The key tests are: Can you clearly articulate why this case is exceptional? Could you defend the rule-breaking publicly? Have you genuinely tried the rule-following path? These tests distinguish principled rule-breaking from convenient rationalization.",
      },
    },
    {
      heading: "Building practical ethical judgment: a method",
      type: "fix",
      body: [
        "Practical ethical judgment isn't a talent you're born with — it's a skill you build through deliberate practice. The starting point is identifying all the stakeholders: who is affected by this decision, directly and indirectly? What are their interests and claims?",
        "Then map the options and their likely consequences, both intended and unintended. Apply frameworks: what would each say? Look for convergence and divergence. Where frameworks agree, you have stronger grounds. Where they disagree, you need to examine your own deepest commitments.",
        "Finally: decide, act, and reflect. Ethical judgment is sharpened by feedback — by noticing when decisions went wrong, by asking why, and by updating your reasoning. The mark of mature ethical judgment isn't certainty; it's the capacity to decide well under genuine uncertainty.",
      ],
      example:
        "After the Enron collapse, many employees reflected on moments when they sensed something was wrong but rationalised staying quiet. The skill they lacked wasn't knowledge of ethics — it was the habit of taking their moral discomfort seriously, naming the conflict explicitly, and acting on it despite institutional pressure. That habit is built one deliberate decision at a time.",
    },
  ],
};

export const M3_WILD = {
  title: "Spot It in the Wild",
  examples: [
    {
      title: "Pharmaceutical pricing",
      description:
        "Companies face ongoing tension between fiduciary duties to shareholders (maximise profit) and duties to patients (ensure access to medicine). Applied ethics is the work of navigating that conflict with specific drugs, specific prices, and specific patients.",
    },
    {
      title: "Social media content moderation",
      description:
        "Platforms must apply general rules (hate speech policies) to infinitely varied specific cases. Every moderation decision is applied ethics: freedom of expression vs harm prevention, with real people bearing the consequences.",
    },
    {
      title: "Engineering whistleblowing",
      description:
        "Engineers who discover safety flaws face the conflict of professional duty, institutional loyalty, personal risk, and public safety — all at once. The Challenger and Boeing 737 MAX cases show what happens when that conflict is resolved the wrong way.",
    },
  ],
};

export const M3_QUIZ: QuizQuestion[] = [
  {
    id: "et-m3q1",
    question: "Why do professions create special ethical obligations?",
    options: [
      "Because professionals are paid more",
      "Because role relationships create trust and dependency that can be uniquely violated",
      "Because professional codes are legally binding",
      "Because abstract rules don't apply in professional settings",
    ],
    correctIndex: 1,
    explanation:
      "Professions create trust relationships where clients or patients are dependent on the professional's honest judgment. Because the professional holds unique power and information, violations of that trust carry special moral weight beyond ordinary wrongdoing.",
  },
  {
    id: "et-m3q2",
    question: "The Challenger disaster illustrates:",
    options: [
      "The limits of engineering knowledge",
      "How institutional pressure can override professional ethical judgment with fatal consequences",
      "Why rules should always be followed",
      "The failure of consequentialist reasoning",
    ],
    correctIndex: 1,
    explanation:
      "Engineers raised legitimate safety concerns that were overridden by launch pressure. The disaster wasn't a failure of technical knowledge — the engineers knew the risk. It was a failure of professional ethics: the duty to flag safety concerns was subordinated to institutional pressure.",
  },
  {
    id: "et-m3q3",
    question:
      "When rules conflict with good outcomes, the practically wise approach is:",
    options: [
      "Always follow outcomes — consequences are what matter",
      "Always follow rules — they encode accumulated wisdom",
      "Follow rules as the strong default; override only when you can clearly articulate why and have exhausted rule-following options",
      "Delegate the decision to someone more senior",
    ],
    correctIndex: 2,
    explanation:
      "Rules encode accumulated wisdom and create trust. But they're designed for typical cases. Principled rule-breaking requires clear reasoning, accountability, and the test of generalisation. Without these safeguards, 'outcomes justify rule-breaking' becomes a rationalisation for self-interest.",
  },
  {
    id: "et-m3q4",
    question: "In applied ethics, stakeholder identification means:",
    options: [
      "Listing everyone who might complain about your decision",
      "Identifying all those affected by the decision, directly and indirectly",
      "Consulting only those who have formal authority",
      "Considering only the most severely affected parties",
    ],
    correctIndex: 1,
    explanation:
      "Good ethical decisions require knowing who bears the consequences. Stakeholders include those directly affected, those indirectly affected, and sometimes future generations. Missing a stakeholder means making a decision with an incomplete picture of who it will harm or help.",
  },
  {
    id: "et-m3q5",
    question:
      "What distinguishes principled rule-breaking from rationalisation?",
    options: [
      "The rule-breaker is confident they're right",
      "The outcome is clearly better",
      "The rule-breaker can articulate the reason, accepts the consequences if generalised, and has exhausted the rule-following path",
      "The rule-breaker is willing to accept punishment",
    ],
    correctIndex: 2,
    explanation:
      "Rationalisation uses outcome-language to justify what you already wanted to do. Principled rule-breaking requires genuine deliberation: explicit reasoning, the willingness to defend the decision publicly, and honest engagement with whether rule-following was genuinely exhausted.",
  },
];

// ─── Module 4: Meta-Ethics ────────────────────────────────────────────────
export const M4_LESSON: Lesson = {
  title: "Meta-Ethics",
  sections: [
    {
      heading:
        "Before asking what's right, ask: what kind of question is that?",
      type: "concept",
      body: [
        "First-order ethics asks: what should I do? Is this action right? Meta-ethics steps back and asks: what are we even doing when we make moral claims? Are moral statements true or false? If true, what makes them true? Where do moral facts come from — if they exist at all?",
        "These questions sound academic, but they shape everything. If moral truths are objective facts independent of human belief (moral realism), then moral progress is possible and moral disagreement is a failure to track reality. If morality is a human construction (anti-realism), then moral claims are expressions of attitude, cultural convention, or social contract — not facts about the world.",
        "You may already have implicit meta-ethical commitments you've never examined. 'Slavery was always wrong, even when people accepted it' implies moral realism. 'Different cultures just have different values — who are we to judge?' implies moral relativism. Both positions have serious problems. Meta-ethics is the project of thinking them through.",
      ],
      example:
        "Consider the claim: 'Torturing children for entertainment is wrong.' Is this true in the same way '2+2=4' is true, or 'water is H₂O' is true? Or is it more like 'torture is disgusting' — an expression of strong feeling? Or is it a rule our society has adopted? Your answer to this reveals your meta-ethical position.",
      check: {
        question:
          "Meta-ethics differs from first-order ethics because it asks:",
        options: [
          "What should I do in this situation?",
          "What makes moral claims true or false — or whether they can be true or false at all?",
          "Which framework is best?",
          "How to resolve moral dilemmas",
        ],
        correctIndex: 1,
        hint: "First-order ethics operates within ethics: it applies frameworks to cases. Meta-ethics examines the foundations of ethics itself: the nature of moral facts, the basis of moral knowledge, and what moral language actually does when we use it.",
      },
    },
    {
      heading: "Moral realism: ethics as fact",
      type: "mechanism",
      body: [
        "Moral realism holds that there are objective moral facts — facts about what's right and wrong that are independent of what any individual or culture believes. Just as there are facts about chemistry or mathematics, there are facts about ethics. When people disagree morally, at least one of them is wrong.",
        "This position underpins the intuition that moral progress is real. We don't just say that people in the 18th century had different views about slavery — we say they were wrong. This implies there's a fact they were failing to track. Moral realism takes that implication seriously.",
        "The main challenge is explaining what moral facts are and how we access them. Scientific facts are verified through observation. Mathematical facts through proof. What's the equivalent for moral facts? Different realists answer differently: through reason (rationalist realism), through our reactions when ideally situated (ideal observer theories), or as natural facts about wellbeing (naturalist realism).",
      ],
      example:
        "When we say the Holocaust was wrong, we don't just mean 'we disapprove of it' or 'our culture condemns it.' We mean it was wrong — period. That conviction is hard to make sense of without something like moral realism. The intuitive pull of moral realism is strongest precisely in cases of extreme evil, where calling it 'just a different cultural practice' feels deeply wrong.",
      check: {
        question:
          "A moral realist would say that when cultures disagree about morality:",
        options: [
          "Both cultures are equally right",
          "Neither culture can be wrong since morality is relative",
          "At least one culture is failing to track a moral fact",
          "The disagreement shows morality doesn't exist",
        ],
        correctIndex: 2,
        hint: "Moral realism treats moral disagreement like factual disagreement: if two cultures hold contradictory views, at least one must be wrong. This is uncomfortable — it implies we can judge other cultures — but it's also the foundation of saying that historical wrongs were actually wrong, not just unpopular.",
      },
    },
    {
      heading: "Moral anti-realism: ethics as construction",
      type: "mechanism",
      body: [
        "Anti-realism denies that there are mind-independent moral facts. Different versions make different claims. Moral relativism holds that moral claims are true relative to a culture or individual — there's no view from nowhere. Expressivism holds that moral statements don't express beliefs at all; they express attitudes, like 'Boo to torture!' or 'Hooray for generosity!'",
        "Error theory takes the most radical position: moral statements purport to express objective facts, but no such facts exist — so all positive moral claims are false. We're systematically mistaken when we say 'cruelty is wrong' in the realist sense.",
        "Anti-realism captures something real: moral beliefs do vary across cultures and history. But it struggles with the intuition that some things really are wrong regardless of anyone's view. The relativist who says 'different cultures just have different values' about Nazi Germany is hard to take seriously. Anti-realism has to explain why the intuition of objectivity is so powerful.",
      ],
      example:
        "An extreme moral relativist must say: 'In 1850 American culture, slavery was morally acceptable; in 2024 American culture, it is not.' They cannot say it was wrong in 1850 — only that people then approved of it. Most people find this deeply unsatisfying. The discomfort is data: it suggests we're committed to something more than relativism can provide.",
      check: {
        question: "Expressivism holds that 'cruelty is wrong' means:",
        options: [
          "There is an objective fact that cruelty is wrong",
          "Our culture prohibits cruelty",
          "An expression of disapproval of cruelty, not a factual claim",
          "Cruelty violates a natural law",
        ],
        correctIndex: 2,
        hint: "Expressivism says moral statements are not fact-stating but attitude-expressing. 'Cruelty is wrong' functions like 'Boo cruelty!' — it expresses a negative attitude rather than describing a fact. This avoids the problem of mysterious moral facts, but it makes moral disagreement puzzling: how can two people 'disagree' if they're just expressing different attitudes?",
      },
    },
    {
      heading: "Where moral knowledge comes from — and why it matters",
      type: "mechanism",
      body: [
        "If moral realism is true, we need to explain how we access moral knowledge. Three main sources have been proposed: moral intuition (we have direct perceptual-like access to moral facts), moral reason (we derive moral truths through rational reflection), and moral experience (we learn what matters through living and suffering and empathy).",
        "Each source has strengths and vulnerabilities. Intuitions are powerful but vary across cultures and can encode bias. Reason is universal but can lead to counterintuitive conclusions. Experience is rich but limited and personal. The best account of moral knowledge probably draws on all three — and is appropriately humble about the limits of each.",
        "Why does this matter practically? Because your meta-ethical commitments shape how you respond to moral disagreement. If you think morality is just cultural convention, you'll be more tolerant of differences but less able to critique injustice. If you're a confident moral realist, you'll feel licensed to correct others but may underestimate how much of your 'realism' is actually your own cultural conditioning.",
      ],
      example:
        "The history of moral progress — the abolition of slavery, the extension of voting rights, the recognition of LGBTQ+ rights — can be told as: 'society's values changed,' or as 'people came to see more clearly what was always true.' The meta-ethical story you tell changes whether moral progress is possible and what it would mean. Both stories face hard questions. Neither is obviously right.",
      check: {
        question:
          "Why is excessive confidence in your moral intuitions potentially dangerous?",
        options: [
          "Because intuitions are never reliable",
          "Because intuitions can encode cultural bias while feeling like objective moral truths",
          "Because morality should always be based on reason alone",
          "Because other people's intuitions are equally valid",
        ],
        correctIndex: 1,
        hint: "Moral intuitions feel self-evident, but they can reflect the particular culture and history you grew up in. People in past centuries had strong intuitions supporting practices we now find monstrous. Taking your intuitions seriously while remaining open to their revision is the appropriate epistemic stance.",
      },
    },
  ],
};

export const M4_WILD = {
  title: "Spot It in the Wild",
  examples: [
    {
      title: "Human rights discourse",
      description:
        "The claim that humans have rights by virtue of their humanity presupposes something like moral realism — that these rights exist independently of whether any culture recognises them. Anti-realists must explain rights differently.",
    },
    {
      title: "Cultural sensitivity debates",
      description:
        "Debates about whether to criticise another culture's practices implicitly involve meta-ethics: relativists say 'who are we to judge?'; realists say 'some practices are wrong regardless of cultural endorsement.'",
    },
    {
      title: "Moral psychology research",
      description:
        "Research on how humans develop moral intuitions (Haidt, Kohlberg) informs meta-ethics: do we discover moral truths, construct them through social learning, or simply rationalise emotional reactions?",
    },
  ],
};

export const M4_QUIZ: QuizQuestion[] = [
  {
    id: "et-m4q1",
    question:
      "A moral realist believes that when two cultures disagree about a moral question:",
    options: [
      "Both are right within their own contexts",
      "At least one must be wrong — there is a fact of the matter",
      "Neither can be right since morality is subjective",
      "The disagreement proves morality doesn't exist",
    ],
    correctIndex: 1,
    explanation:
      "Moral realism holds that moral truths are independent of what individuals or cultures believe. Disagreement, just as in science, means at least one party is failing to track an objective fact. This is uncomfortable when applied cross-culturally, but it's also the basis for saying historical injustices were genuinely wrong.",
  },
  {
    id: "et-m4q2",
    question: "Error theory's most radical claim is that:",
    options: [
      "Morality is culturally relative",
      "Moral statements express emotions, not beliefs",
      "All positive moral claims are false because moral facts don't exist",
      "Moral knowledge comes from reason alone",
    ],
    correctIndex: 2,
    explanation:
      "Error theory, associated with philosopher J.L. Mackie, holds that moral statements presuppose the existence of objective moral facts, but no such facts exist. Therefore all positive moral claims ('cruelty is wrong') are false — not meaningless, but mistaken. It's the most revisionary anti-realist position.",
  },
  {
    id: "et-m4q3",
    question:
      "The claim 'slavery was wrong even in centuries when it was widely accepted' most clearly implies:",
    options: [
      "Moral relativism",
      "Expressivism",
      "Moral realism",
      "Error theory",
    ],
    correctIndex: 2,
    explanation:
      "Saying slavery was 'wrong even then' implies the wrongness didn't depend on people's beliefs at the time — which is moral realism. A relativist must say slavery was acceptable in those cultures (though not in ours). The strong intuition that it was always wrong is one of the most compelling arguments for moral realism.",
  },
  {
    id: "et-m4q4",
    question: "Moral progress is most easily explained by:",
    options: [
      "Moral relativism — societies simply change their values",
      "Expressivism — attitudes evolve over time",
      "Moral realism — people come to see more clearly what was always true",
      "Error theory — since all moral claims are false, there's no progress",
    ],
    correctIndex: 2,
    explanation:
      "Moral realism uniquely allows for genuine moral progress: the idea that we're getting better at tracking real moral facts. Anti-realist accounts can describe change, but 'progress' implies direction toward truth — which requires something true to progress toward. Realism provides that; anti-realism struggles to.",
  },
  {
    id: "et-m4q5",
    question:
      "Overconfidence in your own moral intuitions is dangerous because:",
    options: [
      "Intuitions are never reliable evidence",
      "Intuitions may encode cultural bias while feeling like objective moral truths",
      "Only experts should have moral views",
      "Moral knowledge comes only from reason",
    ],
    correctIndex: 1,
    explanation:
      "Moral intuitions feel self-evident and universal, but they develop within specific cultural contexts and can perpetuate bias. People throughout history had strong intuitions supporting practices we now find wrong. Treating intuitions as evidence while remaining open to revising them is the appropriate epistemic position.",
  },
];
