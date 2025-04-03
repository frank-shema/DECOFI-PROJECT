import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GradientBlob from "@/components/animations/GradientBlob";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

const LoginPage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || "/dashboard";

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLoginWithII = async () => {
    try {
      setIsLoggingIn(true);
      await login();

      // Navigate to the page the user was trying to access
      navigate(from, { replace: true });

      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        variant: "default",
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "There was an error logging in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <GradientBlob className="opacity-30" />

      <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <Card className="w-full max-w-md glass-card animate-slide-up">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your DeCoFi account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h3 className="font-medium">Sign in with Internet Identity</h3>
            <p className="text-sm text-muted-foreground">
              Use your Internet Identity to securely authenticate
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={handleLoginWithII}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Spinner className="h-4 w-4 mr-2" />
                Connecting to Internet Identity...
              </>
            ) : (
              <>
                <img
                  src="https://internetcomputer.org/img/IC_logo_horizontal.svg"
                  alt="Internet Identity"
                  className="h-5 mr-2"
                />
                Internet Identity
              </>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-decofi-dark text-gray-500">
                Info
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Internet Identity is a blockchain authentication service that
              allows you to securely authenticate across dapps without revealing
              your personal information.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-decofi-blue hover:underline">
              Create one
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
