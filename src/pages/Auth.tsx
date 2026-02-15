import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Scale, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard", { replace: true });
      }
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (authChecking) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      toast.info("Email authentication is currently disabled. Please use Google Login.");
    } catch (error: any) {
      toast.error(error.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      toast.success(`Welcome ${result.user.displayName || "User"}`);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Google login failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="container mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center px-6 pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-10 shadow-sm">

            {/* Header */}
            <div className="mb-8 text-center space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-[#183A6B]">
                <Scale className="h-6 w-6 text-white" />
              </div>

              <h1 className="text-3xl font-semibold text-[#14233C]">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>

              <p className="text-sm text-slate-600">
                {isLogin
                  ? "Access your compliance dashboard"
                  : "Begin your structured compliance journey"}
              </p>
            </div>

            {/* Google Login */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="mb-6 w-full border-slate-300 bg-white text-[#14233C] hover:bg-slate-100 font-medium"
            >
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </Button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wide">
                <span className="bg-white px-3 text-slate-500">or</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-5">

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-10 border-slate-300 focus-visible:ring-[#183A6B]"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-10 pr-10 border-slate-300 focus-visible:ring-[#183A6B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#14233C]"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Primary Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#183A6B] text-white hover:bg-[#214C8C] font-medium tracking-wide"
              >
                {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* Toggle */}
            <p className="mt-8 text-center text-sm text-slate-600">
              {isLogin ? "New to LegalMind?" : "Already registered?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold text-[#183A6B] hover:underline"
              >
                {isLogin ? "Create Account" : "Sign In"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
