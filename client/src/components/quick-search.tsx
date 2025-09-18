import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

export default function QuickSearch() {
  const [searchData, setSearchData] = useState({
    location: "",
    priceRange: "",
    propertyType: ""
  });

  const handleSearch = () => {
    console.log("Property search:", searchData);
    // TODO: Implement property search functionality
  };

  return (
    <section className="bg-white shadow-lg -mt-12 relative z-10 max-w-5xl mx-auto rounded-xl border border-gray-200">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <Label className="block text-sm font-medium text-gray-700 mb-2">Location</Label>
            <Input
              type="text"
              placeholder="Bellevue, Redmond, Seattle..."
              value={searchData.location}
              onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
              className="w-full focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Price Range</Label>
            <Select value={searchData.priceRange} onValueChange={(value) => setSearchData({ ...searchData, priceRange: value })}>
              <SelectTrigger className="w-full focus:ring-2 focus:ring-luxury-gold focus:border-transparent">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                <SelectItem value="2m-5m">$2M - $5M</SelectItem>
                <SelectItem value="5m+">$5M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Property Type</Label>
            <Select value={searchData.propertyType} onValueChange={(value) => setSearchData({ ...searchData, propertyType: value })}>
              <SelectTrigger className="w-full focus:ring-2 focus:ring-luxury-gold focus:border-transparent">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single-family">Single Family</SelectItem>
                <SelectItem value="luxury-condo">Luxury Condo</SelectItem>
                <SelectItem value="townhome">Townhome</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              className="w-full bg-luxury-navy text-white font-semibold hover:bg-slate-700 transition-colors"
            >
              <Search className="mr-2 h-4 w-4" />
              Search Properties
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
