import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using LEGALMIND ("Service"), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access or use the Service.`
  },
  {
    title: "2. Description of Service",
    content: `LEGALMIND provides AI-powered legal document analysis and HR policy compliance checking services. The Service includes:

• Document upload and processing
• Jurisdiction-specific compliance analysis
• Comparative policy analysis
• Automated report generation and delivery

The Service is intended for informational purposes only and does not constitute legal advice.`
  },
  {
    title: "3. User Accounts",
    content: `You may need to create an account to use certain features. You are responsible for:

• Maintaining the confidentiality of your account credentials
• All activities that occur under your account
• Notifying us immediately of any unauthorized access
• Providing accurate and complete information`
  },
  {
    title: "4. Acceptable Use",
    content: `You agree NOT to:

• Upload malicious files or content
• Attempt to gain unauthorized access to our systems
• Use the Service for any illegal purpose
• Violate any applicable laws or regulations
• Interfere with the proper functioning of the Service
• Reverse engineer or attempt to extract source code`
  },
  {
    title: "5. Intellectual Property",
    content: `The Service and its original content, features, and functionality are owned by LEGALMIND and are protected by international copyright, trademark, and other intellectual property laws. 

You retain ownership of documents you upload. By uploading documents, you grant us a limited license to process them for the purpose of providing the Service.`
  },
  {
    title: "6. Disclaimer of Warranties",
    content: `THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.

LEGALMIND does not warrant that:
• The Service will be uninterrupted or error-free
• Analysis results will be 100% accurate
• The Service will meet your specific requirements

The AI-generated analysis is for informational purposes only and should not be considered legal advice. Always consult with qualified legal professionals for legal matters.`
  },
  {
    title: "7. Limitation of Liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, LEGALMIND SHALL NOT BE LIABLE FOR:

• Any indirect, incidental, special, consequential, or punitive damages
• Loss of profits, data, or business opportunities
• Damages arising from use or inability to use the Service
• Decisions made based on Service analysis

Our total liability shall not exceed the amount paid by you (if any) in the 12 months preceding the claim.`
  },
  {
    title: "8. Indemnification",
    content: `You agree to indemnify and hold harmless LEGALMIND, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Service or violation of these Terms.`
  },
  {
    title: "9. Termination",
    content: `We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Service will cease immediately.`
  },
  {
    title: "10. Changes to Terms",
    content: `We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on this page. Your continued use of the Service after changes constitutes acceptance of the new Terms.`
  },
  {
    title: "11. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.`
  },
  {
    title: "12. Contact Information",
    content: `For questions about these Terms of Service, please contact us at:

Email: legal@legalmind.ai
Address: 123 Legal Tech Drive, San Francisco, CA 94105`
  },
];

const Terms = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <section className="pt-28 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">Terms of Service</h1>
          <p className="text-muted-foreground">Last Updated: February 2026</p>
        </motion.div>
      </div>
    </section>

    <section className="pb-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground"
          >
            Please read these Terms of Service carefully before using LEGALMIND. These terms govern your access to and use of our AI-powered legal and HR compliance analysis platform.
          </motion.p>

          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <h2 className="mb-3 font-sans text-lg font-bold text-foreground">{section.title}</h2>
              <p className="whitespace-pre-line text-sm text-muted-foreground">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Terms;
