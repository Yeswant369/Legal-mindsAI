import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Circle, AlertCircle, Wifi } from "lucide-react";

const processingSteps = [
  "Uploading Document(s)",
  "Connecting to LEGALMIND Engine",
  "Identifying Jurisdiction Rules",
  "Checking HR Norms",
  "Detecting Risk Clauses",
  "Generating Compliance Suggestions",
  "Preparing Email Report",
];

interface ProcessingScreenProps {
  status: "sending" | "processing" | "completed" | "failed";
  currentStep: number;
  analysisType: string;
}

const ProcessingScreen = ({ status, currentStep, analysisType }: ProcessingScreenProps) => {
  const steps = analysisType === "comparison"
    ? [...processingSteps.slice(0, 4), "Comparing Client vs HR Policies", ...processingSteps.slice(4)]
    : processingSteps;

  const statusColors: Record<string, string> = {
    sending: "bg-warning text-warning-foreground",
    processing: "bg-info text-info-foreground",
    completed: "bg-success text-success-foreground",
    failed: "bg-destructive text-destructive-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 shadow-card"
    >
      <div className="mb-6 text-center">
        <motion.div
          animate={{ rotate: status === "processing" || status === "sending" ? 360 : 0 }}
          transition={{ repeat: status === "completed" || status === "failed" ? 0 : Infinity, duration: 2, ease: "linear" }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
        >
          {status === "completed" ? (
            <CheckCircle2 className="h-8 w-8 text-success" />
          ) : status === "failed" ? (
            <AlertCircle className="h-8 w-8 text-destructive" />
          ) : (
            <Loader2 className="h-8 w-8 text-primary" />
          )}
        </motion.div>
        <h3 className="font-sans text-xl font-bold text-foreground">
          {status === "completed" ? "Analysis Complete" : status === "failed" ? "Submission Failed" : "Analyzing Your Document"}
        </h3>
        <div className="mt-3 flex items-center justify-center gap-2">
          <Wifi className="h-3.5 w-3.5" />
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-gradient-hero"
          animate={{ width: `${Math.min(((currentStep + 1) / steps.length) * 100, 100)}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            {i < currentStep ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
            ) : i === currentStep && status !== "completed" && status !== "failed" ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
            ) : (
              <Circle className="h-4 w-4 shrink-0 text-muted-foreground/40" />
            )}
            <span className={`text-sm ${
              i < currentStep ? "font-medium text-foreground" : i === currentStep ? "font-medium text-primary" : "text-muted-foreground/60"
            }`}>
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProcessingScreen;
