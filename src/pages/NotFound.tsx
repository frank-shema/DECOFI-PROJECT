
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, HelpCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import GradientBlob from '@/components/animations/GradientBlob';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-x-hidden">
      <GradientBlob className="opacity-30" />
      
      <div className="text-center space-y-4 max-w-4xl z-10 w-full px-4">
        <h1 className="text-7xl sm:text-9xl font-bold gradient-text mb-2">404</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Page Not Found</h2>
        
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          We couldn't find the page you're looking for. It might have been moved, deleted, 
          or perhaps the URL was mistyped.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button className="bg-decofi-blue hover:bg-decofi-blue/90" asChild>
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/help" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Help & Support
            </Link>
          </Button>
        </div>
        
        <div className="relative mb-6 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for something else..."
            className="pl-10 pr-4 py-2 rounded-full"
          />
        </div>
        
        <Tabs defaultValue="about" className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="about" className="text-sm">
              <Info className="h-4 w-4 mr-2" />
              About DeCoFi
            </TabsTrigger>
            <TabsTrigger value="help" className="text-sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              Quick Help
            </TabsTrigger>
            <TabsTrigger value="faq" className="text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              FAQs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="text-left bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">About DeCoFi</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              DeCoFi (Decentralized Cooperative Finance) is a blockchain-based platform that provides
              financial services to cooperative societies and SACCOs. Using the Internet Computer
              Protocol (ICP), we offer transparent, secure, and efficient financial solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/70 dark:bg-gray-700/70 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Our Mission</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  To democratize financial services by leveraging blockchain technology, 
                  making them more accessible, transparent, and community-controlled.
                </p>
              </div>
              <div className="bg-white/70 dark:bg-gray-700/70 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Key Features</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
                  <li>Transparent savings and loans</li>
                  <li>Democratic governance</li>
                  <li>Token rewards system</li>
                  <li>Secure blockchain infrastructure</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="help" className="text-left bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Quick Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Link to="/dashboard" className="flex items-center p-3 bg-white/70 dark:bg-gray-700/70 rounded-lg hover:bg-decofi-blue/10 transition-colors">
                Dashboard
              </Link>
              <Link to="/deposit-withdraw" className="flex items-center p-3 bg-white/70 dark:bg-gray-700/70 rounded-lg hover:bg-decofi-blue/10 transition-colors">
                Deposits & Withdrawals
              </Link>
              <Link to="/loans" className="flex items-center p-3 bg-white/70 dark:bg-gray-700/70 rounded-lg hover:bg-decofi-blue/10 transition-colors">
                Loans
              </Link>
              <Link to="/governance" className="flex items-center p-3 bg-white/70 dark:bg-gray-700/70 rounded-lg hover:bg-decofi-blue/10 transition-colors">
                Governance
              </Link>
              <Link to="/transactions" className="flex items-center p-3 bg-white/70 dark:bg-gray-700/70 rounded-lg hover:bg-decofi-blue/10 transition-colors">
                Transactions
              </Link>
              <Link to="/rewards" className="flex items-center p-3 bg-white/70 dark:bg-gray-700/70 rounded-lg hover:bg-decofi-blue/10 transition-colors">
                Rewards
              </Link>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Need Assistance?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-white/70 dark:bg-gray-700/70 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Contact Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Our team is available 24/7 to assist you with any questions or issues.
                </p>
                <p className="text-sm font-medium">support@decofi.network</p>
              </div>
              <div className="flex-1 bg-white/70 dark:bg-gray-700/70 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Help Center</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Visit our comprehensive help center with guides and tutorials.
                </p>
                <Button variant="secondary" size="sm" asChild>
                  <Link to="/help">Visit Help Center</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="faq" className="text-left bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Frequently Asked Questions</h3>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  What is DeCoFi and how does it work?
                </AccordionTrigger>
                <AccordionContent>
                  DeCoFi (Decentralized Cooperative Finance) is a blockchain-based platform that brings traditional 
                  cooperative financial services to the digital age. Our platform uses the Internet Computer Protocol 
                  to provide secure, transparent financial services including savings accounts, loans, and governance 
                  for community-based cooperative organizations.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  How do I create an account?
                </AccordionTrigger>
                <AccordionContent>
                  To create an account, click on the "Register" button on our homepage. You'll need to provide basic 
                  personal information, create secure credentials, and verify your identity through our secure Internet 
                  Identity verification process. If you're joining as part of a cooperative, you'll also need your 
                  cooperative's invitation code.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  How are my funds kept secure?
                </AccordionTrigger>
                <AccordionContent>
                  Your funds are secured through multiple layers of protection. We use blockchain technology to ensure 
                  transparency and immutability of records. All transactions are encrypted and processed through smart 
                  contracts. We also implement secure, password-less authentication through Internet Identity, protecting 
                  your account from unauthorized access.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  What are DeCoFi tokens and how do I earn them?
                </AccordionTrigger>
                <AccordionContent>
                  DeCoFi tokens are our platform's native reward tokens. You can earn them through various activities 
                  like regular savings, on-time loan repayments, participating in governance votes, and other community 
                  activities. These tokens can be used for voting on cooperative decisions, redeeming for rewards like 
                  reduced interest rates, and accessing premium features.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  How do loans work on DeCoFi?
                </AccordionTrigger>
                <AccordionContent>
                  Loans on DeCoFi are processed through smart contracts based on predetermined criteria set by your 
                  cooperative. Generally, you can borrow up to a multiple of your savings amount. Once approved, 
                  funds are instantly transferred to your DeCoFi wallet. Repayments are tracked on the blockchain for 
                  transparency, and timely repayments earn you DeCoFi tokens as rewards.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-6 text-center">
              <Button variant="link" asChild>
                <Link to="/help" className="text-decofi-blue hover:text-decofi-blue/90">
                  View all FAQs
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NotFound;
