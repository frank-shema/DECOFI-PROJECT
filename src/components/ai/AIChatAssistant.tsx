import { useState, useRef, useEffect } from "react";
import { SendHorizontal, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const AIChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your DeCoFi AI assistant. How can I help you with your financial questions today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mock AI response function
  const getAIResponse = async (question: string): Promise<string> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock responses based on common financial questions
    const responses: Record<string, string> = {
      default:
        "I'm not sure about that. Let me help you with something else related to your finances.",
      loan: "DeCoFi offers several loan options with competitive interest rates. The rate depends on your credit score and loan duration. You can apply for a loan through the Loans section in the dashboard.",
      interest:
        "Our current interest rates for savings accounts range from 2.5% to 4.5% APY depending on the type of account and term length. Check the Savings section for more details.",
      invest:
        "DeCoFi provides various investment opportunities through our cooperative model. You can invest in community projects, small businesses, or our diversified portfolio options.",
      withdraw:
        "You can withdraw funds from your account through the Deposit/Withdraw section. Withdrawals typically process within 1-2 business days depending on your banking institution.",
      governance:
        "As a member of DeCoFi, you have voting rights on platform proposals. You can participate in governance decisions through the Governance section in your dashboard.",
      rewards:
        "Our rewards program offers points for various activities such as referring new members, maintaining minimum balances, and participating in governance. These points can be redeemed for benefits.",
    };

    // Simple keyword matching
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes("loan") || lowerQuestion.includes("borrow"))
      return responses.loan;
    if (lowerQuestion.includes("interest") || lowerQuestion.includes("rate"))
      return responses.interest;
    if (
      lowerQuestion.includes("invest") ||
      lowerQuestion.includes("investment")
    )
      return responses.invest;
    if (
      lowerQuestion.includes("withdraw") ||
      lowerQuestion.includes("transfer")
    )
      return responses.withdraw;
    if (lowerQuestion.includes("governance") || lowerQuestion.includes("vote"))
      return responses.governance;
    if (lowerQuestion.includes("reward") || lowerQuestion.includes("point"))
      return responses.rewards;

    return responses.default;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Get AI response
      const response = await getAIResponse(inputValue);

      // Add AI message
      const aiMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-decofi-blue" />
          DeCoFi Financial Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-[450px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.role === "assistant"
                      ? "bg-muted rounded-lg p-3"
                      : "bg-decofi-blue text-white rounded-lg p-3"
                  }`}
                >
                  {message.role === "assistant" && (
                    <Bot className="h-5 w-5 mt-1 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <User className="h-5 w-5 mt-1 flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Ask about loans, interest rates, or investment options..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            size="icon"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizontal className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIChatAssistant;
