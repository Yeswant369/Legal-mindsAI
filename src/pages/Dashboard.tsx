import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Mail, ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PdfUpload from "@/components/PdfUpload";
import ProcessingScreen from "@/components/ProcessingScreen";
import SuccessScreen from "@/components/SuccessScreen";
import { COUNTRIES } from "@/lib/countries";
import { submitToWebhook } from "@/lib/webhook";
import { auth } from "@/firebase";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type ViewState = "form" | "processing" | "success" | "error";

const Dashboard = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [jurisdiction, setJurisdiction] = useState("");
  const [open, setOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>("form");
  const [processingStep, setProcessingStep] = useState(0);
  const [webhookStatus, setWebhookStatus] = useState<
    "sending" | "processing" | "completed" | "failed"
  >("sending");

  const canSubmit =
    files.length > 0 && !!jurisdiction && !!auth.currentUser;

  const resetForm = () => {
    setFiles([]);
    setJurisdiction("");
    setViewState("form");
    setProcessingStep(0);
    setWebhookStatus("sending");
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (!user || !user.email) {
      toast.error("You must be logged in to submit.");
      return;
    }

    if (!files.length || !jurisdiction) return;

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

      await submitToWebhook(files, user.email, jurisdiction);

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
          {webhookStatus === "failed" && (
            <div className="mt-6 text-center">
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
            fileNames={files.map((f) => f.name)}
            jurisdiction={jurisdiction}
            email={auth.currentUser?.email || ""}
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
            <p className="mb-6 text-sm text-muted-foreground">
              Something went wrong. Please try again.
            </p>
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
          <PdfUpload files={files} onFilesChange={setFiles} />

          {/* Searchable Jurisdiction */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Select Jurisdiction
            </label>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between h-12"
                >
                  {jurisdiction || "Choose a country..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup className="max-h-60 overflow-y-auto">
                      {COUNTRIES.map((country) => (
                        <CommandItem
                          key={country}
                          value={country}
                          onSelect={(value) => {
                            setJurisdiction(value);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              jurisdiction === country
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {country}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Auto Email */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Mail className="h-4 w-4 text-primary" />
              Report will be sent to
            </label>
            <div className="h-12 flex items-center px-4 rounded-md border bg-muted text-muted-foreground">
              {auth.currentUser?.email || "Not logged in"}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" onClick={resetForm} className="gap-2">
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
