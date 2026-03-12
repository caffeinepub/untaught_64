import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import {
  ETHICS_MODULES,
  M1_WILD,
  M2_WILD,
  M3_WILD,
  M4_WILD,
} from "@/data/ethics";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, Eye } from "lucide-react";

const RED = "0.72 0.2 29";
const WILDS = [M1_WILD, M2_WILD, M3_WILD, M4_WILD];

interface WildPageProps {
  moduleId: number;
}

export function WildPage({ moduleId }: WildPageProps) {
  const navigate = useNavigate();
  const idx = moduleId - 1;
  const module = ETHICS_MODULES[idx];
  const wild = WILDS[idx];

  const handleNext = () => {
    if (moduleId < 4) {
      void navigate({ to: `/domain/ethics/module/${moduleId + 1}/lesson` });
    } else {
      void navigate({ to: "/domain/ethics/challenge" });
    }
  };

  if (!module || !wild) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-10">
        <BackButton
          to={`/domain/ethics/module/${moduleId}/quiz`}
          label="Back to quiz"
        />
      </div>

      <div className="mb-8">
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: `oklch(${RED})` }}
        >
          Ethics · Module {moduleId}
        </span>
        <div className="flex items-start gap-3 mt-3">
          <Eye
            className="h-5 w-5 mt-1 shrink-0"
            style={{ color: `oklch(${RED})` }}
          />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Spot It in the Wild
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              {module.title}
            </h1>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mb-8 leading-relaxed">
        These are real-world situations where the concepts from this module
        appear. The frameworks you've studied aren't academic — they're
        operating in every one of these cases.
      </p>

      <div className="space-y-4 mb-10">
        {wild.examples.map((example, i) => (
          <div
            key={example.title}
            data-ocid={`wild.item.${i + 1}`}
            className="rounded-lg border border-border/50 bg-card p-4 sm:p-5"
          >
            <h3 className="font-semibold text-foreground mb-2">
              {example.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {example.description}
            </p>
          </div>
        ))}
      </div>

      <Button
        size="lg"
        onClick={handleNext}
        data-ocid="wild.continue.button"
        className="gap-2 w-full sm:w-auto"
        style={{
          backgroundColor: `oklch(${RED})`,
          color: "oklch(0.98 0.005 29)",
        }}
      >
        <ChevronRight className="h-4 w-4" />
        {moduleId < 4
          ? `Continue to Module ${moduleId + 1}`
          : "Domain Challenge"}
      </Button>
    </main>
  );
}
