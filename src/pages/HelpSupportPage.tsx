
import { useState } from 'react';
import { Search, HelpCircle, Book, MessageSquare, Phone, Mail, ChevronDown, ChevronUp, PlusCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GradientBlob from '@/components/animations/GradientBlob';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const HelpSupportPage = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Sample FAQ data
  const faqs: FAQItem[] = [
    {
      question: "What is DeCoFi?",
      answer: "DeCoFi (Decentralized Cooperative Finance) is a blockchain-based platform that provides financial services to cooperative societies and SACCOs. It uses the Internet Computer Protocol (ICP) to offer transparent, secure, and efficient financial solutions including savings, loans, and governance for community-based financial organizations.",
      category: "general"
    },
    {
      question: "How do I join DeCoFi?",
      answer: "To join DeCoFi, you need to either be a member of a registered cooperative or create an individual account. Click on the 'Get Started' button, select your registration type, provide the necessary information, and follow the verification process. You'll need to verify your identity using Internet Identity for secure, password-less authentication.",
      category: "general"
    },
    {
      question: "What are DeCoFi tokens and how do I earn them?",
      answer: "DeCoFi tokens are the platform's native tokens that can be earned through various activities such as regular savings, on-time loan repayments, and participating in governance votes. These tokens can be used for voting on cooperative decisions, redeeming rewards like reduced interest rates, and other benefits within the ecosystem.",
      category: "rewards"
    },
    {
      question: "How do loans work on DeCoFi?",
      answer: "Loans on DeCoFi are processed through smart contracts based on predetermined criteria set by your cooperative. Generally, you can borrow up to 3x of your savings amount. Once approved, funds are instantly transferred to your DeCoFi wallet. Repayments are tracked on the blockchain for transparency, and timely repayments earn you DeCoFi tokens as rewards.",
      category: "loans"
    },
    {
      question: "How secure is my money on DeCoFi?",
      answer: "DeCoFi uses blockchain technology on the Internet Computer Protocol (ICP), which provides high security through decentralization. Your funds and transactions are recorded on a tamper-proof ledger. We also implement secure, password-less authentication through Internet Identity, protecting your account from unauthorized access and phishing attacks.",
      category: "security"
    },
    {
      question: "How do I deposit money into my DeCoFi account?",
      answer: "You can deposit funds into your DeCoFi wallet through multiple channels: 1) Mobile money transfer (M-Pesa, MTN Money, etc.), 2) Bank transfer to your cooperative's linked account, or 3) Direct deposit of ICP tokens from another wallet. After making the transfer, the deposit will be reflected in your DeCoFi wallet once confirmed.",
      category: "deposits"
    },
    {
      question: "How is DeCoFi different from traditional banking apps?",
      answer: "DeCoFi differs from traditional banking apps in several ways: 1) It's built on blockchain technology, providing transparency and immutability of records, 2) It operates in a decentralized manner with no central authority, 3) Members have voting rights on important decisions through governance tokens, 4) It integrates cooperative principles with modern financial technology, and 5) It has lower operational costs, allowing for better rates for members.",
      category: "general"
    },
    {
      question: "What happens if I miss a loan repayment?",
      answer: "If you miss a loan repayment, the system will automatically send you a reminder. Depending on your cooperative's rules, you may be charged a late fee after a certain grace period. Consistently missed payments could affect your ability to take future loans or might require a review by the cooperative's loan committee. We recommend contacting support if you anticipate difficulty making a payment.",
      category: "loans"
    },
    {
      question: "How do I participate in governance decisions?",
      answer: "As a DeCoFi member, you can participate in governance by voting on proposals using your DeCoFi tokens. Each token represents one vote. You can access the governance portal from your dashboard, review active proposals, and cast your vote. Members with sufficient tokens can also create new proposals for the community to vote on.",
      category: "governance"
    },
    {
      question: "Is DeCoFi available in my country?",
      answer: "DeCoFi is designed to be accessible globally. However, availability depends on local regulations regarding cryptocurrencies and financial services. We're continuously expanding our coverage. Check our 'Supported Regions' page for the most up-to-date information, or contact our support team to inquire about availability in your specific location.",
      category: "general"
    }
  ];

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. Our team will respond to your inquiry soon.",
      });
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: ''
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
            <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get answers to your questions and connect with our support team
            </p>
          </header>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input 
                type="text" 
                placeholder="Search for help topics..." 
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Support Options Tabs */}
          <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Contact Us
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Resources
              </TabsTrigger>
            </TabsList>

            {/* FAQ Tab */}
            <TabsContent value="faq">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                
                {filteredFAQs.length > 0 ? (
                  <div className="space-y-4">
                    {filteredFAQs.map((faq, index) => (
                      <Card key={index} className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                        <div 
                          className="flex justify-between items-center p-4 cursor-pointer"
                          onClick={() => toggleFAQ(index)}
                        >
                          <h3 className="font-medium text-lg pr-8">{faq.question}</h3>
                          {expandedFAQ === index ? (
                            <ChevronUp className="h-5 w-5 flex-shrink-0 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-500" />
                          )}
                        </div>
                        <div className={`px-4 pb-4 ${expandedFAQ === index ? 'block' : 'hidden'}`}>
                          <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                            <div className="mt-2">
                              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                {faq.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      We couldn't find any FAQs matching your search.
                    </p>
                  </div>
                )}

                <div className="mt-6 flex justify-center">
                  <Button variant="outline" className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    View More FAQs
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Contact Us Tab */}
            <TabsContent value="contact">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <Card className="bg-white dark:bg-gray-800 shadow-md h-full">
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>
                        Reach out to us through these channels
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-decofi-blue mt-0.5" />
                        <div>
                          <h3 className="font-medium">Email Support</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">support@decofi.network</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Response within 24 hours</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Phone Support</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Mon-Fri, 9am-5pm EST</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Live Chat</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Available on Dashboard</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">24/7 for premium members</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-2">
                  <Card className="bg-white dark:bg-gray-800 shadow-md">
                    <CardHeader>
                      <CardTitle>Send us a Message</CardTitle>
                      <CardDescription>
                        Fill out the form below and we'll get back to you
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name"
                              name="name"
                              value={contactForm.name}
                              onChange={handleContactFormChange}
                              placeholder="Your full name"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input 
                              id="email"
                              name="email"
                              type="email"
                              value={contactForm.email}
                              onChange={handleContactFormChange}
                              placeholder="Your email address"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <Input 
                            id="subject"
                            name="subject"
                            value={contactForm.subject}
                            onChange={handleContactFormChange}
                            placeholder="What is your question about?"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <textarea 
                            id="message"
                            name="message"
                            value={contactForm.message}
                            onChange={handleContactFormChange}
                            placeholder="Please describe your issue or question in detail"
                            className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                          ></textarea>
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-decofi-blue hover:bg-decofi-blue/90"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            'Send Message'
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Book className="h-5 w-5 text-decofi-blue" />
                      Documentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Comprehensive guides and documentation on how to use DeCoFi effectively.
                    </p>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="flex items-center text-decofi-blue hover:underline gap-1">
                          <CheckCircle className="h-4 w-4" />
                          Getting Started Guide
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-decofi-blue hover:underline gap-1">
                          <CheckCircle className="h-4 w-4" />
                          User Manual
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-decofi-blue hover:underline gap-1">
                          <CheckCircle className="h-4 w-4" />
                          API Documentation
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-decofi-blue hover:underline gap-1">
                          <CheckCircle className="h-4 w-4" />
                          Smart Contract Guide
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-red-500" />
                      Tutorial Videos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Learn how to use DeCoFi with our step-by-step video tutorials.
                    </p>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="flex items-center text-decofi-blue hover:underline gap-1">
                          <Play className="h-4 w-4 text-red-500" />
                          Creating Your Account
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-decofi-blue hover:underline gap-1">
                          <Play className="h-4 w-4 text-red-500" />
                          How to Apply for a Loan
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-decofi-blue hover:underline gap-1">
                          <Play className="h-4 w-4 text-red-500" />
                          Participating in Governance
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-decofi-blue hover:underline gap-1">
                          <Play className="h-4 w-4 text-red-500" />
                          Earning and Using Tokens
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-gray-600" />
                      Articles & Blog
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Latest articles, updates, and news about DeCoFi and cooperative finance.
                    </p>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="flex items-center text-decofi-blue hover:underline gap-1">
                          <FileText className="h-4 w-4" />
                          Blockchain for Cooperatives: A New Era
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-decofi-blue hover:underline gap-1">
                          <FileText className="h-4 w-4" />
                          How DeCoFi is Transforming Microfinance
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-decofi-blue hover:underline gap-1">
                          <FileText className="h-4 w-4" />
                          Internet Computer Protocol: The Backbone of DeCoFi
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-decofi-blue hover:underline gap-1">
                          <FileText className="h-4 w-4" />
                          Community Success Stories
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Helper component for RefreshCw animation
const RefreshCw = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

// Helper component for Video icon
const Video = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
  </svg>
);

// Helper component for Play icon
const Play = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

// Helper component for FileText icon
const FileText = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

export default HelpSupportPage;
