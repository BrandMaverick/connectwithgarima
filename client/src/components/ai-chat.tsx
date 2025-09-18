import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hello! I'm here to help answer questions about properties, schedule viewings, or connect you with Garima. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const chatMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return res.json();
    },
    onSuccess: (data) => {
      const botMessage: ChatMessage = {
        id: Date.now().toString() + "_bot",
        text: data.response,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    },
    onError: () => {
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + "_error",
        text: "I'm sorry, I'm having trouble responding right now. Please try contacting Garima directly.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(message);
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-luxury-gold text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-2xl border border-gray-200">
          <div className="bg-luxury-navy text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="mr-2 h-5 w-5" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="text-white hover:text-gray-300 h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto" id="chatMessages">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-4">
                <div className={`p-3 rounded-lg text-sm ${
                  msg.isBot 
                    ? "bg-gray-100 text-gray-800" 
                    : "bg-luxury-gold text-white ml-8"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="mb-4">
                <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-800">
                  Typing...
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
              />
              <Button
                type="submit"
                className="bg-luxury-gold text-white hover:bg-yellow-600 transition-colors ml-2"
                size="icon"
                disabled={chatMutation.isPending}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
