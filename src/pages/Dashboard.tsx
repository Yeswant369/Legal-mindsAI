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
      toast.success("Documents submitted successfully.");
    } catch {
      clearInterval(stepInterval);
      setWebhookStatus("failed");
      toast.error("Submission failed. Please try again.");
      setTimeout(() => setViewState("error"), 1500);
    }
  };

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
      <div className="min-h-screen bg-white">
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
      <div className="min-h-screen bg-white">
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
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-6 pt-28 pb-20 text-center">
          <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold text-slate-900">
              Submission Failed
            </h3>

            <div className="flex justify-center gap-4">
              <Button
                onClick={handleSubmit}
                className="h-11 bg-[#0F2A5F] text-white hover:bg-[#163A7A] transition-all"
              >
                Retry
              </Button>

              <Button
                onClick={resetForm}
                variant="outline"
                className="h-11 border-slate-300"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-6 pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-3 text-4xl font-bold text-slate-900">
            Document Analysis Portal
          </h1>
          <p className="text-slate-600">
            Institutional-grade compliance evaluation for legal and HR documents.
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl space-y-8">

          <PdfUpload files={files} onFilesChange={setFiles} />

          {/* Demo Section */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Demo Documents
            </h3>

            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="h-11 border-slate-300 hover:bg-slate-50 transition-all"
                onClick={() => loadDemo("/demo/hr-demo.pdf", "hr-demo.pdf")}
              >
                Use HR Demo PDF
              </Button>

              <Button
                variant="outline"
                className="h-11 border-slate-300 hover:bg-slate-50 transition-all"
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
            <label className="mb-2 block text-sm font-semibold text-slate-900">
              Select Jurisdiction
            </label>

            <Select value={jurisdiction} onValueChange={setJurisdiction}>
              <SelectTrigger className="h-12 border-slate-300 focus:ring-0">
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
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Mail className="h-4 w-4 text-[#0F2A5F]" />
              Receive Analysis Report via Email
            </label>

            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-slate-300 focus:ring-0"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={resetForm}
              className="h-11 border-slate-300 hover:bg-slate-50 transition-all gap-2"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="
                h-11 px-6 gap-2
                bg-[#0F2A5F]
                text-white
                hover:bg-[#163A7A]
                transition-all duration-200
                shadow-md hover:shadow-lg
                disabled:opacity-40
              "
            >
              Analyze Documents
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
