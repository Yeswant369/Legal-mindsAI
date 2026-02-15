import { Link } from "react-router-dom";
import { Scale } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="container mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand Section */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              
              {/* SAME ICON STYLE AS NAVBAR */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F2A5F]">
                <Scale className="h-5 w-5 text-white" />
              </div>

              {/* EXACT SAME BRAND STRUCTURE AS NAVBAR */}
              <span className="text-xl font-bold tracking-tight">
                <span className="text-[#0F2A5F]">LEGAL</span>
                <span className="text-[#3F4A5A]">MIND</span>
              </span>

            </div>

            <p className="max-w-xs text-sm leading-relaxed text-slate-600">
              AI-powered legal and HR policy intelligence. Transform complex
              documents into structured, audit-ready compliance insights.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">
              Product
            </h4>
            <div className="space-y-2 text-sm text-slate-600">
              <Link to="/dashboard" className="block transition-colors hover:text-[#0F2A5F]">
                Dashboard
              </Link>
              <Link to="/about" className="block transition-colors hover:text-[#0F2A5F]">
                About
              </Link>
              <Link to="/contact" className="block transition-colors hover:text-[#0F2A5F]">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">
              Legal
            </h4>
            <div className="space-y-2 text-sm text-slate-600">
              <Link to="/privacy" className="block transition-colors hover:text-[#0F2A5F]">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block transition-colors hover:text-[#0F2A5F]">
                Terms of Service
              </Link>
              <Link to="/support" className="block transition-colors hover:text-[#0F2A5F]">
                Support
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          © 2026 LEGALMIND. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
