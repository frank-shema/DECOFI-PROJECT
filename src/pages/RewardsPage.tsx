import { useState } from 'react';
import { Award, Gift, ArrowRight, Flame, Target, Clock, RefreshCw, Wallet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GradientBlob from '@/components/animations/GradientBlob';

const RewardsPage = () => {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const { toast } = useToast();

  const rewardsData = {
    totalTokens: 120,
    pendingTokens: 15,
    savingsStreak: 18,
    repaymentsOnTime: 6,
    votingParticipation: 8,
    level: 3
  };

  const rewardsTiers = [
    { level: 1, threshold: 0, benefits: ['Basic loan access', 'Voting rights'] },
    { level: 2, threshold: 50, benefits: ['Reduced loan interest (0.5%)', 'Priority support'] },
    { level: 3, threshold: 100, benefits: ['Increased loan limits (+10%)', 'Governance proposals', 'Exclusive investment opportunities'] },
    { level: 4, threshold: 200, benefits: ['Premium loan rates (-1%)', 'Dividend boost (+5%)', 'Early access to new features'] },
    { level: 5, threshold: 500, benefits: ['VIP status', 'Maximum loan benefits', 'Cooperative leadership eligibility'] }
  ];

  const availableRewards = [
    {
      id: 1,
      title: "Interest Rate Reduction",
      description: "Reduce your next loan's interest rate by 1%",
      tokenCost: 30,
      category: "loan"
    },
    {
      id: 2,
      title: "Emergency Loan Access",
      description: "Get access to emergency loans without waiting period",
      tokenCost: 50,
      category: "loan"
    },
    {
      id: 3,
      title: "Savings Bonus",
      description: "Add a 5% bonus to your next deposit",
      tokenCost: 25,
      category: "savings"
    },
    {
      id: 4,
      title: "Governance Proposal",
      description: "Submit a proposal without token threshold",
      tokenCost: 40,
      category: "governance"
    }
  ];

  const earningOpportunities = [
    {
      title: "Consistent Savings",
      description: "Earn 2 tokens for each week you make a deposit",
      reward: 2,
      period: "weekly",
      icon: <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
    },
    {
      title: "On-time Loan Repayments",
      description: "Earn 5 tokens for each on-time loan repayment",
      reward: 5,
      period: "per repayment",
      icon: <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Governance Participation",
      description: "Earn 3 tokens each time you vote on a proposal",
      reward: 3,
      period: "per vote",
      icon: <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
    },
    {
      title: "Referral Program",
      description: "Earn 10 tokens when you refer a new member who joins",
      reward: 10,
      period: "per referral",
      icon: <Gift className="h-5 w-5 text-red-600 dark:text-red-400" />
    }
  ];

  const handleRedeemReward = (rewardId: number, rewardTitle: string, tokenCost: number) => {
    if (rewardsData.totalTokens < tokenCost) {
      toast({
        title: "Insufficient Tokens",
        description: `You need ${tokenCost - rewardsData.totalTokens} more tokens to redeem this reward.`,
        variant: "destructive"
      });
      return;
    }

    setIsRedeeming(true);
    
    setTimeout(() => {
      setIsRedeeming(false);
      toast({
        title: "Reward Redeemed",
        description: `You've successfully redeemed "${rewardTitle}" for ${tokenCost} tokens.`,
      });
    }, 1500);
  };

  const currentTier = rewardsTiers.find(tier => tier.level === rewardsData.level);
  const nextTier = rewardsTiers.find(tier => tier.level === rewardsData.level + 1);
  const progressToNextTier = nextTier 
    ? Math.min(100, Math.round((rewardsData.totalTokens / nextTier.threshold) * 100))
    : 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-decofi-dark pt-16">
      <Navbar />
      <div className="relative">
        <GradientBlob className="opacity-20 fixed" />
        
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Rewards & Tokens</h1>
            <p className="text-gray-600 dark:text-gray-400">Earn and use DeCoFi tokens to unlock benefits</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white dark:bg-gray-800 shadow-md md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Your Rewards
                </CardTitle>
                <CardDescription>
                  Your current tokens and reward status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
                        <Award className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{rewardsData.totalTokens} Tokens</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          +{rewardsData.pendingTokens} pending
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                            <Flame className="h-4 w-4 text-orange-500" />
                            Savings Streak
                          </span>
                          <span className="font-medium">{rewardsData.savingsStreak} weeks</span>
                        </div>
                        <Progress value={(rewardsData.savingsStreak / 24) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            On-time Repayments
                          </span>
                          <span className="font-medium">{rewardsData.repaymentsOnTime} payments</span>
                        </div>
                        <Progress value={(rewardsData.repaymentsOnTime / 10) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                            <Target className="h-4 w-4 text-purple-500" />
                            Voting Participation
                          </span>
                          <span className="font-medium">{rewardsData.votingParticipation} votes</span>
                        </div>
                        <Progress value={(rewardsData.votingParticipation / 12) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 border-t pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                    <h3 className="text-lg font-semibold mb-2">Level {rewardsData.level} Member</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {currentTier ? currentTier.benefits.join(', ') : 'Basic membership benefits'}
                    </p>
                    
                    {nextTier && (
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-gray-700 dark:text-gray-300">Progress to Level {rewardsData.level + 1}</span>
                          <span className="font-medium">{rewardsData.totalTokens}/{nextTier.threshold} tokens</span>
                        </div>
                        <Progress value={progressToNextTier} className="h-2 mb-3" />
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Next level includes: {nextTier.benefits.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Token History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-green-500 pl-4 pb-4 relative">
                    <div className="w-3 h-3 rounded-full bg-green-500 absolute -left-[6.5px] top-0"></div>
                    <h4 className="font-medium">Earned 5 tokens</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Loan repayment reward</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">2 days ago</p>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-4 pb-4 relative">
                    <div className="w-3 h-3 rounded-full bg-blue-500 absolute -left-[6.5px] top-0"></div>
                    <h4 className="font-medium">Earned 3 tokens</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Governance vote</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">5 days ago</p>
                  </div>
                  <div className="border-l-2 border-red-500 pl-4 pb-4 relative">
                    <div className="w-3 h-3 rounded-full bg-red-500 absolute -left-[6.5px] top-0"></div>
                    <h4 className="font-medium">Used 30 tokens</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Interest rate reduction</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">2 weeks ago</p>
                  </div>
                  <div className="border-l-2 border-green-500 pl-4 relative">
                    <div className="w-3 h-3 rounded-full bg-green-500 absolute -left-[6.5px] top-0"></div>
                    <h4 className="font-medium">Earned 2 tokens</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Weekly savings</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">2 weeks ago</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full text-sm">
                  View Complete History
                </Button>
              </CardFooter>
            </Card>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {availableRewards.map(reward => (
              <Card key={reward.id} className="bg-white dark:bg-gray-800 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{reward.title}</CardTitle>
                  <CardDescription>
                    {reward.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Badge color={getBadgeColor(reward.category)} />
                      <span className="ml-2 text-sm capitalize">{reward.category}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-bold">{reward.tokenCost}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    className={`w-full ${rewardsData.totalTokens >= reward.tokenCost ? 'bg-decofi-blue hover:bg-decofi-blue/90' : 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'}`}
                    disabled={rewardsData.totalTokens < reward.tokenCost || isRedeeming}
                    onClick={() => handleRedeemReward(reward.id, reward.title, reward.tokenCost)}
                  >
                    {isRedeeming ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing
                      </>
                    ) : (
                      <>
                        Redeem Reward
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mb-4">How to Earn More Tokens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {earningOpportunities.map((opportunity, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {opportunity.icon}
                    {opportunity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{opportunity.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{opportunity.reward} tokens</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">{opportunity.period}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Badge = ({ color }: { color: string }) => (
  <div 
    className={`w-3 h-3 rounded-full ${color}`}
  ></div>
);

const getBadgeColor = (category: string) => {
  switch (category) {
    case 'loan':
      return 'bg-purple-500';
    case 'savings':
      return 'bg-green-500';
    case 'governance':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

const CheckCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default RewardsPage;
