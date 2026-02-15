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
  { icon: Globe, title: "Jurisdiction-Aware Analysis", desc: "Compliance validation aligned with country-specific statutory frameworks." },
  { icon: Shield, title: "HR Policy Compliance", desc: "Structured detection of regulatory gaps and internal policy inconsistencies." },
  { icon: BarChart3, title: "Client vs Internal Policy Review", desc: "Side-by-side compliance comparison for contractual alignment." },
  { icon: Search, title: "Clause-Level Regulation Mapping", desc: "Automated clause mapping against relevant legal provisions." },
  { icon: AlertTriangle, title: "Risk Identification Engine", desc: "Flag clauses exposing operational, financial or regulatory risk." },
  { icon: Lightbulb, title: "Action-Oriented Recommendations", desc: "Clear remediation steps prioritized by impact severity." },
];

const steps = [
  { num: "01", icon: Upload, title: "Upload Documentation", desc: "Securely upload legal agreements or HR policy documents." },
  { num: "02", icon: Globe, title: "Define Jurisdiction", desc: "Select governing jurisdiction and regulatory context." },
  { num: "03", icon: Mail, title: "Receive Structured Report", desc: "Obtain a formal compliance intelligence summary." },
];

const Index = () => (
  <div className="min-h-screen bg-[#F8FAFC]">
    <Navbar />

    {/* ================= HERO ================= */}
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="mb-6 inline-block rounded-full border border-slate-300 bg-white px-5 py-2 text-xs font-semibold tracking-wider text-slate-600 shadow-sm">
            LEGAL INTELLIGENCE PLATFORM
          </span>

          <h1 className="mx-auto mb-8 max-w-4xl text-5xl font-semibold leading-[1.1] tracking-tight text-[#14233C] md:text-6xl">
            Transform Complex Legal Documents
            <br />
            Into Structured, Actionable Decisions
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600">
            A compliance intelligence system designed for legal teams, HR departments,
            and regulatory professionals requiring structured statutory validation.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-[#183A6B] px-10 text-white hover:bg-[#214C8C] shadow-sm"
              >
                Analyze Document
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </Link>

            <a href="#how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 text-[#14233C]"
              >
                How It Works
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ================= FEATURES ================= */}
    <section className="py-24 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-semibold text-[#14233C]">
            Enterprise-Grade Compliance Intelligence
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            Designed for structured legal review at institutional scale.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-lg border border-slate-200 bg-[#FAFBFC] p-8 transition hover:border-[#183A6B]/30 hover:shadow-lg"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-white border border-slate-200">
                <f.icon className="h-5 w-5 text-[#183A6B]" />
              </div>

              <h3 className="mb-3 text-lg font-semibold text-[#14233C]">
                {f.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-600">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ================= HOW IT WORKS ================= */}
    <section id="how-it-works" className="py-24 bg-[#F1F5F9] border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-semibold text-[#14233C]">
            Structured Workflow
          </h2>
          <p className="mx-auto max-w-xl text-slate-600">
            A disciplined, audit-friendly compliance process.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.num}
              className="rounded-lg border border-slate-200 bg-white p-10 text-center shadow-sm"
            >
              <span className="mb-6 block text-5xl font-semibold text-slate-200">
                {s.num}
              </span>

              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-[#183A6B]">
                <s.icon className="h-5 w-5 text-white" />
              </div>

              <h3 className="mb-3 text-lg font-semibold text-[#14233C]">
                {s.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-600">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ================= CTA ================= */}
    <section className="py-28 bg-[#183A6B]">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-6 text-4xl font-semibold text-white">
          Institutional-Grade Legal Clarity
        </h2>

        <p className="mb-10 text-lg text-white/80">
          Reduce interpretational risk. Improve compliance precision.
          Enable structured legal intelligence.
        </p>

        <Link to="/dashboard">
          <Button
            size="lg"
            className="bg-white px-10 text-[#183A6B] hover:bg-slate-100 shadow-sm"
          >
            Begin Analysis
            <ArrowRight className="ml-3 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
