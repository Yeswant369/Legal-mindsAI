import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, FileText, Globe, AlertTriangle, Lightbulb, Mail, BarChart3, Upload, Search } from "lucide-react";
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
  { num: "03", icon: Mail, title: "Receive Report", desc: "Get a detailed compliance report delivered to your email." },
];

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 bg-gradient-hero opacity-[0.03]" />
      <div className="container relative mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
            AI-POWERED LEGAL INTELLIGENCE
          </span>
          <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-bold leading-tight text-foreground md:text-6xl">
            Turn Complex Legal Documents into{" "}
            <span className="text-gradient-hero">Clear Decisions</span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
            Upload any legal or HR policy document, select your jurisdiction, and receive an AI-powered compliance analysis report in minutes.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-hero px-8 text-primary-foreground shadow-lg hover:opacity-90">
                Analyze Document <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Comprehensive Compliance Analysis
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Everything you need to ensure your documents meet legal and policy requirements.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-sans text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section id="how-it-works" className="bg-muted/50 py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Three simple steps to compliance clarity.
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative rounded-xl border border-border bg-card p-8 text-center shadow-card"
            >
              <span className="mb-3 block font-display text-4xl font-bold text-primary/20">{s.num}</span>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-hero">
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mb-2 font-sans text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl rounded-2xl bg-gradient-hero p-12 shadow-xl"
        >
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
            Ready to Simplify Compliance?
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Start analyzing your legal and HR documents in minutes, not days.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-card text-primary shadow-lg hover:bg-card/90">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
