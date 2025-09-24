import { Button } from "@/components/ui/button";
import { Calculator, Calendar } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-luxury-navy to-slate-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="absolute inset-0 bg-[url('./assets/images/House.jpg')] bg-cover bg-center"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl lg:text-6xl font-luxury font-bold mb-6 leading-tight">
            Your Gateway to <span className="text-luxury-gold">Luxury Living</span> in Puget Sound
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-gray-200 font-light leading-relaxed">
            Specializing in premium properties and compassionate downsizing services for discerning clients across Bellevue, Redmond, Issaquah, and Seattle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* <Button
              onClick={() => scrollToSection('valuation')}
              className="bg-luxury-gold text-white px-8 py-4 text-lg font-semibold hover:bg-yellow-600 transition-all transform hover:scale-105 shadow-lg"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Get Your Home's Value
            </Button> */}
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="bg-luxury-gold text-white px-8 py-4 text-lg font-semibold hover:bg-yellow-600 transition-all transform hover:scale-105 shadow-lg"
            > 
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
