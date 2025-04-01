
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const SavingsPlans = () => {
  const plans = [
    {
      name: "Flexible Savings",
      badge: "Most Popular",
      description: "Perfect for those who want easy access to their funds",
      interest: "3%",
      minDeposit: "$5",
      term: "No fixed term",
      features: [
        "Withdraw anytime without penalties",
        "Add funds at your convenience",
        "Earn DeCoFi tokens for each month saved",
        "Interest paid monthly",
        "No minimum balance requirements",
        "No management fees"
      ],
      color: "decofi-blue"
    },
    {
      name: "Goal Savings",
      badge: "Best Value",
      description: "Ideal for saving towards specific financial goals",
      interest: "4%",
      minDeposit: "$50",
      term: "Minimum 6 months",
      features: [
        "Set specific saving goals and timeframes",
        "Higher interest rate than flexible savings",
        "Progress tracking and visualization",
        "Bonus rewards upon goal completion",
        "Partial emergency withdrawals permitted",
        "Automated savings option available"
      ],
      color: "green-600"
    },
    {
      name: "Fixed Term Deposit",
      badge: "Highest Returns",
      description: "Maximize your returns with a locked savings commitment",
      interest: "5%",
      minDeposit: "$200",
      term: "12-24 months",
      features: [
        "Best interest rate available",
        "Extra DeCoFi token rewards",
        "Guaranteed returns",
        "Automatic renewal option",
        "Priority access to premium loans",
        "Bonus governance voting power"
      ],
      color: "purple-600"
    }
  ];

  return (
    <div>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto text-center">
        Choose the savings plan that best fits your financial goals. All plans include blockchain security, transparency, and DeCoFi token rewards.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800 shadow-md border-t-4" style={{ borderTopColor: `var(--${plan.color})` }}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                {plan.badge && (
                  <Badge className={`bg-${plan.color} text-white hover:bg-${plan.color}/90`}>
                    {plan.badge}
                  </Badge>
                )}
              </div>
              <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-4xl font-bold">{plan.interest}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Annual Interest Rate</p>
              </div>
              
              <div className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700 pb-4">
                <span className="text-gray-600 dark:text-gray-400">Minimum Deposit</span>
                <span className="font-semibold">{plan.minDeposit}</span>
              </div>
              
              <div className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700 pb-4">
                <span className="text-gray-600 dark:text-gray-400">Term Period</span>
                <span className="font-semibold">{plan.term}</span>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">Plan Features:</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className={`h-5 w-5 flex-shrink-0 text-${plan.color}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className={`w-full bg-${plan.color} hover:bg-${plan.color}/90`} asChild>
                <Link to="/register">Choose This Plan</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavingsPlans;
