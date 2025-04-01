
import { useState } from 'react';
import { Users, CreditCard, BarChart3, PiggyBank, MessageSquare, ShieldCheck, UserPlus, Settings, RefreshCw, AlertTriangle, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GradientBlob from '@/components/animations/GradientBlob';

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const { toast } = useToast();

  // Sample data for UI
  const cooperativeStats = {
    totalMembers: 526,
    activeLoansTaken: 124,
    savingsBalance: 587450,
    totalLoansValue: 231500,
    averageInterestRate: 5.2,
    repaymentRate: 97.5
  };

  // Sample pending members data
  const pendingMembers = [
    { id: 1, name: 'Jane Smith', email: 'jane.smith@example.com', joinDate: '2023-11-12', status: 'pending_verification' },
    { id: 2, name: 'John Doe', email: 'john.doe@example.com', joinDate: '2023-11-14', status: 'pending_verification' },
    { id: 3, name: 'Alice Johnson', email: 'alice.j@example.com', joinDate: '2023-11-15', status: 'pending_documents' }
  ];

  // Sample pending loans data
  const pendingLoans = [
    { id: 'L12345', member: 'David Wilson', amount: 2500, purpose: 'Business Expansion', date: '2023-11-13', status: 'pending_approval' },
    { id: 'L12346', member: 'Sarah Brown', amount: 1000, purpose: 'Education', date: '2023-11-14', status: 'pending_approval' },
    { id: 'L12347', member: 'Michael Lee', amount: 5000, purpose: 'Home Improvement', date: '2023-11-15', status: 'pending_documents' }
  ];

  // Sample monthly savings and loans data for chart
  const monthlyData = [
    { month: 'Jan', savings: 42500, loans: 18500 },
    { month: 'Feb', savings: 45000, loans: 20000 },
    { month: 'Mar', savings: 48000, loans: 22500 },
    { month: 'Apr', savings: 47500, loans: 19500 },
    { month: 'May', savings: 51000, loans: 24000 },
    { month: 'Jun', savings: 53500, loans: 26500 },
    { month: 'Jul', savings: 56000, loans: 23000 },
    { month: 'Aug', savings: 58500, loans: 25000 },
    { month: 'Sep', savings: 60000, loans: 28000 },
    { month: 'Oct', savings: 62500, loans: 30000 },
    { month: 'Nov', savings: 65000, loans: 32000 },
  ];

  // Handle member approval
  const handleApproveMember = (memberId: number) => {
    setIsApproving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsApproving(false);
      toast({
        title: "Member Approved",
        description: `Member ID #${memberId} has been successfully approved and added to the cooperative.`,
      });
    }, 1500);
  };

  // Handle loan approval
  const handleApproveLoan = (loanId: string) => {
    setIsApproving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsApproving(false);
      toast({
        title: "Loan Approved",
        description: `Loan #${loanId} has been approved and funds will be disbursed to the member.`,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-decofi-dark pt-16">
      <Navbar />
      <div className="relative">
        <GradientBlob className="opacity-20 fixed" />
        
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your cooperative and members</p>
          </header>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-decofi-blue" />
                  Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold">{cooperativeStats.totalMembers}</p>
                    <p className="text-sm text-green-600 dark:text-green-400">+12 this month</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8">
                      <UserPlus className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">Add Member</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <Users className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">View All</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-green-600" />
                  Total Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold">${(cooperativeStats.savingsBalance).toLocaleString()}</p>
                    <p className="text-sm text-green-600 dark:text-green-400">+$15,250 this month</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8">
                    <BarChart3 className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:ml-2">Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  Active Loans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold">{cooperativeStats.activeLoansTaken}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Value: ${(cooperativeStats.totalLoansValue).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">Approve</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      <BarChart3 className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">Analytics</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Loan Repayment and Savings Rate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  Loan Repayment Rate
                </CardTitle>
                <CardDescription>
                  Current performance of loan repayments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Repayment Rate:</span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">{cooperativeStats.repaymentRate}%</span>
                </div>
                <Progress value={cooperativeStats.repaymentRate} className="h-2 mb-4" />
                <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-3 flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-green-800 dark:text-green-300">Excellent Repayment Performance</h4>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                      The cooperative's repayment rate is above the industry average of 92%. This indicates strong financial health and member reliability.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Loan to Savings Ratio
                </CardTitle>
                <CardDescription>
                  Balance between loans and savings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[160px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">39%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Current ratio of loans to savings
                    </p>
                  </div>
                </div>
                <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-3 flex items-start">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Healthy Balance</h4>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                      The ideal ratio is between 30-50%. Your cooperative is maintaining a healthy balance between lending and maintaining sufficient liquidity.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Management Tabs */}
          <div className="mb-8">
            <Tabs defaultValue="members" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md mb-8">
                <TabsTrigger value="members" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Member Requests
                </TabsTrigger>
                <TabsTrigger value="loans" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Loan Approvals
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Member Requests Tab */}
              <TabsContent value="members">
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>New Member Requests</CardTitle>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input 
                          type="text" 
                          placeholder="Search members..." 
                          className="pl-10 h-9"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <CardDescription>
                      Review and approve new member applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Name</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Date</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Status</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingMembers.length > 0 ? (
                            pendingMembers
                              .filter(member => 
                                member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                member.email.toLowerCase().includes(searchTerm.toLowerCase())
                              )
                              .map((member) => (
                                <tr 
                                  key={member.id} 
                                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
                                >
                                  <td className="py-3 px-4">
                                    <div className="flex items-center">
                                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                                        <span className="text-sm font-medium">{member.name.charAt(0)}</span>
                                      </div>
                                      <span className="font-medium">{member.name}</span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                    {member.email}
                                  </td>
                                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                    {member.joinDate}
                                  </td>
                                  <td className="py-3 px-4">
                                    <HoverCard>
                                      <HoverCardTrigger asChild>
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                          member.status === 'pending_verification' 
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                                        }`}>
                                          {member.status === 'pending_verification' ? 'Pending Verification' : 'Pending Documents'}
                                        </span>
                                      </HoverCardTrigger>
                                      <HoverCardContent className="w-80">
                                        <div className="space-y-2">
                                          <h4 className="font-medium">{member.status === 'pending_verification' ? 'Identity Verification Required' : 'Additional Documents Required'}</h4>
                                          <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {member.status === 'pending_verification' 
                                              ? 'This member needs identity verification before approval. Check government ID and proof of address.' 
                                              : 'Member needs to submit additional documents: proof of income and cooperative membership form.'}
                                          </p>
                                        </div>
                                      </HoverCardContent>
                                    </HoverCard>
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button size="sm" className="bg-decofi-blue hover:bg-decofi-blue/90 h-8" onClick={() => handleApproveMember(member.id)} disabled={isApproving}>
                                        {isApproving ? <RefreshCw className="h-3 w-3 animate-spin" /> : 'Approve'}
                                      </Button>
                                      <Button size="sm" variant="outline" className="h-8">
                                        <MessageSquare className="h-3 w-3" />
                                        <span className="sr-only md:not-sr-only md:ml-1">Message</span>
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="py-6 text-center text-gray-600 dark:text-gray-400">
                                No pending member requests found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Loan Approvals Tab */}
              <TabsContent value="loans">
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Pending Loan Applications</CardTitle>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input 
                          type="text" 
                          placeholder="Search loans..." 
                          className="pl-10 h-9"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <CardDescription>
                      Review and approve loan applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">ID</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Member</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Amount</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Purpose</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Status</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingLoans.length > 0 ? (
                            pendingLoans
                              .filter(loan => 
                                loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                loan.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                loan.purpose.toLowerCase().includes(searchTerm.toLowerCase())
                              )
                              .map((loan) => (
                                <tr 
                                  key={loan.id} 
                                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
                                >
                                  <td className="py-3 px-4 font-medium">
                                    {loan.id}
                                  </td>
                                  <td className="py-3 px-4">
                                    {loan.member}
                                  </td>
                                  <td className="py-3 px-4 text-right font-medium">
                                    ${loan.amount.toLocaleString()}
                                  </td>
                                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                    {loan.purpose}
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                      loan.status === 'pending_approval' 
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                                    }`}>
                                      {loan.status === 'pending_approval' ? 'Pending Approval' : 'Pending Documents'}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button size="sm" className="bg-decofi-blue hover:bg-decofi-blue/90 h-8" onClick={() => handleApproveLoan(loan.id)} disabled={isApproving}>
                                        {isApproving ? <RefreshCw className="h-3 w-3 animate-spin" /> : 'Approve'}
                                      </Button>
                                      <Button size="sm" variant="outline" className="h-8">
                                        <span className="sr-only md:not-sr-only">Details</span>
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="py-6 text-center text-gray-600 dark:text-gray-400">
                                No pending loan applications found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardHeader>
                    <CardTitle>Cooperative Settings</CardTitle>
                    <CardDescription>
                      Manage your cooperative's configuration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-4 flex items-start mb-6">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2" />
                        <div>
                          <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Admin Privileges Required</h4>
                          <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                            Changes to cooperative settings require approval from multiple admin members. Make sure to follow the governance protocol.
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="coop-name">Cooperative Name</Label>
                        <Input id="coop-name" defaultValue="DeCoFi Community Savings Cooperative" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="savings-rate">Savings Interest Rate (%)</Label>
                          <Input id="savings-rate" type="number" defaultValue="5.0" step="0.1" min="0" max="20" />
                        </div>
                        <div>
                          <Label htmlFor="loan-rate">Loan Interest Rate (%)</Label>
                          <Input id="loan-rate" type="number" defaultValue="8.5" step="0.1" min="0" max="20" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="min-savings">Minimum Savings Amount ($)</Label>
                          <Input id="min-savings" type="number" defaultValue="50" />
                        </div>
                        <div>
                          <Label htmlFor="max-loan-multiple">Maximum Loan Multiple (x of savings)</Label>
                          <Input id="max-loan-multiple" type="number" defaultValue="3" min="1" max="10" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="loan-approval">Loan Approval Process</Label>
                        <select 
                          id="loan-approval"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="automatic">Automatic (Based on Criteria)</option>
                          <option value="admin_review">Admin Review Required</option>
                          <option value="vote">Membership Vote Required</option>
                        </select>
                      </div>

                      <Button className="bg-decofi-blue hover:bg-decofi-blue/90">
                        <Settings className="mr-2 h-4 w-4" />
                        Save Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Helper components for icons
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

const Info = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export default AdminPage;
