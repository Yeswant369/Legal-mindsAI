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

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="container mx-auto px-6 pt-28 pb-20">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0F172A]">
            Institutional Document Analysis
          </h1>
          <p className="mt-3 text-slate-600 text-lg">
            Structured compliance evaluation with audit-ready output.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-8">

          {/* Upload Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Upload PDF Documents
            </h3>

            <PdfUpload files={files} onFilesChange={setFiles} />
          </div>

          {/* Demo Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Demo Documents
            </h3>

            <div className="space-y-4">

              <button
                onClick={() =>
                  fetch("/demo/hr-demo.pdf")
                    .then(r => r.blob())
                    .then(blob =>
                      setFiles(prev => [
                        ...prev,
                        new File([blob], "hr-demo.pdf", { type: "application/pdf" })
                      ])
                    )
                }
                className="w-full h-12 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium transition-all duration-200 hover:border-[#0F2A5F] hover:shadow-[0_6px_18px_rgba(15,42,95,0.15)]"
              >
                Use HR Demo PDF
              </button>

              <button
                onClick={() =>
                  fetch("/demo/client-demo.pdf")
                    .then(r => r.blob())
                    .then(blob =>
                      setFiles(prev => [
                        ...prev,
                        new File([blob], "client-demo.pdf", { type: "application/pdf" })
                      ])
                    )
                }
                className="w-full h-12 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium transition-all duration-200 hover:border-[#0F2A5F] hover:shadow-[0_6px_18px_rgba(15,42,95,0.15)]"
              >
                Use Client Policy Demo PDF
              </button>

            </div>
          </div>

          {/* Jurisdiction */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Select Jurisdiction
            </label>
            <Select value={jurisdiction} onValueChange={setJurisdiction}>
              <SelectTrigger className="h-12 border-slate-300 focus:ring-[#0F2A5F]">
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
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
              <Mail className="h-4 w-4 text-[#0F2A5F]" />
              Receive Analysis Report via Email
            </label>
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-slate-300 focus:ring-[#0F2A5F]"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">

            <button
              onClick={resetForm}
              className="flex items-center gap-2 h-11 px-5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium transition-all duration-200 hover:border-slate-400 hover:shadow-md"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex items-center gap-2 h-12 px-8 rounded-lg bg-[#0F2A5F] text-white font-semibold transition-all duration-200 hover:bg-[#12367A] hover:shadow-[0_8px_22px_rgba(15,42,95,0.25)] disabled:bg-slate-400 disabled:shadow-none"
            >
              Analyze Documents
              <ArrowRight className="h-4 w-4" />
            </button>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
