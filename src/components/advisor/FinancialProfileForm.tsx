
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { FinancialProfile } from '@/services/financialAdvisorService';

interface FinancialProfileFormProps {
  initialProfile: FinancialProfile;
  onSubmit: (profile: FinancialProfile) => void;
}

const FinancialProfileForm: React.FC<FinancialProfileFormProps> = ({
  initialProfile,
  onSubmit
}) => {
  const [profile, setProfile] = useState<FinancialProfile>(initialProfile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  const addGoal = () => {
    setProfile({
      ...profile,
      goals: [
        ...profile.goals,
        {
          type: 'other',
          targetAmount: 10000,
          timeframe: 3,
          priority: 'medium'
        }
      ]
    });
  };

  const removeGoal = (index: number) => {
    setProfile({
      ...profile,
      goals: profile.goals.filter((_, i) => i !== index)
    });
  };

  const updateGoal = (index: number, field: string, value: any) => {
    const updatedGoals = [...profile.goals];
    updatedGoals[index] = {
      ...updatedGoals[index],
      [field]: value
    };
    
    setProfile({
      ...profile,
      goals: updatedGoals
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="bg-white dark:bg-gray-800 shadow-md">
        <CardHeader>
          <CardTitle>Your Financial Profile</CardTitle>
          <CardDescription>Update your information to get personalized recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Financial Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="income">Monthly Income ($)</Label>
              <Input 
                id="income" 
                type="number" 
                value={profile.income} 
                onChange={(e) => setProfile({...profile, income: Number(e.target.value)})}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expenses">Monthly Expenses ($)</Label>
              <Input 
                id="expenses" 
                type="number" 
                value={profile.expenses} 
                onChange={(e) => setProfile({...profile, expenses: Number(e.target.value)})}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="savings">Current Savings ($)</Label>
              <Input 
                id="savings" 
                type="number" 
                value={profile.savings} 
                onChange={(e) => setProfile({...profile, savings: Number(e.target.value)})}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="debt">Current Debt ($)</Label>
              <Input 
                id="debt" 
                type="number" 
                value={profile.debt} 
                onChange={(e) => setProfile({...profile, debt: Number(e.target.value)})}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number" 
                value={profile.age} 
                onChange={(e) => setProfile({...profile, age: Number(e.target.value)})}
                min="18"
                max="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="riskTolerance">Risk Tolerance</Label>
              <Select 
                value={profile.riskTolerance} 
                onValueChange={(value: 'low' | 'medium' | 'high') => setProfile({...profile, riskTolerance: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select risk tolerance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Conservative</SelectItem>
                  <SelectItem value="medium">Medium - Balanced</SelectItem>
                  <SelectItem value="high">High - Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Financial Goals */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Financial Goals</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addGoal}
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                Add Goal
              </Button>
            </div>

            {profile.goals.map((goal, index) => (
              <Card key={index} className="bg-gray-50 dark:bg-gray-700 shadow-sm">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Goal {index + 1}</CardTitle>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeGoal(index)}
                      className="h-8 w-8 p-0"
                    >
                      <MinusCircle className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`goal-type-${index}`}>Goal Type</Label>
                    <Select 
                      value={goal.type} 
                      onValueChange={(value: any) => updateGoal(index, 'type', value)}
                    >
                      <SelectTrigger id={`goal-type-${index}`}>
                        <SelectValue placeholder="Select goal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retirement">Retirement</SelectItem>
                        <SelectItem value="house">Housing/Property</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`goal-amount-${index}`}>Target Amount ($)</Label>
                    <Input 
                      id={`goal-amount-${index}`}
                      type="number" 
                      value={goal.targetAmount} 
                      onChange={(e) => updateGoal(index, 'targetAmount', Number(e.target.value))}
                      min="0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`goal-timeframe-${index}`}>Timeframe (years): {goal.timeframe}</Label>
                    <Slider 
                      id={`goal-timeframe-${index}`}
                      min={1} 
                      max={40} 
                      step={1} 
                      value={[goal.timeframe]} 
                      onValueChange={([value]) => updateGoal(index, 'timeframe', value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <RadioGroup 
                      value={goal.priority} 
                      onValueChange={(value: 'low' | 'medium' | 'high') => updateGoal(index, 'priority', value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id={`priority-low-${index}`} />
                        <Label htmlFor={`priority-low-${index}`} className="cursor-pointer">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id={`priority-medium-${index}`} />
                        <Label htmlFor={`priority-medium-${index}`} className="cursor-pointer">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id={`priority-high-${index}`} />
                        <Label htmlFor={`priority-high-${index}`} className="cursor-pointer">High</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Generate Recommendations</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default FinancialProfileForm;
