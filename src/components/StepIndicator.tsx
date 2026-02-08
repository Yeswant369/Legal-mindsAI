import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

const StepIndicator = ({ currentStep, totalSteps, labels }: StepIndicatorProps) => (
  <div className="mb-10 flex items-center justify-center gap-2">
    {Array.from({ length: totalSteps }).map((_, i) => (
      <div key={i} className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-1.5">
          <motion.div
            animate={{
              scale: currentStep === i ? 1.1 : 1,
            }}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
              i < currentStep
                ? "bg-success text-success-foreground"
                : i === currentStep
                ? "bg-gradient-hero text-primary-foreground shadow-glow"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {i < currentStep ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
          </motion.div>
          <span className={`hidden text-xs font-medium sm:block ${
            i <= currentStep ? "text-foreground" : "text-muted-foreground"
          }`}>
            {labels[i]}
          </span>
        </div>
        {i < totalSteps - 1 && (
          <div className={`mb-5 h-0.5 w-8 rounded sm:w-12 ${
            i < currentStep ? "bg-success" : "bg-border"
          }`} />
        )}
      </div>
    ))}
  </div>
);

export default StepIndicator;
