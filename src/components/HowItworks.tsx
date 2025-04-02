"use client";

import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  HandCoins,
  Rocket,
  TrendingUp,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-10 md:py-16 px-3 bg-gray-50 dark:bg-decofi-dark"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className={`text-2xl md:text-3xl font-bold mb-2 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            How It <span className="gradient-text">Works</span>
          </h2>
          <p
            className={`text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            A step-by-step guide to using our decentralized cooperative finance
            platform
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-decofi-blue via-decofi-purple to-decofi-green transform -translate-x-1/2 hidden md:block"></div>

          <div className="relative z-10">
            {/* Step 1 - Left */}
            <div
              className={`flex flex-col md:flex-row items-center justify-center gap-4 mb-8 md:mb-12 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="md:w-5/12 md:pr-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg font-bold mb-2">Join DeCoFi</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Register with your cooperative, SACCO, or individually using
                    Internet Identity (II).
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Your account is secured with blockchain-based
                    authentication.
                  </p>
                </div>
              </div>
              <div className="flex justify-center md:w-2/12">
                <div className="w-12 h-12 rounded-full bg-decofi-blue flex items-center justify-center relative z-20 animate-pulse">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="md:w-5/12 md:pl-4 hidden md:block"></div>
            </div>

            {/* Step 2 - Right */}
            <div
              className={`flex flex-col md:flex-row items-center justify-center gap-4 mb-8 md:mb-12 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="md:w-5/12 md:pr-4 hidden md:block"></div>
              <div className="flex justify-center md:w-2/12">
                <div className="w-12 h-12 rounded-full bg-decofi-green flex items-center justify-center relative z-20 animate-pulse">
                  <HandCoins className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="md:w-5/12 md:pl-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg font-bold mb-2">
                    Save & Earn Rewards
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Deposit money into your DeCoFi wallet via mobile money, bank
                    transfer, or ICP tokens.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Earn DeCoFi tokens for consistent saving and active
                    participation.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 - Left */}
            <div
              className={`flex flex-col md:flex-row items-center justify-center gap-4 mb-8 md:mb-12 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="md:w-5/12 md:pr-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg font-bold mb-2">Apply for Loans</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Based on your savings, you can apply for loans instantly.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Smart contracts process the loan approval & disbursement
                    automatically.
                  </p>
                </div>
              </div>
              <div className="flex justify-center md:w-2/12">
                <div className="w-12 h-12 rounded-full bg-decofi-purple flex items-center justify-center relative z-20 animate-pulse">
                  <Rocket className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="md:w-5/12 md:pl-4 hidden md:block"></div>
            </div>

            {/* Step 4 - Right */}
            <div
              className={`flex flex-col md:flex-row items-center justify-center gap-4 mb-8 md:mb-12 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="md:w-5/12 md:pr-4 hidden md:block"></div>
              <div className="flex justify-center md:w-2/12">
                <div className="w-12 h-12 rounded-full bg-decofi-blue flex items-center justify-center relative z-20 animate-pulse">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="md:w-5/12 md:pl-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg font-bold mb-2">
                    Repay & Build Credit
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Loan repayments are automatically tracked on the blockchain.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Members with good repayment history receive lower interest
                    rates & higher loan limits.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 - Left */}
            <div
              className={`flex flex-col md:flex-row items-center justify-center gap-4 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <div className="md:w-5/12 md:pr-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg font-bold mb-2">
                    Participate in Governance
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Use your DeCoFi tokens to vote on cooperative policies,
                    interest rates, and governance decisions.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Every member has a voice, ensuring decentralized financial
                    democracy.
                  </p>
                </div>
              </div>
              <div className="flex justify-center md:w-2/12">
                <div className="w-12 h-12 rounded-full bg-decofi-green flex items-center justify-center relative z-20 animate-pulse">
                  <Globe className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="md:w-5/12 md:pl-4 hidden md:block"></div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button
            size="sm"
            className="bg-decofi-blue hover:bg-decofi-blue/90 transition-transform duration-300 hover:scale-105"
            asChild
          >
            <Link to="/register">
              Get Started
              <ArrowRight className="ml-2 h-3 w-3 animate-bounce-x" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
