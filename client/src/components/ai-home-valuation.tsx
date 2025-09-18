import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Bot, Sparkles, TrendingUp, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { insertHomeValuationSchema, HomeValuation } from "@shared/schema";

interface EnhancedValuationResponse extends HomeValuation {
  confidence?: number;
  factors?: string[];
  marketInsights?: string;
}

export default function AIHomeValuation() {
  const [formData, setFormData] = useState({
    address: "",
    zipCode: "",
    beds: "",
    baths: "",
    sqft: "",
    email: ""
  });
  const [valuationResult, setValuationResult] = useState<EnhancedValuationResponse | null>(null);

  const { toast } = useToast();

  const valuationMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/home-valuations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to get valuation");
      return res.json() as Promise<EnhancedValuationResponse>;
    },
    onSuccess: (data) => {
      setValuationResult(data);
      toast({
        title: "AI Valuation Complete!",
        description: `Estimated value: $${parseFloat(data.estimatedValue || "0").toLocaleString()}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to get home valuation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = insertHomeValuationSchema.parse({
        address: formData.address,
        zipCode: formData.zipCode,
        beds: parseInt(formData.beds),
        baths: parseFloat(formData.baths),
        sqft: parseInt(formData.sqft),
        email: formData.email,
      });
      
      valuationMutation.mutate(validatedData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="valuation" className="py-20 bg-gradient-to-br from-pacific-blue to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-luxury font-bold mb-6">
            Get Your Home's Value with <span className="text-luxury-gold">AI Technology</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our advanced AI-powered valuation tool provides accurate, personalized estimates for the Seattle market in seconds.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Bot className="text-pacific-blue text-6xl mb-4 mx-auto h-16 w-16" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">AI Home Valuation Tool</h3>
            <p className="text-gray-600">Get an instant estimate powered by market data and AI analysis</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Property Address</Label>
                <Input
                  type="text"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full focus:ring-2 focus:ring-pacific-blue focus:border-transparent text-gray-800"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</Label>
                <Input
                  type="text"
                  placeholder="98004"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className="w-full focus:ring-2 focus:ring-pacific-blue focus:border-transparent text-gray-800"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</Label>
                <Select value={formData.beds} onValueChange={(value) => setFormData({ ...formData, beds: value })}>
                  <SelectTrigger className="w-full focus:ring-2 focus:ring-pacific-blue focus:border-transparent text-gray-800">
                    <SelectValue placeholder="Select beds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</Label>
                <Select value={formData.baths} onValueChange={(value) => setFormData({ ...formData, baths: value })}>
                  <SelectTrigger className="w-full focus:ring-2 focus:ring-pacific-blue focus:border-transparent text-gray-800">
                    <SelectValue placeholder="Select baths" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.5">1.5</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="2.5">2.5</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Square Feet</Label>
                <Input
                  type="number"
                  placeholder="2500"
                  value={formData.sqft}
                  onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                  className="w-full focus:ring-2 focus:ring-pacific-blue focus:border-transparent text-gray-800"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">Email (for detailed report)</Label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full focus:ring-2 focus:ring-pacific-blue focus:border-transparent text-gray-800"
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={valuationMutation.isPending}
              className="w-full bg-pacific-blue text-white py-4 text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              {valuationMutation.isPending ? (
                "Processing..."
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get AI-Powered Valuation
                </>
              )}
            </Button>
          </form>
          
          {/* Valuation Results */}
          {valuationResult && (
            <div className="mt-8 bg-gradient-to-br from-luxury-cream to-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <CheckCircle className="text-green-500 text-6xl mb-4 mx-auto h-16 w-16" />
                <h3 className="text-3xl font-bold text-luxury-navy mb-2">
                  ${parseFloat(valuationResult.estimatedValue || "0").toLocaleString()}
                </h3>
                <p className="text-gray-600">Estimated Market Value</p>
                {valuationResult.confidence && (
                  <Badge variant="secondary" className="mt-2 bg-luxury-gold text-white">
                    {valuationResult.confidence}% Confidence
                  </Badge>
                )}
              </div>
              
              {valuationResult.factors && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-luxury-navy mb-3">Key Valuation Factors</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {valuationResult.factors.map((factor, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <TrendingUp className="text-luxury-gold mr-2 h-4 w-4" />
                        {factor}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {valuationResult.marketInsights && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-pacific-blue mb-2">Market Insights</h4>
                  <p className="text-gray-700 text-sm">{valuationResult.marketInsights}</p>
                </div>
              )}
              
              <div className="mt-6 text-center">
                <Button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-luxury-navy text-white hover:bg-slate-700 transition-colors"
                >
                  Get Professional Assessment
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
