
import { useState, useMemo } from 'react';
import { ArrowDown, ArrowUp, CreditCard, Clock, Download, Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GradientBlob from '@/components/animations/GradientBlob';

// Transaction type definition
interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'loan' | 'repayment' | 'reward';
  amount: number;
  date: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  source?: string;
  destination?: string;
  blockchainTxId?: string;
}

const TransactionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample transaction data
  const allTransactions: Transaction[] = [
    {
      id: 'TX123456',
      type: 'deposit',
      amount: 250,
      date: '2023-11-15',
      description: 'Mobile Money Deposit',
      status: 'completed',
      source: 'M-Pesa',
      blockchainTxId: 'abcd...1234'
    },
    {
      id: 'TX123457',
      type: 'loan',
      amount: 500,
      date: '2023-11-14',
      description: 'Personal Loan Disbursement',
      status: 'completed',
      destination: 'DeCoFi Wallet',
      blockchainTxId: 'efgh...5678'
    },
    {
      id: 'TX123458',
      type: 'repayment',
      amount: -100,
      date: '2023-11-12',
      description: 'Loan Repayment',
      status: 'completed',
      source: 'DeCoFi Wallet',
      blockchainTxId: 'ijkl...9012'
    },
    {
      id: 'TX123459',
      type: 'withdrawal',
      amount: -50,
      date: '2023-11-10',
      description: 'Bank Withdrawal',
      status: 'completed',
      destination: 'Bank Account',
      blockchainTxId: 'mnop...3456'
    },
    {
      id: 'TX123460',
      type: 'reward',
      amount: 10,
      date: '2023-11-08',
      description: 'Governance Participation Reward',
      status: 'completed',
      destination: 'DeCoFi Wallet',
      blockchainTxId: 'qrst...7890'
    },
    {
      id: 'TX123461',
      type: 'deposit',
      amount: 100,
      date: '2023-11-05',
      description: 'Bank Transfer Deposit',
      status: 'completed',
      source: 'Bank Account',
      blockchainTxId: 'uvwx...1234'
    },
    {
      id: 'TX123462',
      type: 'withdrawal',
      amount: -75,
      date: '2023-11-03',
      description: 'Mobile Money Withdrawal',
      status: 'pending',
      destination: 'M-Pesa',
    },
    {
      id: 'TX123463',
      type: 'reward',
      amount: 5,
      date: '2023-11-01',
      description: 'Timely Loan Repayment Reward',
      status: 'completed',
      destination: 'DeCoFi Wallet',
      blockchainTxId: 'yzab...5678'
    },
    {
      id: 'TX123464',
      type: 'deposit',
      amount: 200,
      date: '2023-10-28',
      description: 'ICP Token Deposit',
      status: 'completed',
      source: 'External Wallet',
      blockchainTxId: 'cdef...9012'
    },
    {
      id: 'TX123465',
      type: 'loan',
      amount: 300,
      date: '2023-10-25',
      description: 'Emergency Loan Disbursement',
      status: 'completed',
      destination: 'DeCoFi Wallet',
      blockchainTxId: 'ghij...3456'
    },
    {
      id: 'TX123466',
      type: 'repayment',
      amount: -50,
      date: '2023-10-22',
      description: 'Loan Repayment',
      status: 'failed',
      source: 'DeCoFi Wallet',
    },
    {
      id: 'TX123467',
      type: 'withdrawal',
      amount: -100,
      date: '2023-10-20',
      description: 'Bank Withdrawal',
      status: 'completed',
      destination: 'Bank Account',
      blockchainTxId: 'klmn...7890'
    },
  ];

  // Filter and search transactions
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(transaction => {
      // Apply type filter
      if (typeFilter && transaction.type !== typeFilter) {
        return false;
      }
      
      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          transaction.id.toLowerCase().includes(query) ||
          transaction.description.toLowerCase().includes(query) ||
          transaction.date.includes(query) ||
          transaction.amount.toString().includes(query)
        );
      }
      
      return true;
    });
  }, [allTransactions, searchQuery, typeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTransactions.slice(startIndex, endIndex);
  }, [filteredTransactions, currentPage, itemsPerPage]);

  // Type filter options
  const typeOptions = [
    { value: 'deposit', label: 'Deposits', icon: <ArrowDown className="h-4 w-4" /> },
    { value: 'withdrawal', label: 'Withdrawals', icon: <ArrowUp className="h-4 w-4" /> },
    { value: 'loan', label: 'Loans', icon: <CreditCard className="h-4 w-4" /> },
    { value: 'repayment', label: 'Repayments', icon: <CreditCard className="h-4 w-4" /> },
    { value: 'reward', label: 'Rewards', icon: <Award className="h-4 w-4" /> },
  ];

  // Handle page change
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Get transaction icon based on type
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDown className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'withdrawal':
        return <ArrowUp className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'loan':
        return <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      case 'repayment':
        return <CreditCard className="h-5 w-5 text-orange-600 dark:text-orange-400" />;
      case 'reward':
        return <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  // Get transaction status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-decofi-dark pt-16">
      <Navbar />
      <div className="relative">
        <GradientBlob className="opacity-20 fixed" />
        
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
            <p className="text-gray-600 dark:text-gray-400">View and track all your transactions on DeCoFi</p>
          </header>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                type="text" 
                placeholder="Search transactions..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {typeFilter ? `Filter: ${typeFilter}` : 'Filter by Type'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setTypeFilter(null)}>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    All Transactions
                  </span>
                </DropdownMenuItem>
                {typeOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.value} 
                    onClick={() => setTypeFilter(option.value)}
                    className={typeFilter === option.value ? 'bg-accent text-accent-foreground' : ''}
                  >
                    <span className="flex items-center gap-2">
                      {option.icon}
                      {option.label}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Transactions Table */}
          <Card className="bg-white dark:bg-gray-800 shadow-md mb-6">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Transaction</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Date</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Amount</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTransactions.length > 0 ? (
                      paginatedTransactions.map((transaction) => (
                        <tr 
                          key={transaction.id} 
                          className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
                        >
                          <td className="py-3 px-4">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="flex items-center gap-3 cursor-pointer">
                                  <div className="flex-shrink-0">
                                    {getTransactionIcon(transaction.type)}
                                  </div>
                                  <div>
                                    <p className="font-medium capitalize">{transaction.type}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.description}</p>
                                  </div>
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80">
                                <div className="space-y-2">
                                  <h4 className="font-medium">Transaction Details</h4>
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600 dark:text-gray-400">ID:</span>
                                      <span className="font-medium">{transaction.id}</span>
                                    </div>
                                    {transaction.source && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Source:</span>
                                        <span className="font-medium">{transaction.source}</span>
                                      </div>
                                    )}
                                    {transaction.destination && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Destination:</span>
                                        <span className="font-medium">{transaction.destination}</span>
                                      </div>
                                    )}
                                    {transaction.blockchainTxId && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Blockchain ID:</span>
                                        <span className="font-medium truncate max-w-[150px]">{transaction.blockchainTxId}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                            {transaction.date}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className={transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center">
                              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(transaction.status)}`}>
                                {transaction.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-gray-600 dark:text-gray-400">
                          No transactions found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {paginatedTransactions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Page</span>
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Page</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Helper component for Award icon
const Award = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

export default TransactionsPage;
