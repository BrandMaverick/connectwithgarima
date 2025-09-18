import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-luxury font-bold text-luxury-navy">Garima Bansal</h1>
              <p className="text-sm text-luxury-gold font-medium">Luxury Real Estate Specialist</p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-luxury-navy font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('listings')}
                className="text-gray-700 hover:text-luxury-navy font-medium transition-colors"
              >
                Properties
              </button>
              <button
                onClick={() => scrollToSection('neighborhoods')}
                className="text-gray-700 hover:text-luxury-navy font-medium transition-colors"
              >
                Neighborhoods
              </button>
              <button
                onClick={() => scrollToSection('seniors')}
                className="text-gray-700 hover:text-luxury-navy font-medium transition-colors"
              >
                Senior Services
              </button>
              <button
                onClick={() => scrollToSection('blog')}
                className="text-gray-700 hover:text-luxury-navy font-medium transition-colors"
              >
                Resources
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-luxury-gold text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-luxury-navy font-medium transition-colors text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('listings')}
                className="text-gray-700 hover:text-luxury-navy font-medium transition-colors text-left"
              >
                Properties
              </button>
              <button
                onClick={() => scrollToSection('neighborhoods')}
                className="text-gray-700 hover:text-luxury-navy font-medium transition-colors text-left"
              >
                Neighborhoods
              </button>
              <button
                onClick={() => scrollToSection('seniors')}
                className="text-gray-700 hover:text-luxury-navy font-medium transition-colors text-left"
              >
                Senior Services
              </button>
              <button
                onClick={() => scrollToSection('blog')}
                className="text-gray-700 hover:text-luxury-navy font-medium transition-colors text-left"
              >
                Resources
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-luxury-gold text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors text-left w-fit"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
