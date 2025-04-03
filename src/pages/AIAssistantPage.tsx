import AIChatAssistant from "@/components/ai/AIChatAssistant";

const AIAssistantPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          AI Financial Assistant
        </h1>
        <p className="text-muted-foreground">
          Get instant answers to your questions about loans, savings,
          investments, and more. Our AI assistant is here to help you navigate
          your financial journey.
        </p>
      </div>

      <AIChatAssistant />
    </div>
  );
};

export default AIAssistantPage;
