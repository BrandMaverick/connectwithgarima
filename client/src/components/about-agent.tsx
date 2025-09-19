import { Button } from "@/components/ui/button";
import { Calendar, Play, Award } from "lucide-react";
import agentImage from "@/assets/images/Garima.jpg";

export default function AboutAgent() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src={agentImage}
              alt="Garima Bansal - Luxury Real Estate Agent"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            
            <div className="mt-8 grid grid-cols-3 gap-6 text-center">
              <div className="bg-luxury-cream p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-luxury-navy">15+</h3>
                <p className="text-sm text-gray-600 font-medium">Years Experience</p>
              </div>
              <div className="bg-luxury-cream p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-luxury-navy">$500M+</h3>
                <p className="text-sm text-gray-600 font-medium">Total Sales</p>
              </div>
              <div className="bg-luxury-cream p-4 rounded-lg">
                <h3 className="text-2xl font-bold text-luxury-navy">5★</h3>
                <p className="text-sm text-gray-600 font-medium">Client Rating</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl lg:text-5xl font-luxury font-bold text-luxury-navy mb-6">
              Meet Garima Bansal
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              With over 15 years of experience in luxury real estate across the Greater Seattle area, Garima Bansal has established herself as the premier agent for discerning clients seeking exceptional properties and personalized service.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Born and raised in the Pacific Northwest, Garima possesses an intimate knowledge of Seattle's most prestigious neighborhoods. Her unique expertise in helping senior homeowners navigate the downsizing process with compassion and care sets her apart in the industry.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-luxury-navy mb-4">Credentials & Certifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Award className="text-luxury-gold mr-2 h-5 w-5" />
                  <span className="text-gray-700">Certified Realtor®</span>
                </div>
                <div className="flex items-center">
                  <Award className="text-luxury-gold mr-2 h-5 w-5" />
                  <span className="text-gray-700">Luxury Home Marketing</span>
                </div>
                <div className="flex items-center">
                  <Award className="text-luxury-gold mr-2 h-5 w-5" />
                  <span className="text-gray-700">NWMLS Member</span>
                </div>
                <div className="flex items-center">
                  <Award className="text-luxury-gold mr-2 h-5 w-5" />
                  <span className="text-gray-700">Senior Real Estate Specialist</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToContact}
                className="bg-luxury-navy text-white hover:bg-slate-700 transition-colors"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
              <Button
                variant="outline"
                className="border-2 border-luxury-navy text-luxury-navy hover:bg-luxury-navy hover:text-white transition-colors"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Video Bio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
