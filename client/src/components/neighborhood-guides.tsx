import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Neighborhood } from "@shared/schema";

export default function NeighborhoodGuides() {
  const { data: neighborhoods, isLoading } = useQuery<Neighborhood[]>({
    queryKey: ["/api/neighborhoods"],
    queryFn: async () => {
      const res = await fetch("/api/neighborhoods");
      if (!res.ok) throw new Error("Failed to fetch neighborhoods");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <section id="neighborhoods" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-luxury font-bold text-luxury-navy mb-6">
              Neighborhood Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Loading neighborhood guides...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer animate-pulse">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <div className="w-full h-64 bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="neighborhoods" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-luxury font-bold text-luxury-navy mb-6">
            Neighborhood Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore in-depth guides to Greater Seattle's most desirable communities, featuring schools, amenities, lifestyle, and market trends.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {neighborhoods?.map((neighborhood) => (
            <div key={neighborhood.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={neighborhood.image}
                  alt={`${neighborhood.name} Neighborhood`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">{neighborhood.name}</h3>
                  <p className="text-sm text-gray-200 mb-3">{neighborhood.description}</p>
                  <span className="inline-flex items-center text-luxury-gold font-medium">
                    Explore Guide <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
