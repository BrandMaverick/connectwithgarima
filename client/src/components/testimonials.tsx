import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle } from "lucide-react";
import { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
    queryFn: async () => {
      const res = await fetch("/api/testimonials?limit=3");
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-luxury font-bold text-luxury-navy mb-6">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Loading testimonials...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-lg animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-6"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-6"></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-luxury font-bold text-luxury-navy mb-6">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from satisfied clients who trusted Garima with their most important real estate decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-luxury-gold h-5 w-5 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"}
                  alt="Client"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-luxury-navy">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-luxury-navy text-white hover:bg-slate-700 transition-colors">
            <MessageCircle className="mr-2 h-4 w-4" />
            Read All Reviews
          </Button>
        </div>
      </div>
    </section>
  );
}
