import { Button } from "@/components/ui/button";
import { Heart, Users, GraduationCap, Calendar, Video } from "lucide-react";

export default function SeniorDownsizing() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="seniors" className="py-20 bg-luxury-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-luxury font-bold mb-6">
              Compassionate Downsizing Services for <span className="text-luxury-gold">Seniors</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Helping aging homeowners in Bellevue, Redmond, Spokane, and surrounding areas transition to their next chapter with dignity, care, and comprehensive support.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <Heart className="text-luxury-gold text-xl mr-4 mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">White-Glove Service</h3>
                  <p className="text-gray-300">Complete vendor coordination for moving, repairs, and estate sales.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="text-luxury-gold text-xl mr-4 mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Local Partnerships</h3>
                  <p className="text-gray-300">Trusted relationships with social service agencies and senior care providers.</p>
                </div>
              </div>
              <div className="flex items-start">
                <GraduationCap className="text-luxury-gold text-xl mr-4 mt-1 h-6 w-6" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Educational Webinars</h3>
                  <p className="text-gray-300">"Selling Your Home After 65: A Guide for WA Seniors and Their Families"</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToContact}
                className="bg-luxury-gold text-white hover:bg-yellow-600 transition-colors"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Request Consultation
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-luxury-navy transition-colors"
              >
                <Video className="mr-2 h-4 w-4" />
                Join Our Webinar
              </Button>
            </div>
          </div>
          
          <div>
            <img
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Senior Downsizing Consultation"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
