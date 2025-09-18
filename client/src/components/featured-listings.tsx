import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Images, Search } from "lucide-react";
import { Property } from "@shared/schema";

export default function FeaturedListings() {
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    queryFn: async () => {
      const res = await fetch("/api/properties?featured=true&limit=3");
      if (!res.ok) throw new Error("Failed to fetch properties");
      return res.json();
    },
  });

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  if (isLoading) {
    return (
      <section id="listings" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-luxury font-bold text-luxury-navy mb-6">
              Featured Luxury Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Loading exceptional homes...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="listings" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-luxury font-bold text-luxury-navy mb-6">
            Featured Luxury Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exceptional homes in Seattle's most prestigious neighborhoods, each offering unique luxury and sophistication.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties?.map((listing) => (
            <div key={listing.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <img
                src={listing.images[0] || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                alt={`${listing.city} Home`}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold text-luxury-navy">
                    {formatPrice(listing.price)}
                  </h3>
                  <Badge variant="secondary" className="bg-luxury-gold text-white">
                    Featured
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4">
                  {listing.address}, {listing.city}, {listing.state}
                </p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{listing.beds} beds</span>
                  <span>{listing.baths} baths</span>
                  <span>{listing.sqft.toLocaleString()} sq ft</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-luxury-navy text-white hover:bg-slate-700 transition-colors"
                    size="sm"
                  >
                    <Eye className="mr-1 h-4 w-4" />
                    Virtual Tour
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    size="sm"
                  >
                    <Images className="mr-1 h-4 w-4" />
                    Gallery
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-luxury-gold text-white px-8 py-4 text-lg font-semibold hover:bg-yellow-600 transition-colors">
            <Search className="mr-2 h-5 w-5" />
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
}
