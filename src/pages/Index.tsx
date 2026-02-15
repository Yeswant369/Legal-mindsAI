import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Globe,
  AlertTriangle,
  Lightbulb,
  Mail,
  BarChart3,
  Upload,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: Globe, title: "Jurisdiction-Aware Analysis", desc: "Compliance checks against laws of any country worldwide." },
  { icon: Shield, title: "HR Policy Compliance", desc: "Detect gaps and violations in your HR policy documents." },
  { icon: BarChart3, title: "Client vs HR Comparison", desc: "Compare client policies against your internal HR norms." },
  { icon: Search, title: "Regulation Mapping", desc: "Map document clauses to applicable regulations automatically." },
  { icon: AlertTriangle, title: "Risk Clause Detection", desc: "Identify risky clauses that could expose your organization." },
  { icon: Lightbulb, title: "Actionable Suggestions", desc: "Get clear, prioritized recommendations for compliance." },
];

const steps = [
  { num: "01", icon: Upload, title: "Upload Document(s)", desc: "Upload your PDF legal or HR policy documents securely." },
  { num: "02", icon: Globe, title: "Select Jurisdiction", desc: "Choose the country whose laws apply to your analysis." },
  { num: "03", icon: Mail, title: "Receive Report", desc: "Get a structured compliance report delivered to your email." },
];

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full border border-slate-300 bg-slate-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-700">
            LEGAL INTELLIGENCE PLATFORM
          </span>

          <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Turn Complex Legal Documents into Clear Decisions
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg text-slate-600">
            Upload any legal or HR policy document, select your jurisdiction, and receive a structured compliance analysis report within minutes.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-[#0F2A5F] px-8 text-white hover:bg-[#12367A] shadow-none"
              >
                Analyze Document
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-800">
                How It Works
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Comprehensive Compliance Analysis
          </h2>
          <p className="mx-auto max-w-lg text-slate-600">
            Everything you need to ensure your documents meet legal and policy requirements.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-slate-200 bg-white p-6 transition hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100">
                <f.icon className="h-5 w-5 text-[#0F2A5F]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">{f.title}</h3>
              <p className="text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section id="how-it-works" className="bg-slate-50 py-20">
      <div className="container mx-auto px-6">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-lg text-slate-600">
            Three structured steps to compliance clarity.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.num}
              className="rounded-xl border border-slate-200 bg-white p-8 text-center"
            >
              <span className="mb-3 block text-4xl font-bold text-slate-200">
                {s.num}
              </span>

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0F2A5F]">
                <s.icon className="h-5 w-5 text-white" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                {s.title}
              </h3>
              <p className="text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20">
      <div className="container mx-auto px-6 text-center">
        <div className="mx-auto max-w-2xl rounded-xl bg-[#0F2A5F] p-10">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to Simplify Compliance?
          </h2>
          <p className="mb-8 text-white/80">
            Start analyzing your legal and HR documents in minutes, not days.
          </p>

          <Link to="/dashboard">
            <Button
              size="lg"
              className="bg-white text-[#0F2A5F] hover:bg-gray-100 shadow-none"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
