import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { ETHICS_MODULES } from "@/data/ethics";
import { useMarkSimulationDone } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, Loader2 } from "lucide-react";
import { Sim1MoralFrameworks } from "./sims/Sim1MoralFrameworks";
import { Sim2MoralDilemmas } from "./sims/Sim2MoralDilemmas";
import { Sim3AppliedEthics } from "./sims/Sim3AppliedEthics";
import { Sim4MetaEthics } from "./sims/Sim4MetaEthics";

const RED = "0.72 0.2 29";

const SIMS = [
  Sim1MoralFrameworks,
  Sim2MoralDilemmas,
  Sim3AppliedEthics,
  Sim4MetaEthics,
];

interface SimulationPageProps {
  moduleId: number;
}

export function SimulationPage({ moduleId }: SimulationPageProps) {
  const navigate = useNavigate();
  const idx = moduleId - 1;
  const module = ETHICS_MODULES[idx];
  const SimComponent = SIMS[idx];
  const { mutate: markDone, isPending } = useMarkSimulationDone();

  const handleComplete = () => {
    markDone(module.simulationId, {
      onSuccess: () =>
        void navigate({ to: `/domain/ethics/module/${moduleId}/simulation/2` }),
      onError: () =>
        void navigate({ to: `/domain/ethics/module/${moduleId}/simulation/2` }),
    });
  };

  if (!module || !SimComponent) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-10">
        <BackButton
          to={`/domain/ethics/module/${moduleId}/lesson`}
          label="Back to lesson"
        />
      </div>

      <div className="mb-6">
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: `oklch(${RED})` }}
        >
          Ethics · Module {moduleId}
        </span>
        <div className="flex items-center gap-2 mb-3 mt-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Simulation 1 of 2
          </p>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          {module.title}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {["Lesson", "Sim 1", "Sim 2", "Quiz"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span
              className="text-xs font-medium px-2 py-1 rounded"
              style={
                i === 1
                  ? {
                      backgroundColor: `oklch(${RED} / 0.15)`,
                      color: `oklch(${RED})`,
                    }
                  : {
                      backgroundColor: "oklch(0.18 0.008 275)",
                      color: "oklch(0.68 0.01 275)",
                    }
              }
            >
              {step}
            </span>
            {i < 3 && (
              <span className="text-muted-foreground text-xs opacity-40">
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <div
        className="mb-6 rounded-lg px-4 py-3 text-sm"
        style={{
          backgroundColor: `oklch(${RED} / 0.08)`,
          borderLeft: `3px solid oklch(${RED} / 0.5)`,
          color: "oklch(0.8 0.01 29)",
        }}
      >
        Explore freely — there are no wrong choices, only different reasoning.
      </div>

      <div className="mb-10">
        <SimComponent />
      </div>

      <Button
        size="lg"
        onClick={handleComplete}
        disabled={isPending}
        data-ocid="simulation.complete.button"
        className="gap-2 w-full sm:w-auto"
        style={{
          backgroundColor: `oklch(${RED})`,
          color: "oklch(0.98 0.005 29)",
        }}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        Continue to Simulation 2
      </Button>
    </main>
  );
}
