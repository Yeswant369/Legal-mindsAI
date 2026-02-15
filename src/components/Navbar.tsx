import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Scale, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const links = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/impact", label: "Impact" },
  ];

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully!");
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        {/* ===== LOGO (UPDATED HERE) ===== */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F2A5F] shadow-sm">
            <Scale className="h-5 w-5 text-white" />
          </div>

          <span className="text-xl font-semibold tracking-[0.08em]">
            <span className="text-[#0F2A5F]">LEGAL</span>
            <span className="text-slate-700">MIND</span>
          </span>
        </Link>
        {/* ================================= */}

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.to
                  ? "text-[#0F2A5F]"
                  : "text-slate-600 hover:text-[#0F2A5F]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button
                  size="sm"
                  className="bg-[#0F2A5F] text-white hover:bg-[#12367A] shadow-sm"
                >
                  Analyze Document
                </Button>
              </Link>

              <Button
                size="sm"
                variant="outline"
                onClick={handleSignOut}
                className="gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button
                size="sm"
                className="bg-[#0F2A5F] text-white hover:bg-[#12367A] shadow-sm"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-slate-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-slate-200 bg-white md:hidden"
        >
          <div className="flex flex-col gap-4 px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-slate-600 hover:text-[#0F2A5F]"
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button className="w-full bg-[#0F2A5F] text-white hover:bg-[#12367A] shadow-sm">
                    Analyze Document
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  onClick={() => {
                    handleSignOut();
                    setMobileOpen(false);
                  }}
                  className="w-full gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  <LogOut className="h-3.5 w-3.5" /> Sign Out
                </Button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
              >
                <Button className="w-full bg-[#0F2A5F] text-white hover:bg-[#12367A] shadow-sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
