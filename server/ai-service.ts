import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: 'blah'
});

export interface PropertyValuationData {
  address: string;
  zipCode: string;
  beds: number;
  baths: number;
  sqft: number;
}

export interface ValuationResult {
  estimatedValue: number;
  confidence: number;
  factors: string[];
  marketInsights: string;
}

export class AIService {
  async getPropertyValuation(data: PropertyValuationData): Promise<ValuationResult> {
    try {
      const prompt = `
        As a real estate AI assistant specializing in Greater Seattle luxury properties, provide a property valuation for:
        
        Address: ${data.address}
        ZIP Code: ${data.zipCode}
        Bedrooms: ${data.beds}
        Bathrooms: ${data.baths}
        Square Feet: ${data.sqft}
        
        Consider these factors:
        - Seattle/Bellevue/Redmond/Spokane market conditions
        - Luxury property premiums
        - Location desirability
        - Property size and layout efficiency
        - Current market trends in Greater Seattle
        
        Provide your response as JSON with:
        - estimatedValue (number, no commas)
        - confidence (0-100 percentage)
        - factors (array of key valuation factors)
        - marketInsights (brief market analysis)
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert real estate AI assistant specializing in Greater Seattle luxury properties. Provide accurate, professional valuations based on current market data."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000,
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      
      return {
        estimatedValue: result.estimatedValue || this.getFallbackValuation(data),
        confidence: result.confidence || 85,
        factors: result.factors || ["Square footage", "Location", "Market conditions"],
        marketInsights: result.marketInsights || "Based on current Greater Seattle market trends."
      };
    } catch (error) {
      console.error("AI valuation error:", error);
      return this.getFallbackValuation(data);
    }
  }

  async getChatResponse(message: string): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are Garima Bansal's AI assistant for her luxury real estate business in Greater Seattle. You help with:
            
            - Answering questions about properties and services
            - Scheduling consultations and viewings
            - Providing information about Bellevue, Redmond, Seattle, and Spokane areas
            - Explaining the senior downsizing process
            - Home valuation inquiries
            - General real estate guidance
            
            Keep responses professional, helpful, and focused on Garima's expertise in luxury properties and senior downsizing services. Always offer to connect visitors with Garima for personalized service.`
          },
          {
            role: "user", 
            content: message
          }
        ],
        max_tokens: 300,
      });

      return response.choices[0].message.content || "I'm here to help with your real estate needs. Would you like to schedule a consultation with Garima?";
    } catch (error) {
      console.error("AI chat error:", error);
      return this.getFallbackChatResponse(message);
    }
  }

  private getFallbackValuation(data: PropertyValuationData): ValuationResult {
    // Simple fallback calculation based on Seattle area averages
    const basePrice = data.sqft * 450; // $450 per sqft base
    const locationMultiplier = data.zipCode.startsWith('980') ? 1.8 : 1.2;
    const estimatedValue = Math.round(basePrice * locationMultiplier);
    
    return {
      estimatedValue,
      confidence: 75,
      factors: ["Square footage", "Location premium", "Market conditions"],
      marketInsights: "Valuation based on Greater Seattle market averages. Contact Garima for a detailed professional assessment."
    };
  }

  private getFallbackChatResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('valuation') || lowerMessage.includes('value')) {
      return "I can help you get an AI-powered home valuation! Please use our home valuation tool on the website to get an instant estimate, or contact Garima directly for a comprehensive market analysis.";
    } else if (lowerMessage.includes('property') || lowerMessage.includes('listing')) {
      return "I can help you find luxury properties in Greater Seattle! Use our property search or let me know your specific requirements and I'll have Garima contact you with personalized recommendations.";
    } else if (lowerMessage.includes('senior') || lowerMessage.includes('downsizing')) {
      return "Garima specializes in compassionate downsizing services for seniors. She provides white-glove service including vendor coordination and emotional support throughout the transition. Would you like to schedule a consultation?";
    } else if (lowerMessage.includes('appointment') || lowerMessage.includes('meeting') || lowerMessage.includes('consultation')) {
      return "I'd be happy to help you schedule a consultation with Garima. She offers free initial consultations to discuss your real estate goals. Please provide your contact information and preferred time.";
    } else {
      return "I'm here to help with your luxury real estate needs in Greater Seattle. Whether you're buying, selling, or need downsizing assistance, I can connect you with Garima's expertise. What can I help you with today?";
    }
  }
}

export const aiService = new AIService();