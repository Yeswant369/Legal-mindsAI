import { Scale } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-6 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="mb-4 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
              <Scale className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">
              LEGAL<span className="text-gradient-hero font-display">MIND</span>
            </span>
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            AI-powered legal and HR policy intelligence. Turn complex documents into clear, actionable compliance insights.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Product</h4>
          <div className="flex flex-col gap-2">
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary">Dashboard</Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary">About</Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Legal</h4>
          <div className="flex flex-col gap-2">
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary">Support</Link>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} LEGALMIND. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
