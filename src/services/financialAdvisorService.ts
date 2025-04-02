
import { getAuthenticatedApi } from "./api";

export interface FinancialProfile {
  income: number;
  expenses: number;
  savings: number;
  debt: number;
  riskTolerance: 'low' | 'medium' | 'high';
  age: number;
  goals: Array<{
    type: 'retirement' | 'house' | 'education' | 'travel' | 'other';
    targetAmount: number;
    timeframe: number; // in years
    priority: 'low' | 'medium' | 'high';
  }>;
}

export interface InvestmentRecommendation {
  type: string;
  allocation: number; // percentage
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number; // annual percentage
}

export interface SavingsRecommendation {
  monthlySavingsTarget: number;
  emergencyFundTarget: number;
  debtReductionStrategy?: string;
  savingsProducts: Array<{
    name: string;
    interestRate: number;
    description: string;
    recommended: boolean;
  }>;
}

export interface FinancialRecommendations {
  summary: string;
  investmentRecommendations: InvestmentRecommendation[];
  savingsRecommendations: SavingsRecommendation;
  nextSteps: string[];
}

// This function would normally call your backend API
// For now, we'll generate mock recommendations based on the user's financial profile
export const getFinancialRecommendations = async (
  profile: FinancialProfile
): Promise<FinancialRecommendations> => {
  // In a real implementation, this would call your backend
  // For demo purposes, we'll generate recommendations based on the profile
  
  // Calculate how much they can save monthly
  const monthlySavings = profile.income - profile.expenses;
  const debtRatio = profile.debt / profile.income;
  const emergencyFundTarget = profile.expenses * 6; // 6 months of expenses
  
  // Generate investment recommendations based on risk tolerance
  const investmentRecommendations: InvestmentRecommendation[] = [];
  
  if (profile.riskTolerance === 'low') {
    investmentRecommendations.push(
      {
        type: 'Bonds',
        allocation: 60,
        description: 'Government and high-grade corporate bonds for stable returns.',
        riskLevel: 'low',
        expectedReturn: 3.5
      },
      {
        type: 'Conservative Stocks',
        allocation: 30,
        description: 'Blue-chip stocks with stable dividend history.',
        riskLevel: 'medium',
        expectedReturn: 5.0
      },
      {
        type: 'Cash Equivalents',
        allocation: 10,
        description: 'Money market funds and short-term CDs for liquidity.',
        riskLevel: 'low',
        expectedReturn: 2.0
      }
    );
  } else if (profile.riskTolerance === 'medium') {
    investmentRecommendations.push(
      {
        type: 'Diversified Stock Portfolio',
        allocation: 60,
        description: 'Mix of growth and value stocks across various sectors.',
        riskLevel: 'medium',
        expectedReturn: 7.0
      },
      {
        type: 'Bonds',
        allocation: 30,
        description: 'Mix of government and corporate bonds.',
        riskLevel: 'low',
        expectedReturn: 3.5
      },
      {
        type: 'Alternative Investments',
        allocation: 10,
        description: 'REITs and commodity ETFs for diversification.',
        riskLevel: 'medium',
        expectedReturn: 6.0
      }
    );
  } else {
    investmentRecommendations.push(
      {
        type: 'Growth Stocks',
        allocation: 70,
        description: 'Focus on companies with high growth potential.',
        riskLevel: 'high',
        expectedReturn: 10.0
      },
      {
        type: 'International Markets',
        allocation: 20,
        description: 'Emerging market stocks and international growth funds.',
        riskLevel: 'high',
        expectedReturn: 9.0
      },
      {
        type: 'Bonds',
        allocation: 10,
        description: 'Small bond allocation for minimal stability.',
        riskLevel: 'low',
        expectedReturn: 3.5
      }
    );
  }
  
  // Generate savings recommendations
  const savingsRecommendations: SavingsRecommendation = {
    monthlySavingsTarget: Math.min(monthlySavings * 0.5, 2000), // 50% of available or max $2000
    emergencyFundTarget,
    savingsProducts: [
      {
        name: 'DeCoFi Flexible Savings',
        interestRate: 3.0,
        description: 'Liquid savings with easy access and competitive rates.',
        recommended: debtRatio > 0.5 || profile.savings < emergencyFundTarget / 2
      },
      {
        name: 'DeCoFi Goal Saver',
        interestRate: 4.0,
        description: 'Medium-term savings with slightly higher returns.',
        recommended: profile.goals.some(g => g.timeframe >= 1 && g.timeframe <= 5)
      },
      {
        name: 'DeCoFi Fixed Term Deposit',
        interestRate: 5.0,
        description: 'Higher interest for longer commitments.',
        recommended: profile.goals.some(g => g.timeframe > 5) && debtRatio < 0.3
      }
    ]
  };
  
  // Add debt reduction strategy if needed
  if (debtRatio > 0.3) {
    savingsRecommendations.debtReductionStrategy = debtRatio > 0.5 
      ? 'Focus on paying down high-interest debt before increasing investments.'
      : 'Allocate 50% of monthly savings to debt reduction until ratio drops below 20%.';
  }
  
  // Generate next steps
  const nextSteps = [];
  
  if (profile.savings < emergencyFundTarget) {
    nextSteps.push('Build your emergency fund to ' + emergencyFundTarget.toLocaleString() + ' USD.');
  }
  
  if (debtRatio > 0.4) {
    nextSteps.push('Reduce high-interest debt to improve financial stability.');
  }
  
  nextSteps.push('Schedule a free consultation with a DeCoFi financial advisor.');
  nextSteps.push('Set up automatic monthly transfers to your savings account.');
  
  return {
    summary: generateSummary(profile, monthlySavings),
    investmentRecommendations,
    savingsRecommendations,
    nextSteps
  };
};

// Helper function to generate a personalized summary
function generateSummary(profile: FinancialProfile, monthlySavings: number): string {
  const yearsToRetirement = Math.max(65 - profile.age, 0);
  const retirementGoal = profile.goals.find(g => g.type === 'retirement');
  
  if (monthlySavings <= 0) {
    return `Based on your current expenses and income, you're currently not saving. We recommend reviewing your budget to find at least $${Math.abs(monthlySavings) + 100} in monthly expense reductions.`;
  }
  
  if (retirementGoal && yearsToRetirement > 0) {
    const monthlyForRetirement = retirementGoal.targetAmount / (yearsToRetirement * 12);
    if (monthlyForRetirement > monthlySavings) {
      return `You're saving $${monthlySavings} monthly, but will need approximately $${Math.ceil(monthlyForRetirement)} monthly to reach your retirement goal of $${retirementGoal.targetAmount.toLocaleString()} in ${yearsToRetirement} years.`;
    } else {
      return `You're saving $${monthlySavings} monthly, which puts you on track for your retirement goal of $${retirementGoal.targetAmount.toLocaleString()} in ${yearsToRetirement} years. Consider additional investment opportunities.`;
    }
  }
  
  return `With your current savings rate of $${monthlySavings} per month, you're building a solid financial foundation. Our recommendations will help optimize your savings and investments.`;
}

// Get a user's financial profile - in a real implementation this would come from the backend
export const getUserFinancialProfile = async (): Promise<FinancialProfile> => {
  // This would be fetched from your backend in a real implementation
  // For demo, return sample data
  return {
    income: 5000,
    expenses: 3500,
    savings: 10000,
    debt: 20000,
    riskTolerance: 'medium',
    age: 35,
    goals: [
      {
        type: 'retirement',
        targetAmount: 1000000,
        timeframe: 30,
        priority: 'high'
      },
      {
        type: 'house',
        targetAmount: 100000,
        timeframe: 5,
        priority: 'medium'
      }
    ]
  };
};
