import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle, FileText, Shield, Settings, ChevronDown, ChevronUp, Mail, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  {
    category: "Getting Started",
    icon: FileText,
    questions: [
      { q: "What file formats does LEGALMIND support?", a: "Currently, LEGALMIND supports PDF documents. We're working on adding support for Word documents (.docx) and other formats in the future." },
      { q: "How do I upload a document for analysis?", a: "Navigate to the Dashboard, select your analysis type, drag and drop your PDF or click to browse, select your jurisdiction, enter your email, and click 'Analyze Document'." },
      { q: "How long does the analysis take?", a: "Most documents are analyzed within 2-5 minutes. Complex documents with many pages may take longer. You'll receive an email when your report is ready." },
    ]
  },
  {
    category: "Analysis Types",
    icon: HelpCircle,
    questions: [
      { q: "What's the difference between the three analysis types?", a: "Legal Document Compliance analyzes contracts and legal documents against jurisdiction laws. HR Policy Compliance checks HR documents for compliance gaps. Client vs HR Comparison compares client policies against your internal HR norms to find conflicts." },
      { q: "Can I analyze documents from any country?", a: "Yes! LEGALMIND supports all recognized countries worldwide. Simply select the applicable jurisdiction from the dropdown menu." },
      { q: "What types of issues does the analysis detect?", a: "Our AI identifies compliance gaps, risky clauses, regulatory conflicts, missing provisions, and provides actionable recommendations for remediation." },
    ]
  },
  {
    category: "Security & Privacy",
    icon: Shield,
    questions: [
      { q: "Is my document data secure?", a: "Absolutely. All documents are encrypted during transmission using TLS 1.3 and processed in isolated, secure environments. Documents are automatically deleted after analysis." },
      { q: "Do you store my documents?", a: "No. We do not permanently store your uploaded documents. They are processed temporarily and automatically deleted after your analysis report is generated." },
      { q: "Who can access my documents?", a: "Only our automated AI systems process your documents. No human reviews your documents unless you specifically request support assistance." },
    ]
  },
  {
    category: "Account & Billing",
    icon: Settings,
    questions: [
      { q: "Do I need an account to use LEGALMIND?", a: "For basic analysis, you only need to provide an email address to receive your report. Creating an account unlocks additional features like analysis history and saved preferences." },
      { q: "Is there a free trial?", a: "Yes! You can analyze documents for free with basic features. Premium plans offer advanced analysis, priority processing, and additional features." },
      { q: "How do I cancel my subscription?", a: "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period." },
    ]
  },
];

const Support = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(key)) {
      newOpen.delete(key);
    } else {
      newOpen.add(key);
    }
    setOpenItems(newOpen);
  };

  return (
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
              HELP CENTER
            </span>
            <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
              How Can We <span className="text-gradient-hero">Help?</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions or get in touch with our support team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="pb-12">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            <Link to="/contact" className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover">
              <MessageCircle className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-1 font-sans font-semibold text-foreground">Contact Support</h3>
              <p className="text-sm text-muted-foreground">Get help from our team</p>
            </Link>
            <Link to="/dashboard" className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover">
              <FileText className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-1 font-sans font-semibold text-foreground">Analyze Document</h3>
              <p className="text-sm text-muted-foreground">Start a new analysis</p>
            </Link>
            <a href="mailto:support@legalmind.ai" className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover">
              <Mail className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-1 font-sans font-semibold text-foreground">Email Us</h3>
              <p className="text-sm text-muted-foreground">support@legalmind.ai</p>
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              {faqs.map((category) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-sans text-lg font-semibold text-foreground">{category.category}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.questions.map((item, i) => {
                      const key = `${category.category}-${i}`;
                      const isOpen = openItems.has(key);
                      return (
                        <div
                          key={key}
                          className="rounded-xl border border-border bg-card shadow-card overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(key)}
                            className="flex w-full items-center justify-between p-4 text-left"
                          >
                            <span className="pr-4 font-medium text-foreground">{item.q}</span>
                            {isOpen ? (
                              <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                            )}
                          </button>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="border-t border-border px-4 pb-4 pt-3"
                            >
                              <p className="text-sm text-muted-foreground">{item.a}</p>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 rounded-xl bg-gradient-hero p-8 text-center"
            >
              <h3 className="mb-3 text-xl font-bold text-primary-foreground">Still have questions?</h3>
              <p className="mb-5 text-primary-foreground/80">Our support team is here to help you.</p>
              <Link to="/contact">
                <Button className="bg-card text-primary hover:bg-card/90">
                  Contact Support <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;
