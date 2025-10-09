import { useQuery } from "@tanstack/react-query";
import { House } from "@shared/schema";
import { getImageURL } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, Play, Award } from "lucide-react";
import { scrollToContact } from "@/lib/utils";

export default function OpenHouses() {
  const { data: houses, isLoading } = useQuery<House[]>({
    queryKey: ["/api/open-houses"],
    queryFn: async () => {
      const res = await fetch("/api/open-houses");
      if (!res.ok) throw new Error("Failed to fetch houses");
      return res.json();
    },
  });
  
  function openLocationInNewTab(url : string) {
    // Use a regular expression to match both commas and spaces globally.
    // The `g` flag ensures all occurrences are replaced, not just the first.
    // The square brackets `[]` create a character set, matching either a comma or a space.
    const modifiedurl = url.replace(/[ ,]/g, '+');
    window.open('https://www.google.com/maps/place/' + modifiedurl, '_blank', 'noopener,noreferrer');
  };

  function openImageInNewTab(url : string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <section id="openhouses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-luxury font-bold text-luxury-navy mb-6">
              Open Houses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Loading Open Houses...
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
    <section id="openhouses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-luxury font-bold text-luxury-navy mb-6">
            Open Houses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Below are the Houses on the market and Garima is hosting open houses for these properties. Please reach out to Garima for any questions or to schedule a private tour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button
                onClick={scrollToContact}
                className="bg-luxury-navy text-white hover:bg-slate-700 transition-colors"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Private Viewing
              </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {houses?.map((house) => (
            <div className="container mx-auto p-4 md:p-8">
            <p className="text-center text-xl text-gray-600 max-w-3xl mx-auto">{house.date}</p>
            <img
              src={getImageURL(house.image, "flyers")}
              alt="Event Flyer"
              className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-150"
              onClick={() => openImageInNewTab(getImageURL(house.image, "flyers"))}
            />
              <button
                onClick={() => openLocationInNewTab(house.address)}
                className="bg-luxury-navy text-white hover:bg-slate-700 transition-colors w-full mt-4 px-4 py-2 rounded-lg font-medium flex items-center justify-center"
              >
                Location
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
