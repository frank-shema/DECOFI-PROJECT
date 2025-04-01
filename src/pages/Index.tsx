import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  Shield,
  Coins,
  Users,
  Network,
  Vote,
  Award,
  Upload,
  Download,
  Clock,
  CheckCircle,
  RefreshCw,
  Check,
  TrendingUp,
  HandCoins,
  Handshake,
  CircleCheck,
  Settings,
  Rocket,
  Lightbulb,
  Globe,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingIcons from "@/components/animations/FloatingIcons";
import ParticlesNetwork from "@/components/animations/ParticlesNetwork";
import GradientBlob from "@/components/animations/GradientBlob";
import HowItWorksSection from "@/components/HowItworks";

const Index = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    features: false,
    howItWorks: false,
    testimonials: false,
    cooperatives: false,
    faq: false,
  });

  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({
    features: null,
    howItWorks: null,
    testimonials: null,
    cooperatives: null,
    faq: null,
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    Object.keys(sectionsRef.current).forEach((key) => {
      if (sectionsRef.current[key]) {
        observer.observe(sectionsRef.current[key]!);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 relative overflow-hidden">
        <ParticlesNetwork />
        <GradientBlob />
        <FloatingIcons />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-down gradient-text">
              Decentralized Cooperative Finance
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 animate-slide-down"
              style={{ animationDelay: "0.2s" }}
            >
              Empowering cooperatives and SACCOs with blockchain technology for
              transparent, secure and community-driven financial services.
            </p>
            <div
              className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-down"
              style={{ animationDelay: "0.4s" }}
            >
              <Button
                size="lg"
                className="bg-decofi-blue hover:bg-decofi-blue/90 button-glow"
                asChild
              >
                <Link to="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Scroll down indicator */}
          <div className="flex justify-center animate-pulse-slow">
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-500 dark:text-gray-400 hover:text-decofi-blue dark:hover:text-decofi-blue"
            >
              <span className="sr-only">Scroll down</span>
              <ChevronDown className="h-8 w-8" />
            </button>
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={(el) => (sectionsRef.current.about = el)}
        className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
                isVisible.about
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Who We <span className="gradient-text">Are</span>
            </h2>
            <p
              className={`text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
                isVisible.about
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              DeCoFi is a decentralized cooperative finance platform built on
              the Internet Computer Protocol (ICP). We empower savings groups,
              SACCOs, and cooperatives with secure, transparent, and efficient
              financial tools powered by blockchain technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              className={`border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md glass-card overflow-hidden transition-all duration-700 ${
                isVisible.about
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <Shield className="h-10 w-10 text-decofi-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">Why We Exist</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Traditional cooperatives and financial systems are often slow,
                  costly, and prone to mismanagement. DeCoFi eliminates these
                  inefficiencies by automating transactions, reducing fraud, and
                  enabling instant access to financial services.
                </p>
              </CardContent>
            </Card>

            <Card
              className={`border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md glass-card overflow-hidden transition-all duration-700 ${
                isVisible.about
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <HandCoins className="h-10 w-10 text-decofi-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">What We Offer</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-decofi-green mt-0.5 flex-shrink-0" />
                    <span>Blockchain-Powered Savings & Loans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-decofi-green mt-0.5 flex-shrink-0" />
                    <span>Smart Governance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-decofi-green mt-0.5 flex-shrink-0" />
                    <span>Secure Digital Wallets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-decofi-green mt-0.5 flex-shrink-0" />
                    <span>Low Transaction Fees</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className={`border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md glass-card overflow-hidden transition-all duration-700 ${
                isVisible.about
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <TrendingUp className="h-10 w-10 text-decofi-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Our Advantages</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CircleCheck className="h-5 w-5 text-decofi-green mt-0.5 flex-shrink-0" />
                    <span>Transparent, automated financial transactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheck className="h-5 w-5 text-decofi-green mt-0.5 flex-shrink-0" />
                    <span>Members vote on decisions using tokens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheck className="h-5 w-5 text-decofi-green mt-0.5 flex-shrink-0" />
                    <span>Easy deposits, withdrawals, and loan management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheck className="h-5 w-5 text-decofi-green mt-0.5 flex-shrink-0" />
                    <span>No middlemen, no hidden costs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section
        id="mission"
        ref={(el) => (sectionsRef.current.mission = el)}
        className="py-16 md:py-24 px-4 relative overflow-hidden"
      >
        <GradientBlob className="opacity-30" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
                isVisible.mission
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Our <span className="gradient-text">Mission</span>
            </h2>
            <p
              className={`text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 transition-all duration-700 delay-100 ${
                isVisible.mission
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Lightbulb className="h-6 w-6 inline-block mr-2 text-decofi-blue" />
              Empowering financial freedom through decentralized technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div
              className={`flex items-start gap-4 transition-all duration-700 ${
                isVisible.mission
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="w-12 h-12 rounded-full bg-decofi-blue/20 flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-decofi-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Increase Financial Inclusion
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Provide easy access to savings & loans for all, regardless of
                  location or economic status. Our platform is designed to be
                  accessible to everyone with a mobile device.
                </p>
              </div>
            </div>

            <div
              className={`flex items-start gap-4 transition-all duration-700 ${
                isVisible.mission
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="w-12 h-12 rounded-full bg-decofi-green/20 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-decofi-green" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Promote Transparency</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Ensure all transactions are recorded and verifiable on-chain,
                  preventing fraud and mismanagement. Every financial move is
                  visible to authorized members.
                </p>
              </div>
            </div>

            <div
              className={`flex items-start gap-4 transition-all duration-700 ${
                isVisible.mission
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="w-12 h-12 rounded-full bg-decofi-purple/20 flex items-center justify-center flex-shrink-0">
                <Settings className="h-6 w-6 text-decofi-purple" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Eliminate Inefficiencies
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use blockchain to speed up and secure cooperative finance.
                  Smart contracts automate processes that traditionally require
                  manual intervention, saving time and reducing errors.
                </p>
              </div>
            </div>

            <div
              className={`flex items-start gap-4 transition-all duration-700 ${
                isVisible.mission
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="w-12 h-12 rounded-full bg-decofi-blue/20 flex items-center justify-center flex-shrink-0">
                <Handshake className="h-6 w-6 text-decofi-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Strengthen Community Governance
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Enable cooperative members to control their finances. Through
                  token-based voting, members have a direct say in
                  decision-making, ensuring truly democratic governance.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`mt-16 text-center transition-all duration-700 delay-600 ${
              isVisible.mission
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="max-w-2xl mx-auto border border-gray-200 dark:border-gray-800 glass-card">
              <CardContent className="p-6">
                <p className="text-lg font-medium">
                  "We believe in a future where cooperative finance is truly
                  owned by the people, for the people."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={(el) => (sectionsRef.current.features = el)}
        className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
                isVisible.features
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Key Features of <span className="gradient-text">DeCoFi</span>
            </h2>
            <p
              className={`text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
                isVisible.features
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Revolutionizing cooperative finance with blockchain technology and
              decentralized governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 text-decofi-blue" />,
                title: "Secure Savings",
                description:
                  "Your deposits are securely recorded on the blockchain, making them transparent and tamper-proof.",
              },
              {
                icon: <Coins className="h-10 w-10 text-decofi-green" />,
                title: "Smart Loans",
                description:
                  "Automated loan approvals based on predefined rules, with instant fund transfers.",
              },
              {
                icon: <Vote className="h-10 w-10 text-decofi-purple" />,
                title: "Community Governance",
                description:
                  "Members vote on important decisions, ensuring cooperatives remain community-driven.",
              },
              {
                icon: <Network className="h-10 w-10 text-decofi-blue" />,
                title: "Blockchain Transparency",
                description:
                  "All transactions and records are stored on-chain, ensuring full transparency and trust.",
              },
              {
                icon: <Award className="h-10 w-10 text-decofi-green" />,
                title: "Rewards System",
                description:
                  "Earn DeCoFi tokens for saving regularly, repaying loans on time, and participating in governance.",
              },
              {
                icon: <Users className="h-10 w-10 text-decofi-purple" />,
                title: "Cooperative Ecosystem",
                description:
                  "Connect with other cooperatives and SACCOs in a growing decentralized financial ecosystem.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md glass-card overflow-hidden transition-all duration-700 delay-${
                  index * 100
                } ${
                  isVisible.features
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <CardContent className="p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* ICP Technology Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <GradientBlob className="opacity-20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powered by{" "}
              <span className="gradient-text">Internet Computer Protocol</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              DeCoFi leverages the Internet Computer Protocol (ICP) for a fully
              decentralized, secure, and efficient platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="glass-card border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-decofi-blue/20 flex items-center justify-center mr-3">
                    <RefreshCw className="h-5 w-5 text-decofi-blue" />
                  </div>
                  Smart Contracts (Canisters)
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-decofi-green mr-2 flex-shrink-0" />
                    <span>User registration & identity verification</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-decofi-green mr-2 flex-shrink-0" />
                    <span>Savings deposits & withdrawals</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-decofi-green mr-2 flex-shrink-0" />
                    <span>Loan applications & repayments</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-decofi-green mr-2 flex-shrink-0" />
                    <span>Governance (voting & decision-making)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-decofi-blue/20 flex items-center justify-center mr-3">
                    <Shield className="h-5 w-5 text-decofi-blue" />
                  </div>
                  Internet Identity Authentication
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-decofi-green mr-2 flex-shrink-0" />
                    <span>Biometrics (Face ID, Fingerprint)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-decofi-green mr-2 flex-shrink-0" />
                    <span>YubiKey or other security keys</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-decofi-green mr-2 flex-shrink-0" />
                    <span>Google & Apple login options</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-decofi-green mr-2 flex-shrink-0" />
                    <span>Password-less and phishing-resistant</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-decofi-blue/20 flex items-center justify-center mr-3">
                    <Coins className="h-5 w-5 text-decofi-blue" />
                  </div>
                  Low-Cost Transactions
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Uses ICP Cycles instead of traditional gas fees, making
                  transactions affordable for all cooperative members.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-decofi-blue/20 flex items-center justify-center mr-3">
                    <Network className="h-5 w-5 text-decofi-blue" />
                  </div>
                  On-Chain Data Storage
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  All financial transactions and cooperative records are stored
                  on-chain, ensuring tamper-proof data and full transparency.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-decofi-blue/20 flex items-center justify-center mr-3">
                    <Clock className="h-5 w-5 text-decofi-blue" />
                  </div>
                  High-Speed Transactions
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  ICP's architecture provides faster transaction speeds than
                  traditional blockchains, ensuring efficient financial
                  operations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-decofi-blue via-decofi-purple to-decofi-green text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Cooperative Finance?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-white/90">
            Join DeCoFi today and become part of the decentralized cooperative
            finance revolution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-decofi-blue hover:bg-white/90"
              asChild
            >
              <Link to="/register">Get Started</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
