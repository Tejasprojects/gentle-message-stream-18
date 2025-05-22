import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, UserRole } from "@/types/auth";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  session: Session | null;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Get user profile data
          setTimeout(async () => {
            try {
              const { data: profileData, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', currentSession.user.id)
                .single();
              
              if (error || !profileData) {
                console.error('Error fetching user profile:', error);
                setUser(null);
                return;
              }
              
              // Convert profile data to User type
              const userData: User = {
                id: currentSession.user.id,
                name: profileData.full_name || currentSession.user.email?.split('@')[0] || '',
                email: profileData.email || currentSession.user.email || '',
                role: (profileData.role as UserRole) || 'student',
                profilePicture: profileData.profile_picture || null,
                createdAt: profileData.created_at || currentSession.user.created_at,
              };
              setUser(userData);
            } catch (err) {
              console.error('Unexpected error in profile fetch:', err);
              setUser(null);
            }
          }, 0);
        } else {
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        // Get user profile data
        setIsLoading(true);
        supabase
          .from('profiles')
          .select('*')
          .eq('id', currentSession.user.id)
          .single()
          .then(({ data: profileData, error }) => {
            setIsLoading(false);
            
            if (error || !profileData) {
              console.error('Error fetching user profile:', error);
              setUser(null);
              return;
            }
            
            // Convert profile data to User type
            const userData: User = {
              id: currentSession.user.id,
              name: profileData.full_name || currentSession.user.email?.split('@')[0] || '',
              email: profileData.email || currentSession.user.email || '',
              role: (profileData.role as UserRole) || 'student',
              profilePicture: profileData.profile_picture || null,
              createdAt: profileData.created_at || currentSession.user.created_at,
            };
            setUser(userData);
          });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // First, check if user exists in profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
      
      if (profileError || !profileData) {
        throw new Error("Account not found. Please register first.");
      }
      
      // Proceed with login if profile exists
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      // Success message
      toast({
        title: "Login successful!",
        description: "Welcome back to QwiX CV",
      });
      
      // Redirect based on role
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Login failed:", error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      
      // Check if profile already exists
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
      
      if (existingProfile) {
        throw new Error("This email is already registered. Please use a different email or login.");
      }
      
      // Register with Supabase - don't include role data here to avoid enum validation issues
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        // Directly insert the role from the frontend - no mapping needed now
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: name,
            email: email,
            role: role,  // Now directly using the role from the frontend
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        
        if (insertError) {
          console.error("Error creating profile:", insertError);
          // Try to clean up auth user if profile creation fails
          await supabase.auth.admin?.deleteUser(data.user.id);
          throw new Error("Failed to create user profile. Please try again.");
        }
      }
      
      // Show success message
      toast({
        title: "Registration successful!",
        description: "Welcome to QwiX CV",
      });
      
      // Redirect to appropriate page based on role
      const dashboardPath = role === 'organization' ? '/organization-home' : '/dashboard';
      const from = location.state?.from?.pathname || dashboardPath;
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: error.message || "Could not create your account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      
      // Show success message
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      // Redirect to login page
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout failed",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // Forgot password
  const forgotPassword = async (email: string) => {
    try {
      // Check if profile exists
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
      
      if (profileError || !profileData) {
        throw new Error("Account not found. Please register first.");
      }
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset email sent",
        description: `Instructions have been sent to ${email}`,
      });
    } catch (error: any) {
      console.error("Forgot password failed:", error);
      toast({
        title: "Failed to send reset email",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    }
  };

  // Reset password
  const resetPassword = async (token: string, password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset successful",
        description: "You can now login with your new password",
      });
      navigate("/login");
    } catch (error: any) {
      console.error("Reset password failed:", error);
      toast({
        title: "Password reset failed",
        description: error.message || "Invalid or expired token",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    session,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
