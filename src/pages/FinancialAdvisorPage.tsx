
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { PiggyBank, TrendingUp, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GradientBlob from '@/components/animations/GradientBlob';
import FinancialProfileForm from '@/components/advisor/FinancialProfileForm';
import FinancialRecommendations from '@/components/advisor/FinancialRecommendations';
import { getUserFinancialProfile, getFinancialRecommendations, FinancialProfile, FinancialRecommendations as RecommendationsType } from '@/services/financialAdvisorService';
import { useToast } from '@/components/ui/use-toast';

const FinancialAdvisorPage = () => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [profile, setProfile] = useState<FinancialProfile | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch user's financial profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getUserFinancialProfile();
        setProfile(userProfile);
        generateRecommendations(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your financial profile. Please try again.',
          variant: 'destructive',
        });
      }
    };

    fetchProfile();
  }, []);

  const generateRecommendations = async (profileData: FinancialProfile) => {
    setIsLoading(true);
    try {
      const data = await getFinancialRecommendations(profileData);
      setRecommendations(data);
      if (activeTab === 'profile') {
        setActiveTab('recommendations');
      }
      toast({
        title: 'Recommendations Updated',
        description: 'Your personalized financial recommendations have been generated.',
      });
    } catch (error) {
      console.error('Error generating recommendations:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate recommendations. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSubmit = (updatedProfile: FinancialProfile) => {
    setProfile(updatedProfile);
    generateRecommendations(updatedProfile);
  };

  const handleRefresh = () => {
    if (profile) {
      generateRecommendations(profile);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-decofi-dark pt-16">
      <Navbar />
      <div className="relative">
        <GradientBlob className="opacity-20 fixed" />
        
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Smart Financial Advisor</h1>
            <p className="text-gray-600 dark:text-gray-400">Get personalized savings and investment recommendations tailored to your financial goals.</p>
          </header>

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="recommendations" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Recommendations
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <PiggyBank className="h-4 w-4" />
                  Update Profile
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0 flex items-center gap-2"
              onClick={handleRefresh}
              disabled={isLoading || !profile}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Recommendations
            </Button>
          </div>

          <Separator className="mb-8" />

          <TabsContent value="recommendations" className="mt-0">
            <FinancialRecommendations 
              recommendations={recommendations} 
              isLoading={isLoading} 
            />
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            {profile ? (
              <FinancialProfileForm 
                initialProfile={profile} 
                onSubmit={handleProfileSubmit} 
              />
            ) : (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-decofi-blue mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading your financial profile...</p>
              </div>
            )}
          </TabsContent>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FinancialAdvisorPage;
