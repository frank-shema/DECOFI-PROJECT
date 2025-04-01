
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Wallet, CreditCard, Vote, History, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GradientBlob from '@/components/animations/GradientBlob';

const DashboardPage = () => {
  const [balance, setBalance] = useState(1250.75);
  const [savings, setSavings] = useState(875.50);
  const [loanBalance, setLoanBalance] = useState(500);
  const [rewards, setRewards] = useState(120);

  // Sample transaction data
  const recentTransactions = [
    { id: 1, type: 'deposit', amount: 250, date: '2023-11-15', status: 'completed' },
    { id: 2, type: 'loan repayment', amount: -100, date: '2023-11-12', status: 'completed' },
    { id: 3, type: 'withdrawal', amount: -50, date: '2023-11-10', status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-decofi-dark pt-16">
      <Navbar />
      <div className="relative">
        <GradientBlob className="opacity-20 fixed" />
        
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back, Member</h1>
            <p className="text-gray-600 dark:text-gray-400">Your cooperative finance, simplified and secured.</p>
          </header>

          {/* Account Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-decofi-blue" />
                  Total Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
                <p className="text-sm text-green-600 dark:text-green-400">+2.5% this month</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">${savings.toFixed(2)}</p>
                <p className="text-sm text-green-600 dark:text-green-400">+5% interest rate</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-orange-500" />
                  Loan Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">${loanBalance.toFixed(2)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Next payment: Dec 1</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Vote className="h-5 w-5 text-purple-600" />
                  DeCoFi Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{rewards} tokens</p>
                <p className="text-sm text-green-600 dark:text-green-400">+10 new rewards</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="bg-decofi-blue hover:bg-decofi-blue/90 h-auto py-6 flex flex-col items-center gap-2" asChild>
                <Link to="/deposit-withdraw">
                  <Wallet className="h-6 w-6" />
                  <span>Deposit</span>
                </Link>
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 h-auto py-6 flex flex-col items-center gap-2" asChild>
                <Link to="/deposit-withdraw">
                  <ArrowUpRight className="h-6 w-6" />
                  <span>Withdraw</span>
                </Link>
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 h-auto py-6 flex flex-col items-center gap-2" asChild>
                <Link to="/loans">
                  <CreditCard className="h-6 w-6" />
                  <span>Apply for Loan</span>
                </Link>
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 h-auto py-6 flex flex-col items-center gap-2" asChild>
                <Link to="/governance">
                  <Vote className="h-6 w-6" />
                  <span>Vote</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <Button variant="outline" asChild>
                <Link to="/transactions">View All</Link>
              </Button>
            </div>
            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-4">
                      <div>
                        <p className="font-semibold capitalize">{transaction.type}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.date}</p>
                      </div>
                      <div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                            </p>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-64">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Transaction Details</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Status: <span className="capitalize">{transaction.status}</span>
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                ID: {transaction.id.toString().padStart(6, '0')}
                              </p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-right capitalize">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
                <Link to="/transactions" className="text-decofi-blue dark:text-decofi-blue hover:underline text-sm font-medium flex items-center gap-1">
                  <History className="h-4 w-4" />
                  View all transaction history
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
