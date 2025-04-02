
import { useState } from 'react';
import { Vote, Check, Clock, Hourglass, TrendingUp, Users, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GradientBlob from '@/components/animations/GradientBlob';

const GovernancePage = () => {
  const [expandedProposal, setExpandedProposal] = useState<number | null>(null);
  const [castingVote, setCastingVote] = useState(false);
  const { toast } = useToast();

  // Sample data for UI
  const userTokens = 120;
  const totalProposals = 8;
  const activeProposals = 3;
  const participation = 76;
  
  const proposals = [
    {
      id: 1,
      title: "Increase loan limits for long-term members",
      description: "Proposal to increase the maximum loan amount from 3x to 4x of savings for members who have been active for more than 2 years with good repayment history.",
      proposer: "Community Council",
      created: "2023-11-10",
      deadline: "2023-11-25",
      status: "active",
      votesFor: 2567,
      votesAgainst: 843,
      totalVotes: 3410,
      category: "Loan Policy"
    },
    {
      id: 2,
      title: "Add educational loans with reduced interest rates",
      description: "Introduce a new loan category specifically for educational purposes with a reduced interest rate of 3% instead of the standard 5%.",
      proposer: "Education Committee",
      created: "2023-11-08",
      deadline: "2023-11-23",
      status: "active",
      votesFor: 3120,
      votesAgainst: 420,
      totalVotes: 3540,
      category: "New Features"
    },
    {
      id: 3,
      title: "Quarterly distribution of cooperative profits",
      description: "Change profit distribution from annual to quarterly to provide more frequent returns to members.",
      proposer: "Finance Working Group",
      created: "2023-11-12",
      deadline: "2023-11-27",
      status: "active",
      votesFor: 1890,
      votesAgainst: 1230,
      totalVotes: 3120,
      category: "Finance"
    },
    {
      id: 4,
      title: "Community investment in renewable energy projects",
      description: "Allocate 5% of the cooperative's investment portfolio to local renewable energy projects.",
      proposer: "Sustainability Committee",
      created: "2023-10-25",
      deadline: "2023-11-09",
      status: "completed",
      votesFor: 4120,
      votesAgainst: 890,
      totalVotes: 5010,
      category: "Investments",
      result: "passed"
    },
  ];

  const toggleExpandProposal = (id: number) => {
    setExpandedProposal(expandedProposal === id ? null : id);
  };

  const handleVote = (proposalId: number, voteType: 'for' | 'against') => {
    setCastingVote(true);
    
    // Simulate API call
    setTimeout(() => {
      setCastingVote(false);
      toast({
        title: "Vote Cast Successfully",
        description: `You voted ${voteType} the proposal. Your vote has been recorded on the blockchain.`,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-decofi-dark pt-16">
      <Navbar />
      <div className="relative">
        <GradientBlob className="opacity-20 fixed" />
        
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Governance & Voting</h1>
            <p className="text-gray-600 dark:text-gray-400">Have your say in shaping the future of our cooperative</p>
          </header>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Vote className="h-5 w-5 text-purple-600" />
                  Your Voting Power
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{userTokens} tokens</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">1 token = 1 vote</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Active Proposals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{activeProposals}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Out of {totalProposals} total</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Participation Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{participation}%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Of cooperative members</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Next Deadline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">Nov 23</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Educational Loans proposal</p>
              </CardContent>
            </Card>
          </div>

          {/* Proposals Tabs */}
          <div className="mb-8">
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                <TabsTrigger value="active" className="flex items-center gap-2">
                  <Hourglass className="h-4 w-4" />
                  Active Proposals
                </TabsTrigger>
                <TabsTrigger value="past" className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Past Proposals
                </TabsTrigger>
              </TabsList>

              {/* Active Proposals */}
              <TabsContent value="active">
                <div className="space-y-4">
                  {proposals
                    .filter(proposal => proposal.status === 'active')
                    .map(proposal => (
                      <Card key={proposal.id} className="bg-white dark:bg-gray-800 shadow-md">
                        <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleExpandProposal(proposal.id)}>
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">{proposal.title}</CardTitle>
                            {expandedProposal === proposal.id ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                          <CardDescription className="flex items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              {proposal.category}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              Deadline: {proposal.deadline}
                            </span>
                          </CardDescription>
                        </CardHeader>
                        
                        {expandedProposal === proposal.id && (
                          <>
                            <CardContent className="pt-4">
                              <p className="text-gray-700 dark:text-gray-300 mb-4">{proposal.description}</p>
                              
                              <div className="mb-4">
                                <div className="flex justify-between mb-1 text-sm">
                                  <div className="flex items-center gap-1 font-medium text-green-600 dark:text-green-400">
                                    <Check className="h-4 w-4" />
                                    For: {proposal.votesFor}
                                  </div>
                                  <div className="flex items-center gap-1 font-medium text-red-600 dark:text-red-400">
                                    <X className="h-4 w-4" />
                                    Against: {proposal.votesAgainst}
                                  </div>
                                </div>
                                <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div 
                                    className="absolute left-0 top-0 h-full bg-green-500 dark:bg-green-600"
                                    style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                                  ></div>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-right">
                                  Total Votes: {proposal.totalVotes}
                                </p>
                              </div>

                              <div className="rounded-md bg-gray-50 dark:bg-gray-700 p-4 mb-4">
                                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Proposal Details</h4>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Proposer:</span>
                                    <span className="font-medium">{proposal.proposer}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Created:</span>
                                    <span className="font-medium">{proposal.created}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Type:</span>
                                    <span className="font-medium">{proposal.category}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>

                            <CardFooter className="flex flex-col sm:flex-row gap-2 justify-center">
                              <Button 
                                className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                                onClick={() => handleVote(proposal.id, 'for')}
                                disabled={castingVote}
                              >
                                {castingVote ? (
                                  <>
                                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                    Processing
                                  </>
                                ) : (
                                  <>
                                    <Check className="mr-2 h-4 w-4" />
                                    Vote For
                                  </>
                                )}
                              </Button>
                              <Button 
                                className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                                onClick={() => handleVote(proposal.id, 'against')}
                                disabled={castingVote}
                              >
                                {castingVote ? (
                                  <>
                                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                    Processing
                                  </>
                                ) : (
                                  <>
                                    <X className="mr-2 h-4 w-4" />
                                    Vote Against
                                  </>
                                )}
                              </Button>
                            </CardFooter>
                          </>
                        )}
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Past Proposals */}
              <TabsContent value="past">
                <div className="space-y-4">
                  {proposals
                    .filter(proposal => proposal.status === 'completed')
                    .map(proposal => (
                      <Card key={proposal.id} className="bg-white dark:bg-gray-800 shadow-md">
                        <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleExpandProposal(proposal.id)}>
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg flex items-center gap-2">
                              {proposal.result === 'passed' ? (
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                  <Check className="h-3 w-3 mr-1" />
                                  Passed
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
                                  <X className="h-3 w-3 mr-1" />
                                  Rejected
                                </span>
                              )}
                              {proposal.title}
                            </CardTitle>
                            {expandedProposal === proposal.id ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                          <CardDescription className="flex items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                              {proposal.category}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              Completed: {proposal.deadline}
                            </span>
                          </CardDescription>
                        </CardHeader>
                        
                        {expandedProposal === proposal.id && (
                          <CardContent className="pt-4">
                            <p className="text-gray-700 dark:text-gray-300 mb-4">{proposal.description}</p>
                            
                            <div className="mb-4">
                              <div className="flex justify-between mb-1 text-sm">
                                <div className="flex items-center gap-1 font-medium text-green-600 dark:text-green-400">
                                  <Check className="h-4 w-4" />
                                  For: {proposal.votesFor}
                                </div>
                                <div className="flex items-center gap-1 font-medium text-red-600 dark:text-red-400">
                                  <X className="h-4 w-4" />
                                  Against: {proposal.votesAgainst}
                                </div>
                              </div>
                              <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="absolute left-0 top-0 h-full bg-green-500 dark:bg-green-600"
                                  style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-right">
                                Total Votes: {proposal.totalVotes}
                              </p>
                            </div>

                            <div className="rounded-md bg-gray-50 dark:bg-gray-700 p-4">
                              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Proposal Details</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Proposer:</span>
                                  <span className="font-medium">{proposal.proposer}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Created:</span>
                                  <span className="font-medium">{proposal.created}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Type:</span>
                                  <span className="font-medium">{proposal.category}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Helper component for X icon
const X = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default GovernancePage;
