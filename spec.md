# Untaught — Ethics Domain

## Current State

The app has two live domains:
- **Game Theory**: 4 modules, 2 simulations each, full flow (Lesson → Sim 1 → Sim 2 → Quiz → Wild → Domain Challenge)
- **Behavioural Economics**: 5 modules, 1 simulation each

Shared infrastructure exists: AppHeader, AppFooter, BackButton, ProgressBadge, hooks (useQueries, useInternetIdentity), and TanStack Router with existing routes.

Ethics is defined in `domains.ts` with `available: false`. Its accent color is red: `oklch(0.72 0.2 29)`, CSS class `accent-red`, CSS variable `var(--domain-red)`.

All page components follow game-theory patterns: DomainIntroPage, ModuleListPage, LessonPage, SimulationPage, Simulation2Page, QuizPage, WildPage, DomainChallengePage, plus simulation components in `sims/` subfolder.

## Requested Changes (Diff)

### Add
- `src/frontend/src/data/ethics.ts` — full content: 4 modules, lessons (4+ sections, multi-paragraph, comprehension checks, real-world examples), quizzes (5+ questions with explanations), wild examples
- `src/frontend/src/pages/ethics/` — all page components matching game-theory structure
- `src/frontend/src/pages/ethics/sims/` — 8 simulation components (2 per module): intro sim + real-world application sim
- Ethics routes in `App.tsx` (4 modules, all flows)

### Modify
- `src/frontend/src/data/domains.ts` — set Ethics `available: true`
- `src/frontend/src/App.tsx` — add all Ethics routes

### Remove
- Nothing

## Implementation Plan

1. Create `src/frontend/src/data/ethics.ts` with:
   - ETHICS_MODULES (4 modules: Moral Frameworks, Moral Dilemmas, Applied Ethics, Meta-Ethics)
   - M1–M4 lesson data (4+ sections each, 2+ paragraphs per section, comprehension checks, real-world examples)
   - M1–M4 quiz data (5+ questions each, all with explanations)
   - M1–M4 wild/spot-it examples
   - Module types matching the existing `Module`, `Lesson`, `QuizQuestion` interfaces

2. Create simulation components in `src/frontend/src/pages/ethics/sims/`:
   - Sim1MoralFrameworks.tsx — choose a moral framework to resolve an ethical dilemma, see how each leads to different outcomes
   - Sim1BMoralFrameworksRealWorld.tsx — real-world applied scenario using framework analysis
   - Sim2MoralDilemmas.tsx — trolley-problem style branching decisions with consequences
   - Sim2BMoralDilemmasComplex.tsx — multi-party real-world moral dilemma
   - Sim3AppliedEthics.tsx — workplace/social ethics scenario with branching
   - Sim3BAppliedEthicsReal.tsx — real-world applied ethics case (medical, business, or environmental)
   - Sim4MetaEthics.tsx — identify which metaethical position best explains a moral intuition
   - Sim4BMetaEthicsReal.tsx — real-world cultural relativism/moral realism scenario

3. Create page components in `src/frontend/src/pages/ethics/`:
   - DomainIntroPage.tsx (red accent, domain hook, 3 real-world ethics examples, module preview, CTA)
   - ModuleListPage.tsx (4 modules listed, progress bar for logged-in users)
   - LessonPage.tsx (identical logic to game-theory LessonPage but with red accent and ETHICS_MODULES/lessons)
   - SimulationPage.tsx (routes to Sim 1 of 2, on complete → Simulation 2)
   - Simulation2Page.tsx (routes to Sim 2 of 2, on complete → Quiz)
   - QuizPage.tsx (identical logic to game-theory QuizPage but with red accent)
   - WildPage.tsx (Spot It in the Wild section)
   - DomainChallengePage.tsx (reflection prompt tying all 4 modules together)

4. Update `App.tsx`: add all Ethics routes (domain intro, module list, lesson, simulation, simulation2, quiz, wild, challenge for moduleId 1–4)

5. Update `domains.ts`: set Ethics `available: true`

6. Apply quality checklist before considering done:
   - Each lesson: 4+ sections, 2+ paragraphs each, comprehension check per section, real-world example integrated
   - Each simulation: clear scenario setup (who you are, what's at stake), 5+ rounds of interaction, branching outcomes, scoring
   - Each quiz: 5+ questions, wrong-answer explanations
   - Accessibility: focus states, 44px touch targets, no color-only feedback, screen reader labels
   - Red accent (`oklch(0.72 0.2 29)`) used consistently throughout
