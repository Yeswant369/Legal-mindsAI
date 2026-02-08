import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Shield, BarChart3, ArrowRight, ArrowLeft, RotateCcw, Mail, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepIndicator from "@/components/StepIndicator";
import PdfUpload from "@/components/PdfUpload";
import ProcessingScreen from "@/components/ProcessingScreen";
import SuccessScreen from "@/components/SuccessScreen";
import { COUNTRIES } from "@/lib/countries";
import { submitToWebhook } from "@/lib/webhook";

type AnalysisType = "legal" | "hr" | "comparison";
type ViewState = "form" | "processing" | "success" | "error";

const analysisOptions = [
  { value: "legal" as const, icon: FileText, title: "Legal Document Compliance", desc: "Analyze a legal document against jurisdiction regulations." },
  { value: "hr" as const, icon: Shield, title: "HR Policy Compliance", desc: "Check HR policy documents for compliance gaps." },
  { value: "comparison" as const, icon: BarChart3, title: "Client vs HR Policy Comparison", desc: "Compare client policy against your internal HR norms." },
];

const stepLabels = ["Analysis Type", "Upload", "Jurisdiction", "Email & Submit"];

const Dashboard = () => {
  const [step, setStep] = useState(0);
  const [analysisType, setAnalysisType] = useState<AnalysisType | null>(null);
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [clientFile, setClientFile] = useState<File | null>(null);
  const [hrFile, setHrFile] = useState<File | null>(null);
  const [jurisdiction, setJurisdiction] = useState("");
  const [email, setEmail] = useState("");
  const [viewState, setViewState] = useState<ViewState>("form");
  const [processingStep, setProcessingStep] = useState(0);
  const [webhookStatus, setWebhookStatus] = useState<"sending" | "processing" | "completed" | "failed">("sending");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const canProceed = useCallback(() => {
    switch (step) {
      case 0: return !!analysisType;
      case 1: return analysisType === "comparison" ? !!clientFile && !!hrFile : !!mainFile;
      case 2: return !!jurisdiction;
      case 3: return emailValid;
      default: return false;
    }
  }, [step, analysisType, mainFile, clientFile, hrFile, jurisdiction, emailValid]);

  const resetForm = () => {
    setStep(0);
    setAnalysisType(null);
    setMainFile(null);
    setClientFile(null);
    setHrFile(null);
    setJurisdiction("");
    setEmail("");
    setViewState("form");
    setProcessingStep(0);
    setWebhookStatus("sending");
  };

  const handleSubmit = async () => {
    if (!analysisType || !jurisdiction || !emailValid) return;
    setViewState("processing");
    setWebhookStatus("sending");
    setProcessingStep(0);

    const totalSteps = analysisType === "comparison" ? 8 : 7;

    // Animate steps
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
      await submitToWebhook(
        analysisType,
        { main: mainFile ?? undefined, client: clientFile ?? undefined, hr: hrFile ?? undefined },
        email.trim(),
        jurisdiction
      );
      clearInterval(stepInterval);
      setProcessingStep(totalSteps);
      setWebhookStatus("completed");
      setTimeout(() => setViewState("success"), 1000);
      toast.success("Document submitted successfully!");
    } catch (err) {
      clearInterval(stepInterval);
      setWebhookStatus("failed");
      toast.error("Submission failed. Please try again.");
      setTimeout(() => setViewState("error"), 1500);
    }
  };

  const getFileNames = () => {
    if (analysisType === "comparison") {
      return [clientFile?.name, hrFile?.name].filter(Boolean) as string[];
    }
    return mainFile ? [mainFile.name] : [];
  };

  if (viewState === "processing") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-28 pb-20">
          <ProcessingScreen status={webhookStatus} currentStep={processingStep} analysisType={analysisType || "legal"} />
          {webhookStatus === "failed" && (
            <div className="mt-6 text-center">
              <Button onClick={handleSubmit} className="bg-gradient-hero text-primary-foreground">
                Retry Submission
              </Button>
              <Button onClick={resetForm} variant="outline" className="ml-3">
                Reset Form
              </Button>
            </div>
          )}
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
            fileNames={getFileNames()}
            jurisdiction={jurisdiction}
            email={email}
            analysisType={analysisType || "legal"}
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
            <h3 className="mb-3 font-sans text-xl font-bold text-foreground">Submission Failed</h3>
            <p className="mb-6 text-sm text-muted-foreground">Something went wrong. Please check your network and try again.</p>
            <Button onClick={handleSubmit} className="bg-gradient-hero text-primary-foreground">Retry</Button>
            <Button onClick={resetForm} variant="outline" className="ml-3">Reset</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">Document Analyzer</h1>
          <p className="text-muted-foreground">Upload your document and get an AI-powered compliance analysis.</p>
        </motion.div>

        <StepIndicator currentStep={step} totalSteps={4} labels={stepLabels} />

        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {/* Step 0: Analysis Type */}
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <div className="grid gap-4 sm:grid-cols-3">
                  {analysisOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setAnalysisType(opt.value)}
                      className={`group rounded-xl border-2 p-5 text-left transition-all ${
                        analysisType === opt.value
                          ? "border-primary bg-primary/5 shadow-glow"
                          : "border-border bg-card hover:border-primary/30 hover:shadow-card"
                      }`}
                    >
                      <opt.icon className={`mb-3 h-6 w-6 ${analysisType === opt.value ? "text-primary" : "text-muted-foreground"}`} />
                      <h3 className="mb-1 font-sans text-sm font-semibold text-foreground">{opt.title}</h3>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                {analysisType === "comparison" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 flex items-start gap-2 rounded-lg border border-info/20 bg-info/5 p-3">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-info" />
                    <p className="text-xs text-muted-foreground">
                      This compares client rules against your HR norms to detect conflicts, gaps, and risks.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 1: Upload */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
                {analysisType === "comparison" ? (
                  <>
                    <PdfUpload label="Client Policy PDF" file={clientFile} onFileChange={setClientFile} />
                    <PdfUpload label="Internal HR Policy PDF" file={hrFile} onFileChange={setHrFile} />
                  </>
                ) : (
                  <PdfUpload
                    label={analysisType === "hr" ? "HR Policy PDF" : "Legal Document PDF"}
                    file={mainFile}
                    onFileChange={setMainFile}
                  />
                )}
              </motion.div>
            )}

            {/* Step 2: Jurisdiction */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <label className="mb-2 block text-sm font-semibold text-foreground">Select Jurisdiction</label>
                <Select value={jurisdiction} onValueChange={setJurisdiction}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose a country..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {/* Step 3: Email */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
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
                {email.length > 0 && !emailValid && (
                  <p className="mt-2 text-xs text-destructive">Please enter a valid email address.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => step === 0 ? resetForm() : setStep(step - 1)}
              className="gap-2"
            >
              {step === 0 ? <><RotateCcw className="h-4 w-4" /> Reset</> : <><ArrowLeft className="h-4 w-4" /> Back</>}
            </Button>

            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="gap-2 bg-gradient-hero text-primary-foreground hover:opacity-90 disabled:opacity-40"
              >
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="gap-2 bg-gradient-hero text-primary-foreground hover:opacity-90 disabled:opacity-40"
              >
                Analyze Document <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
