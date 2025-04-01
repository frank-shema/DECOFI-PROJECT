
import { useState } from 'react';
import { Wallet, ArrowDown, ArrowUp, RefreshCw, CreditCard, Smartphone, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GradientBlob from '@/components/animations/GradientBlob';

const DepositWithdrawPage = () => {
  const [amount, setAmount] = useState('');
  const [depositMethod, setDepositMethod] = useState('mobile');
  const [withdrawMethod, setWithdrawMethod] = useState('mobile');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Deposit Initiated",
        description: `Your deposit of $${amount} via ${getMethodName(depositMethod)} is being processed.`,
      });
      setAmount('');
    }, 1500);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Withdrawal Initiated",
        description: `Your withdrawal of $${amount} via ${getMethodName(withdrawMethod)} is being processed.`,
      });
      setAmount('');
    }, 1500);
  };

  const getMethodName = (method: string) => {
    switch (method) {
      case 'mobile': return 'Mobile Money';
      case 'bank': return 'Bank Transfer';
      case 'icp': return 'ICP Tokens';
      default: return method;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'mobile': return <Smartphone className="h-5 w-5" />;
      case 'bank': return <Building className="h-5 w-5" />;
      case 'icp': return <CreditCard className="h-5 w-5" />;
      default: return <Wallet className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-decofi-dark pt-16">
      <Navbar />
      <div className="relative">
        <GradientBlob className="opacity-20 fixed" />
        
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Deposit & Withdraw</h1>
            <p className="text-gray-600 dark:text-gray-400">Securely manage your funds on DeCoFi</p>
          </header>

          <div className="max-w-xl mx-auto">
            <Tabs defaultValue="deposit" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="deposit" className="flex items-center gap-2">
                  <ArrowDown className="h-4 w-4" />
                  Deposit
                </TabsTrigger>
                <TabsTrigger value="withdraw" className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4" />
                  Withdraw
                </TabsTrigger>
              </TabsList>

              {/* Deposit Tab */}
              <TabsContent value="deposit">
                <Card>
                  <CardHeader>
                    <CardTitle>Deposit Funds</CardTitle>
                    <CardDescription>Add money to your DeCoFi wallet</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDepositSubmit}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="deposit-amount">Amount (USD)</Label>
                          <Input 
                            id="deposit-amount" 
                            type="number" 
                            placeholder="Enter amount" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            min="1"
                            step="0.01"
                          />
                        </div>

                        <div>
                          <Label htmlFor="deposit-method">Deposit Method</Label>
                          <div className="grid grid-cols-3 gap-4 mt-2">
                            <Button 
                              type="button"
                              variant={depositMethod === 'mobile' ? 'default' : 'outline'} 
                              className={`flex flex-col items-center justify-center h-24 ${depositMethod === 'mobile' ? 'bg-decofi-blue hover:bg-decofi-blue/90' : ''}`}
                              onClick={() => setDepositMethod('mobile')}
                            >
                              <Smartphone className="h-8 w-8 mb-2" />
                              <span>Mobile Money</span>
                            </Button>
                            <Button 
                              type="button"
                              variant={depositMethod === 'bank' ? 'default' : 'outline'} 
                              className={`flex flex-col items-center justify-center h-24 ${depositMethod === 'bank' ? 'bg-decofi-blue hover:bg-decofi-blue/90' : ''}`}
                              onClick={() => setDepositMethod('bank')}
                            >
                              <Building className="h-8 w-8 mb-2" />
                              <span>Bank Transfer</span>
                            </Button>
                            <Button 
                              type="button"
                              variant={depositMethod === 'icp' ? 'default' : 'outline'} 
                              className={`flex flex-col items-center justify-center h-24 ${depositMethod === 'icp' ? 'bg-decofi-blue hover:bg-decofi-blue/90' : ''}`}
                              onClick={() => setDepositMethod('icp')}
                            >
                              <CreditCard className="h-8 w-8 mb-2" />
                              <span>ICP Tokens</span>
                            </Button>
                          </div>
                        </div>

                        {depositMethod === 'mobile' && (
                          <div>
                            <Label htmlFor="phone-number">Phone Number</Label>
                            <Input id="phone-number" type="tel" placeholder="Enter your mobile money number" required />
                          </div>
                        )}
                        
                        {depositMethod === 'bank' && (
                          <div className="rounded-md bg-blue-50 dark:bg-blue-900/30 p-4">
                            <h4 className="font-medium text-blue-800 dark:text-blue-300">Bank Transfer Details</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Transfer to these account details, then click "Confirm Deposit".</p>
                            <div className="mt-2 space-y-1 text-sm">
                              <p><span className="font-medium">Bank:</span> DeCoFi Cooperative Bank</p>
                              <p><span className="font-medium">Account Name:</span> DeCoFi Platform</p>
                              <p><span className="font-medium">Account Number:</span> 12345678900</p>
                              <p><span className="font-medium">Reference:</span> Your DeCoFi ID</p>
                            </div>
                          </div>
                        )}
                        
                        {depositMethod === 'icp' && (
                          <div className="rounded-md bg-purple-50 dark:bg-purple-900/30 p-4">
                            <h4 className="font-medium text-purple-800 dark:text-purple-300">ICP Token Details</h4>
                            <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">Send ICP tokens to this address:</p>
                            <div className="mt-2 text-sm font-mono bg-purple-100 dark:bg-purple-900/50 p-2 rounded break-all">
                              abcde-fghij-klmno-pqrst-uvwxy-zabcd-efghi-jklmn-opqrs-tuvw
                            </div>
                          </div>
                        )}
                      </div>

                      <Button className="w-full mt-6 bg-decofi-blue hover:bg-decofi-blue/90" type="submit" disabled={!amount || isProcessing}>
                        {isProcessing ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Processing
                          </>
                        ) : (
                          <>
                            <ArrowDown className="mr-2 h-4 w-4" />
                            Confirm Deposit
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Withdraw Tab */}
              <TabsContent value="withdraw">
                <Card>
                  <CardHeader>
                    <CardTitle>Withdraw Funds</CardTitle>
                    <CardDescription>Transfer money from your DeCoFi wallet</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleWithdrawSubmit}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="withdraw-amount">Amount (USD)</Label>
                          <Input 
                            id="withdraw-amount" 
                            type="number" 
                            placeholder="Enter amount" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            min="1"
                            step="0.01"
                          />
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Available balance: $1,250.75</p>
                        </div>

                        <div>
                          <Label htmlFor="withdraw-method">Withdrawal Method</Label>
                          <div className="grid grid-cols-3 gap-4 mt-2">
                            <Button 
                              type="button"
                              variant={withdrawMethod === 'mobile' ? 'default' : 'outline'} 
                              className={`flex flex-col items-center justify-center h-24 ${withdrawMethod === 'mobile' ? 'bg-decofi-blue hover:bg-decofi-blue/90' : ''}`}
                              onClick={() => setWithdrawMethod('mobile')}
                            >
                              <Smartphone className="h-8 w-8 mb-2" />
                              <span>Mobile Money</span>
                            </Button>
                            <Button 
                              type="button"
                              variant={withdrawMethod === 'bank' ? 'default' : 'outline'} 
                              className={`flex flex-col items-center justify-center h-24 ${withdrawMethod === 'bank' ? 'bg-decofi-blue hover:bg-decofi-blue/90' : ''}`}
                              onClick={() => setWithdrawMethod('bank')}
                            >
                              <Building className="h-8 w-8 mb-2" />
                              <span>Bank Transfer</span>
                            </Button>
                            <Button 
                              type="button"
                              variant={withdrawMethod === 'icp' ? 'default' : 'outline'} 
                              className={`flex flex-col items-center justify-center h-24 ${withdrawMethod === 'icp' ? 'bg-decofi-blue hover:bg-decofi-blue/90' : ''}`}
                              onClick={() => setWithdrawMethod('icp')}
                            >
                              <CreditCard className="h-8 w-8 mb-2" />
                              <span>ICP Tokens</span>
                            </Button>
                          </div>
                        </div>

                        {withdrawMethod === 'mobile' && (
                          <div>
                            <Label htmlFor="mobile-number">Mobile Money Number</Label>
                            <Input id="mobile-number" type="tel" placeholder="Enter recipient mobile money number" required />
                          </div>
                        )}
                        
                        {withdrawMethod === 'bank' && (
                          <div>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="bank-name">Bank Name</Label>
                                <Input id="bank-name" placeholder="Enter bank name" required />
                              </div>
                              <div>
                                <Label htmlFor="account-number">Account Number</Label>
                                <Input id="account-number" placeholder="Enter account number" required />
                              </div>
                              <div>
                                <Label htmlFor="account-name">Account Holder Name</Label>
                                <Input id="account-name" placeholder="Enter account holder name" required />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {withdrawMethod === 'icp' && (
                          <div>
                            <Label htmlFor="icp-address">ICP Wallet Address</Label>
                            <Input id="icp-address" placeholder="Enter your ICP wallet address" required />
                          </div>
                        )}
                      </div>

                      <Button className="w-full mt-6 bg-decofi-blue hover:bg-decofi-blue/90" type="submit" disabled={!amount || isProcessing}>
                        {isProcessing ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Processing
                          </>
                        ) : (
                          <>
                            <ArrowUp className="mr-2 h-4 w-4" />
                            Confirm Withdrawal
                          </>
                        )}
                      </Button>
                    </form>
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

export default DepositWithdrawPage;
