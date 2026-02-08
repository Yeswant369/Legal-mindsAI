import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@legalmind.ai", href: "mailto:support@legalmind.ai" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: MapPin, label: "Address", value: "123 Legal Tech Drive, San Francisco, CA 94105", href: null },
];

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success("Thank you! We'll get back to you within 24 hours.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
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
              GET IN TOUCH
            </span>
            <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
              Contact <span className="text-gradient-hero">Us</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a question or need assistance? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-2xl font-bold text-foreground">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Name *</label>
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Email *</label>
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Subject</label>
                  <Input
                    placeholder="How can we help?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Message *</label>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 sm:w-auto"
                >
                  {loading ? "Sending..." : "Send Message"} <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-2xl font-bold text-foreground">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <c.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-foreground hover:text-primary transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-foreground">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-xl border border-border bg-card p-6 shadow-card">
                <MessageSquare className="mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-sans text-lg font-semibold text-foreground">Live Support</h3>
                <p className="text-sm text-muted-foreground">
                  Our support team is available Monday through Friday, 9 AM to 6 PM PST. Typical response time is under 2 hours.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
