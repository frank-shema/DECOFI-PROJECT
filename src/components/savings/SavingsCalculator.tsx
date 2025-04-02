
import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SavingsCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [interestRate, setInterestRate] = useState(4);
  const [years, setYears] = useState(5);
  
  // Calculate compound interest with monthly contributions
  const calculateProjection = () => {
    const monthlyRate = interestRate / 100 / 12;
    const months = years * 12;
    const projection = [];
    
    let balance = initialDeposit;
    
    for (let i = 0; i <= months; i += 3) { // Calculate quarterly for chart
      const month = i;
      const year = (i / 12).toFixed(1);
      
      if (i > 0) {
        // Add monthly contributions and calculate interest for 3 months
        for (let j = 0; j < 3 && i+j/3 <= months; j++) {
          balance = balance * (1 + monthlyRate) + monthlyContribution;
        }
      }
      
      projection.push({
        month,
        year: `Year ${year}`,
        balance: Math.round(balance)
      });
    }
    
    return projection;
  };
  
  const projection = calculateProjection();
  const finalBalance = projection[projection.length - 1].balance;
  const totalContributions = initialDeposit + (monthlyContribution * years * 12);
  const interestEarned = finalBalance - totalContributions;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="col-span-1 bg-white dark:bg-gray-800 shadow-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Calculator className="h-6 w-6 text-decofi-blue" />
            <CardTitle>Savings Calculator</CardTitle>
          </div>
          <CardDescription>Adjust the values to see your potential returns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="initialDeposit">Initial Deposit</Label>
              <span className="font-semibold">${initialDeposit}</span>
            </div>
            <Slider 
              id="initialDeposit"
              min={0} 
              max={10000} 
              step={100} 
              value={[initialDeposit]} 
              onValueChange={([value]) => setInitialDeposit(value)} 
              className="my-4"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
              <span className="font-semibold">${monthlyContribution}</span>
            </div>
            <Slider 
              id="monthlyContribution"
              min={0} 
              max={1000} 
              step={25} 
              value={[monthlyContribution]} 
              onValueChange={([value]) => setMonthlyContribution(value)} 
              className="my-4"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="interestRate">Interest Rate</Label>
              <span className="font-semibold">{interestRate}%</span>
            </div>
            <Slider 
              id="interestRate"
              min={1} 
              max={10} 
              step={0.5} 
              value={[interestRate]} 
              onValueChange={([value]) => setInterestRate(value)} 
              className="my-4"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="years">Time Period</Label>
              <span className="font-semibold">{years} years</span>
            </div>
            <Slider 
              id="years"
              min={1} 
              max={30} 
              step={1} 
              value={[years]} 
              onValueChange={([value]) => setYears(value)} 
              className="my-4"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 shadow-md">
        <CardHeader>
          <CardTitle>Projected Growth</CardTitle>
          <CardDescription>See how your savings could grow over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={projection}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']}
                  labelFormatter={(label) => label}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#4f46e5" 
                  fill="url(#colorBalance)" 
                  activeDot={{ r: 8 }} 
                />
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Final Balance</p>
              <p className="text-xl font-bold text-decofi-blue">${finalBalance.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Contributed</p>
              <p className="text-xl font-bold text-green-600">${totalContributions.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Interest Earned</p>
              <p className="text-xl font-bold text-purple-600">${interestEarned.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-decofi-blue hover:bg-decofi-blue/90">Start Saving Today</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SavingsCalculator;
