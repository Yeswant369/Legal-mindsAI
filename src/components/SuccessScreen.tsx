import { motion } from "framer-motion";
import { CheckCircle2, FileText, Globe, Mail, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessScreenProps {
  fileNames: string[];
  jurisdiction: string;
  email: string;
  analysisType: string;
  onReset: () => void;
}

const SuccessScreen = ({ fileNames, jurisdiction, email, analysisType, onReset }: SuccessScreenProps) => {
  const typeLabel = analysisType === "legal" ? "Legal Document Compliance" : analysisType === "hr" ? "HR Policy Compliance" : "Client vs HR Policy Comparison";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8 text-center shadow-card"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-success/10"
      >
        <CheckCircle2 className="h-10 w-10 text-success" />
      </motion.div>

      <h2 className="mb-2 font-sans text-2xl font-bold text-foreground">Document Submitted Successfully</h2>
      <p className="mb-8 text-muted-foreground">
        Your analysis report will be sent to your email shortly.
      </p>

      <div className="mb-8 space-y-3 rounded-xl bg-muted/50 p-5 text-left">
        <div className="flex items-center gap-3">
          <FileText className="h-4 w-4 text-primary" />
          <div>
            <span className="text-xs text-muted-foreground">File(s)</span>
            <p className="text-sm font-medium text-foreground">{fileNames.join(", ")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="h-4 w-4 text-primary" />
          <div>
            <span className="text-xs text-muted-foreground">Jurisdiction</span>
            <p className="text-sm font-medium text-foreground">{jurisdiction}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-primary" />
          <div>
            <span className="text-xs text-muted-foreground">Email</span>
            <p className="text-sm font-medium text-foreground">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <div>
            <span className="text-xs text-muted-foreground">Analysis Type</span>
            <p className="text-sm font-medium text-foreground">{typeLabel}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={onReset} className="flex-1 bg-gradient-hero text-primary-foreground hover:opacity-90">
          Upload Another <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button onClick={onReset} variant="outline" className="flex-1">
          <RotateCcw className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
    </motion.div>
  );
};

export default SuccessScreen;
