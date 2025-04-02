
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PiggyBank, TrendingUp, Wallet, ArrowRight } from 'lucide-react';
import { FinancialRecommendations as RecommendationsType } from '@/services/financialAdvisorService';

interface FinancialRecommendationsProps {
  recommendations: RecommendationsType | null;
  isLoading: boolean;
}

const FinancialRecommendations: React.FC<FinancialRecommendationsProps> = ({
  recommendations,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-4 items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-decofi-blue"></div>
        <p className="text-gray-600 dark:text-gray-400">Generating your personalized recommendations...</p>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No recommendations available. Please update your financial profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Card */}
      <Card className="bg-white dark:bg-gray-800 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-decofi-blue" />
            Financial Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">{recommendations.summary}</p>
        </CardContent>
      </Card>

      {/* Savings Recommendations */}
      <Card className="bg-white dark:bg-gray-800 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-green-600" />
            Savings Recommendations
          </CardTitle>
          <CardDescription>Optimizing your savings strategy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings Target</p>
              <p className="text-2xl font-bold">${recommendations.savingsRecommendations.monthlySavingsTarget}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Fund Target</p>
              <p className="text-2xl font-bold">${recommendations.savingsRecommendations.emergencyFundTarget.toLocaleString()}</p>
            </div>
          </div>

          {recommendations.savingsRecommendations.debtReductionStrategy && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-4 rounded-lg">
              <p className="font-medium text-amber-800 dark:text-amber-300">Debt Reduction Strategy</p>
              <p className="text-amber-700 dark:text-amber-400 mt-1">{recommendations.savingsRecommendations.debtReductionStrategy}</p>
            </div>
          )}

          <div className="space-y-4 mt-4">
            <h4 className="font-medium">Recommended Savings Products</h4>
            {recommendations.savingsRecommendations.savingsProducts.map((product, index) => (
              <div key={index} className={`p-4 rounded-lg border ${product.recommended ? 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{product.name}</h5>
                      {product.recommended && (
                        <Badge className="bg-green-600 text-white hover:bg-green-700">Recommended</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{product.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-green-600">{product.interestRate}%</span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Interest Rate</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Recommendations */}
      <Card className="bg-white dark:bg-gray-800 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Investment Recommendations
          </CardTitle>
          <CardDescription>Suggested portfolio allocation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-8 flex rounded-lg overflow-hidden">
            {recommendations.investmentRecommendations.map((investment, index) => (
              <div 
                key={index}
                className={`h-full ${getRiskColorClass(investment.riskLevel)}`}
                style={{ width: `${investment.allocation}%` }}
                title={`${investment.type}: ${investment.allocation}%`}
              />
            ))}
          </div>
          
          <div className="space-y-4">
            {recommendations.investmentRecommendations.map((investment, index) => (
              <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getRiskColorClass(investment.riskLevel)}`}></div>
                    <h5 className="font-medium">{investment.type}</h5>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{investment.allocation}%</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{investment.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <Badge className={getRiskBadgeClass(investment.riskLevel)}>
                    {investment.riskLevel.charAt(0).toUpperCase() + investment.riskLevel.slice(1)} Risk
                  </Badge>
                  <span className="text-sm">Expected Return: <span className="font-medium">{investment.expectedReturn}%</span></span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-white dark:bg-gray-800 shadow-md">
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendations.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="bg-decofi-blue text-white rounded-full min-w-6 h-6 flex items-center justify-center mt-0.5">
                  {index + 1}
                </div>
                <span className="text-gray-700 dark:text-gray-300">{step}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Schedule Financial Consultation</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Helper functions for color classes
function getRiskColorClass(riskLevel: string): string {
  switch (riskLevel) {
    case 'low':
      return 'bg-blue-500';
    case 'medium':
      return 'bg-green-500';
    case 'high':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
}

function getRiskBadgeClass(riskLevel: string): string {
  switch (riskLevel) {
    case 'low':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'medium':
      return 'bg-green-500 hover:bg-green-600';
    case 'high':
      return 'bg-purple-500 hover:bg-purple-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
}

export default FinancialRecommendations;
