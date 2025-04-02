
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GradientBlob from '@/components/animations/GradientBlob';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components/ui/spinner';

const RegisterPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegisterWithII = async () => {
    try {
      setIsRegistering(true);
      
      // Registration with Internet Identity is essentially the same as login
      // since the canister will create a new user if one doesn't exist
      await login();
      
      // Navigate to dashboard after successful registration/login
      navigate('/dashboard');
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created and you are now logged in.",
        variant: "default",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
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
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Join DeCoFi's decentralized cooperative finance platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h3 className="font-medium">Register with Internet Identity</h3>
            <p className="text-sm text-muted-foreground">
              Internet Identity is a secure, anonymous authentication service built on the Internet Computer.
            </p>
          </div>
            
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center" 
            onClick={handleRegisterWithII}
            disabled={isRegistering}
          >
            {isRegistering ? (
              <>
                <Spinner className="h-4 w-4 mr-2" />
                Connecting to Internet Identity...
              </>
            ) : (
              <>
                <img src="https://internetcomputer.org/img/IC_logo_horizontal.svg" alt="Internet Identity" className="h-5 mr-2" />
                Internet Identity
              </>
            )}
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-decofi-dark text-gray-500">Info</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              When you register with Internet Identity, you'll create a secure authentication anchor
              that can be used across dapps on the Internet Computer.
            </p>
            <p className="text-sm text-muted-foreground">
              Don't have an Internet Identity yet?
            </p>
            <a 
              href="https://identity.ic0.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-decofi-blue hover:underline inline-flex items-center"
            >
              Create one now
              <ArrowRight className="ml-1 h-3 w-3" />
            </a>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-decofi-blue hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
