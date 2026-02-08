import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, upload documents for analysis, or contact us for support. This may include:
    
• Email address
• Uploaded documents (processed temporarily for analysis)
• Usage data and analytics
• Communication preferences`
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process and analyze your documents
• Send you analysis reports and notifications
• Respond to your comments, questions, and requests
• Monitor and analyze trends, usage, and activities
• Detect, investigate, and prevent security incidents`
  },
  {
    title: "Document Processing & Storage",
    content: `Your documents are processed using secure, encrypted connections. We do NOT permanently store your uploaded documents. Documents are:

• Encrypted during transmission using TLS 1.3
• Processed in isolated, secure environments
• Automatically deleted after analysis is complete
• Never shared with third parties for their marketing purposes`
  },
  {
    title: "Data Sharing",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:

• With your consent
• To comply with legal obligations
• To protect our rights and prevent fraud
• With service providers who assist in our operations (under strict confidentiality agreements)`
  },
  {
    title: "Data Security",
    content: `We implement industry-standard security measures to protect your information, including:

• End-to-end encryption for document uploads
• Secure data centers with 24/7 monitoring
• Regular security audits and penetration testing
• Access controls and authentication requirements
• Compliance with SOC 2 Type II standards`
  },
  {
    title: "Your Rights",
    content: `Depending on your location, you may have the following rights:

• Access your personal data
• Correct inaccurate data
• Delete your data
• Export your data
• Opt out of marketing communications
• Lodge a complaint with a supervisory authority`
  },
  {
    title: "Cookies & Tracking",
    content: `We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can manage cookie preferences through your browser settings.`
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.`
  },
  {
    title: "Contact Us",
    content: `If you have questions about this Privacy Policy or our data practices, please contact us at:

Email: privacy@legalmind.ai
Address: 123 Legal Tech Drive, San Francisco, CA 94105`
  },
];

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <section className="pt-28 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">Privacy Policy</h1>
          <p className="text-muted-foreground">Last Updated: February 2026</p>
        </motion.div>
      </div>
    </section>

    <section className="pb-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground"
          >
            At LEGALMIND, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered legal and HR compliance analysis platform.
          </motion.p>

          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <h2 className="mb-3 font-sans text-xl font-bold text-foreground">{section.title}</h2>
              <p className="whitespace-pre-line text-sm text-muted-foreground">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Privacy;
