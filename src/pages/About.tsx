import { motion } from "framer-motion";
import { Scale, Shield, Globe, Users, Target, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  { icon: Shield, title: "Trust & Security", desc: "Your documents are processed with enterprise-grade encryption and never stored permanently." },
  { icon: Globe, title: "Global Coverage", desc: "We support compliance analysis for every recognized jurisdiction worldwide." },
  { icon: Target, title: "Precision", desc: "Our AI models are trained on millions of legal documents for accurate analysis." },
  { icon: Lightbulb, title: "Actionable Insights", desc: "We don't just identify issues—we provide clear steps to resolve them." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    
    <section className="pt-28 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
            ABOUT US
          </span>
          <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
            Simplifying Legal Compliance with <span className="text-gradient-hero">AI</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            LEGALMIND was founded with a simple mission: make legal and HR compliance accessible to everyone, not just legal experts.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground">Our Mission</h2>
            <p className="mb-4 text-muted-foreground">
              We believe that understanding legal compliance shouldn't require a law degree. Our AI-powered platform transforms complex legal documents into clear, actionable insights that anyone can understand.
            </p>
            <p className="text-muted-foreground">
              Whether you're a small business owner reviewing a contract, an HR manager ensuring policy compliance, or a legal professional seeking efficiency, LEGALMIND is designed for you.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-gradient-hero shadow-xl">
              <Scale className="h-24 w-24 text-primary-foreground" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-foreground">Our Values</h2>
          <p className="text-muted-foreground">The principles that guide everything we do.</p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <v.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-sans text-lg font-semibold text-foreground">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <Users className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="mb-4 text-3xl font-bold text-foreground">Our Team</h2>
          <p className="text-muted-foreground">
            LEGALMIND is built by a diverse team of legal experts, AI researchers, and software engineers passionate about making legal technology accessible. We're backed by leading investors who share our vision for democratizing legal compliance.
          </p>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
