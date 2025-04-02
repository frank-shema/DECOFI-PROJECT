
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  PiggyBank, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Gift, 
  ChevronRight, 
  Calendar,
  BadgeDollarSign
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GradientBlob from '@/components/animations/GradientBlob';
import SavingsCalculator from '@/components/savings/SavingsCalculator';
import SavingsPlans from '@/components/savings/SavingsPlans';

const SavingsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const savingsBenefits = [
    {
      icon: <TrendingUp className="h-12 w-12 text-decofi-blue p-2" />,
      title: "Competitive Returns",
      description: "Earn up to 5% annual interest on your savings, outperforming traditional banks."
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-green-600 p-2" />,
      title: "Blockchain Security",
      description: "Your savings are secured by blockchain technology, ensuring transparency and immutability."
    },
    {
      icon: <Users className="h-12 w-12 text-purple-600 p-2" />,
      title: "Community Power",
      description: "Your savings strengthen the cooperative, enabling others to access affordable loans."
    },
    {
      icon: <Gift className="h-12 w-12 text-orange-500 p-2" />,
      title: "Rewards & Bonuses",
      description: "Earn DeCoFi tokens for consistent saving habits, unlocking governance rights."
    },
    {
      icon: <Calendar className="h-12 w-12 text-indigo-600 p-2" />,
      title: "Flexible Terms",
      description: "Choose from various saving plans that suit your financial goals and timeline."
    },
    {
      icon: <BadgeDollarSign className="h-12 w-12 text-pink-600 p-2" />,
      title: "Zero Hidden Fees",
      description: "Transparent fee structure with no maintenance or surprise charges."
    }
  ];

  const faqs = [
    {
      question: "How do I start saving with DeCoFi?",
      answer: "To begin saving with DeCoFi, simply register for an account, complete the KYC verification, and make your first deposit through mobile money, bank transfer, or ICP tokens."
    },
    {
      question: "What interest rates do you offer?",
      answer: "DeCoFi offers competitive interest rates ranging from 3% to 5% annually, depending on your chosen saving plan and commitment period."
    },
    {
      question: "How is my money secured?",
      answer: "Your savings are secured through blockchain technology using smart contracts. All transactions are transparent and immutable, with multi-signature security protocols in place."
    },
    {
      question: "Can I withdraw my savings anytime?",
      answer: "Yes, for flexible savings plans. Fixed-term savings may have predefined withdrawal periods. Emergency withdrawals are always possible but may affect your earned interest."
    },
    {
      question: "How do I earn DeCoFi tokens?",
      answer: "You earn DeCoFi tokens based on your saving consistency, the amount saved, and your participation in the community. These tokens grant you governance rights and additional benefits."
    },
    {
      question: "Is there a minimum saving amount?",
      answer: "The minimum saving amount is $5 or equivalent, making it accessible to everyone regardless of financial capacity."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-decofi-dark pt-16">
      <Navbar />
      <div className="relative">
        <GradientBlob className="opacity-20 fixed" />
        
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="mb-16 text-center">
            <Badge className="mb-4 bg-decofi-blue/10 text-decofi-blue hover:bg-decofi-blue/20 px-4 py-1 text-sm">Secure Saving Solutions</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Smart Savings for <span className="gradient-text">Tomorrow's Prosperity</span></h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              DeCoFi transforms how you save by combining the power of community with blockchain technology, offering better returns and complete transparency.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-decofi-blue hover:bg-decofi-blue/90 text-lg px-8 py-6 h-auto" asChild>
                <Link to="/register">Start Saving Now</Link>
              </Button>
              <Button variant="outline" className="text-lg px-8 py-6 h-auto" asChild>
                <Link to="#calculator">Calculate Returns</Link>
              </Button>
            </div>
          </section>

          {/* Tabs Section */}
          <Tabs defaultValue="overview" className="mb-16" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 md:w-fit md:grid-cols-none md:flex">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="plans">Saving Plans</TabsTrigger>
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {savingsBenefits.map((benefit, index) => (
                  <Card key={index} className="bg-white dark:bg-gray-800 shadow-md transition-all hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-2">
                        {benefit.icon}
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-16">
                <h2 className="text-3xl font-bold mb-6 text-center">How Our Savings Work</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="relative">
                    <div className="absolute -top-5 -left-5 bg-decofi-blue text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">1</div>
                    <Card className="h-full bg-white dark:bg-gray-800 shadow-md">
                      <CardHeader>
                        <CardTitle>Deposit Funds</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <PiggyBank className="h-16 w-16 mx-auto mb-4 text-decofi-blue" />
                        <p className="text-gray-600 dark:text-gray-400">Make deposits via mobile money, bank transfer, or ICP tokens into your secure DeCoFi wallet.</p>
                      </CardContent>
                    </Card>
                    <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <ChevronRight className="h-8 w-8 text-decofi-blue" />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -top-5 -left-5 bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">2</div>
                    <Card className="h-full bg-white dark:bg-gray-800 shadow-md">
                      <CardHeader>
                        <CardTitle>Smart Contracts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ShieldCheck className="h-16 w-16 mx-auto mb-4 text-green-600" />
                        <p className="text-gray-600 dark:text-gray-400">Your funds are managed by secure smart contracts, automatically earning interest on the blockchain.</p>
                      </CardContent>
                    </Card>
                    <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <ChevronRight className="h-8 w-8 text-decofi-blue" />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -top-5 -left-5 bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">3</div>
                    <Card className="h-full bg-white dark:bg-gray-800 shadow-md">
                      <CardHeader>
                        <CardTitle>Earn & Grow</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <TrendingUp className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                        <p className="text-gray-600 dark:text-gray-400">Watch your savings grow with competitive interest rates and earn DeCoFi tokens as rewards.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="plans" className="mt-6">
              <SavingsPlans />
            </TabsContent>

            <TabsContent value="calculator" id="calculator" className="mt-6">
              <SavingsCalculator />
            </TabsContent>
          </Tabs>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-decofi-blue to-blue-600 text-white rounded-xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to start your saving journey?</h2>
                <p className="text-blue-100 max-w-xl">
                  Join thousands of members who are building a secure financial future with DeCoFi's blockchain-powered savings platform.
                </p>
              </div>
              <Button size="lg" className="bg-white text-decofi-blue hover:bg-blue-50 text-lg px-8 py-6 h-auto whitespace-nowrap" asChild>
                <Link to="/register">Open Account</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SavingsPage;
