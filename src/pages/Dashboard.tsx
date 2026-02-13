import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PdfUpload from "@/components/PdfUpload";
import ProcessingScreen from "@/components/ProcessingScreen";
import SuccessScreen from "@/components/SuccessScreen";
import { COUNTRIES } from "@/lib/countries";
import { submitToWebhook } from "@/lib/webhook";

type ViewState = "form" | "processing" | "success" | "error";

const Dashboard = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [jurisdiction, setJurisdiction] = useState("India");
  const [email, setEmail] = useState("");
  const [viewState, setViewState] = useState<ViewState>("form");
  const [processingStep, setProcessingStep] = useState(0);
  const [webhookStatus, setWebhookStatus] = useState<
    "sending" | "processing" | "completed" | "failed"
  >("sending");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit = files.length > 0 && !!jurisdiction && emailValid;

  const resetForm = () => {
    setFiles([]);
    setJurisdiction("India");
    setEmail("");
    setViewState("form");
    setProcessingStep(0);
    setWebhookStatus("sending");
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setViewState("processing");
    setWebhookStatus("sending");
    setProcessingStep(0);

    const totalSteps = 5 + files.length;

    const stepInterval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev >= totalSteps - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    try {
      setWebhookStatus("processing");
      await submitToWebhook(files, email.trim(), jurisdiction);

      clearInterval(stepInterval);
      setProcessingStep(totalSteps);
      setWebhookStatus("completed");

      setTimeout(() => setViewState("success"), 1000);
      toast.success("Documents submitted successfully!");
    } catch {
      clearInterval(stepInterval);
      setWebhookStatus("failed");
      toast.error("Submission failed. Please try again.");
      setTimeout(() => setViewState("error"), 1500);
    }
  };

  // ✅ FIXED DEMO FUNCTION (APPENDS + PREVENTS DUPLICATES)
  const loadDemo = async (path: string, name: string) => {
    const response = await fetch(path);
    const blob = await response.blob();
    const file = new File([blob], name, { type: "application/pdf" });

    setFiles((prev) => {
      const exists = prev.find(
        (f) => f.name === file.name && f.size === file.size
      );
      if (exists) return prev;
      return [...prev, file];
    });
  };

  if (viewState === "processing") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-28 pb-20">
          <ProcessingScreen
            status={webhookStatus}
            currentStep={processingStep}
            analysisType="legal"
          />
        </div>
      </div>
    );
  }

  if (viewState === "success") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-28 pb-20">
          <SuccessScreen
            fileNames={files.map((f) => f.name)}
            jurisdiction={jurisdiction}
            email={email}
            analysisType="legal"
            onReset={resetForm}
          />
        </div>
        <Footer />
      </div>
    );
  }

  if (viewState === "error") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-28 pb-20 text-center">
          <div className="mx-auto max-w-md rounded-2xl border border-destructive/20 bg-card p-8 shadow-card">
            <h3 className="mb-3 font-sans text-xl font-bold text-foreground">
              Submission Failed
            </h3>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-hero text-primary-foreground"
            >
              Retry
            </Button>
            <Button
              onClick={resetForm}
              variant="outline"
              className="ml-3"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
            Document Analyzer
          </h1>
          <p className="text-muted-foreground">
            Upload your documents and get an AI-powered compliance analysis.
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl space-y-6">
          {/* PDF Upload */}
          <PdfUpload files={files} onFilesChange={setFiles} />

          {/* Demo Section */}
          <div className="rounded-xl border bg-card p-4">
            <h3 className="mb-3 font-semibold text-foreground">
              Try a Demo Document
            </h3>

            <div className="flex flex-col gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  loadDemo("/demo/hr-demo.pdf", "hr-demo.pdf")
                }
              >
                Use HR Demo PDF
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  loadDemo("/demo/client-demo.pdf", "client-demo.pdf")
                }
              >
                Use Client Policy Demo PDF
              </Button>
            </div>
          </div>

          {/* Jurisdiction */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Select Jurisdiction
            </label>
            <Select value={jurisdiction} onValueChange={setJurisdiction}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Mail className="h-4 w-4 text-primary" />
              Receive Analysis Report via Email
            </label>
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              onClick={resetForm}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="gap-2 bg-gradient-hero text-primary-foreground hover:opacity-90 disabled:opacity-40"
            >
              Analyze Documents <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
