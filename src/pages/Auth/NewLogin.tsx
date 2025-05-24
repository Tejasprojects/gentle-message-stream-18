
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { UserRole } from "@/types/auth";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Eye, EyeOff, Mail, Lock, User, Building } from 'lucide-react';

const NewLogin = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState<UserRole>("student");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const { login, register, isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboardPath = user.role === 'organization' ? '/organization-home' : '/student-home';
      navigate(dashboardPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is invalid";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!isLoginMode && !name) {
      newErrors.name = "Full name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await register(name, email, password, userRole);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrors({});
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          style={{ bottom: '20%', right: '15%' }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-cyan-400/25 to-blue-400/25 blur-2xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
          }}
          style={{ top: '50%', right: '20%' }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPC9zdmc+')] opacity-30"></div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GraduationCap className="h-8 w-8 text-white" />
              </motion.div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              QwiXEd360°Suite
            </h1>
            <p className="text-blue-200 text-lg">by Mahayudh</p>
          </motion.div>

          {/* Main Card */}
          <motion.div
            className="relative"
            style={{ perspective: "1000px" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isLoginMode ? 'login' : 'register'}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="transform-gpu"
              >
                <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-white">
                      {isLoginMode ? "Welcome Back" : "Create Account"}
                    </CardTitle>
                    <CardDescription className="text-blue-200">
                      {isLoginMode 
                        ? "Sign in to your account to continue" 
                        : "Join us to start your journey"
                      }
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <form onSubmit={isLoginMode ? handleLogin : handleRegister} className="space-y-4">
                      {!isLoginMode && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="name" className="text-white flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/20 transition-all duration-300"
                            error={errors.name}
                          />
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-400 text-sm"
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </motion.div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/20 transition-all duration-300"
                          error={errors.email}
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-white flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/20 transition-all duration-300 pr-10"
                            error={errors.password}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {errors.password && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm"
                          >
                            {errors.password}
                          </motion.p>
                        )}
                      </div>

                      {!isLoginMode && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <Label className="text-white flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Account Type
                          </Label>
                          <Select value={userRole} onValueChange={(value: UserRole) => setUserRole(value)}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white backdrop-blur-sm">
                              <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="student" className="text-white hover:bg-slate-700">
                                Student/Freelancer
                              </SelectItem>
                              <SelectItem value="organization" className="text-white hover:bg-slate-700">
                                Organization/HR Admin
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </motion.div>
                      )}

                      {isLoginMode && (
                        <div className="flex justify-end">
                          <Link
                            to="/forgot-password"
                            className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                      )}

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                          ) : (
                            isLoginMode ? "Sign In" : "Create Account"
                          )}
                        </Button>
                      </motion.div>
                    </form>

                    <div className="text-center">
                      <p className="text-white/70">
                        {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                      </p>
                      <motion.button
                        onClick={toggleMode}
                        className="text-blue-300 hover:text-blue-200 font-medium transition-colors mt-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isLoginMode ? "Create one now" : "Sign in instead"}
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="text-center mt-8 text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-sm">© 2025 Mahayudh. All rights reserved.</p>
            <p className="text-xs mt-1">Professional Enterprise Solution</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewLogin;
