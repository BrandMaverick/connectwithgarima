import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { SiLinkedin, SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { insertInquirySchema, Inquiry } from "@shared/schema";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: ""
  });

  const { toast } = useToast();

  const inquiryMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send inquiry");
      return res.json() as Promise<Inquiry>;
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. Garima will contact you soon.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = insertInquirySchema.parse(formData);
      inquiryMutation.mutate(validatedData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-luxury-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-luxury font-bold mb-6">
            Ready to Make Your Move?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Whether you're buying, selling, or downsizing, Garima is here to guide you through every step with expertise and care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-semibold mb-8">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="text-luxury-gold text-xl mr-4 h-6 w-6" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+14253736401" className="text-gray-300 hover:text-white transition-colors">
                    (425) 373-6401
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="text-luxury-gold text-xl mr-4 h-6 w-6" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:connectwithgarima@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                    connectwithgarimagarima@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="text-luxury-gold text-xl mr-4 h-6 w-6" />
                <div>
                  <p className="font-medium">Office</p>
                  <p className="text-gray-300">11109 Slater Ave NE #200A, Kirkland, WA 98033</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Follow Garima</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/bansalgarima" className="bg-gray-700 p-3 rounded-full hover:bg-luxury-gold transition-colors" target="_blank" rel="noopener noreferrer">
                  <SiFacebook className="text-white h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-luxury-gold transition-colors" target="_blank" rel="noopener noreferrer">
                  <SiInstagram className="text-white h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/garimabansal/" className="bg-gray-700 p-3 rounded-full hover:bg-luxury-gold transition-colors" target="_blank" rel="noopener noreferrer">
                  <SiLinkedin className="text-white h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-luxury-gold transition-colors" target="_blank" rel="noopener noreferrer">
                  <SiYoutube className="text-white h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 text-gray-800">
            <h3 className="text-2xl font-semibold text-luxury-navy mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">First Name</Label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Last Name</Label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Phone</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">I'm Interested In</Label>
                <Select value={formData.inquiryType} onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}>
                  <SelectTrigger className="w-full focus:ring-2 focus:ring-luxury-gold focus:border-transparent">
                    <SelectValue placeholder="Select your interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buying">Buying a Home</SelectItem>
                    <SelectItem value="selling">Selling a Home</SelectItem>
                    <SelectItem value="downsizing">Downsizing Services</SelectItem>
                    <SelectItem value="valuation">Home Valuation</SelectItem>
                    <SelectItem value="consultation">Market Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Message</Label>
                <Textarea
                  rows={4}
                  placeholder="Tell me about your real estate goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={inquiryMutation.isPending}
                className="w-full bg-luxury-gold text-white py-4 text-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                {inquiryMutation.isPending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
