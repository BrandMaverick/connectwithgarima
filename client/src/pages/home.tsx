import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import QuickSearch from "@/components/quick-search";
import AboutAgent from "@/components/about-agent";
import FeaturedListings from "@/components/featured-listings";
import SeniorDownsizing from "@/components/senior-downsizing";
import AIHomeValuation from "@/components/ai-home-valuation";
import NeighborhoodGuides from "@/components/neighborhood-guides";
import Testimonials from "@/components/testimonials";
import BlogResources from "@/components/blog-resources";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import AIChat from "@/components/ai-chat";

export default function Home() {
  return (
    <div className="min-h-screen bg-luxury-cream">
      <Navigation />
      <HeroSection />
      <QuickSearch />
      <AboutAgent />
      <FeaturedListings />
      <SeniorDownsizing />
      <AIHomeValuation />
      <NeighborhoodGuides />
      <Testimonials />
      <BlogResources />
      <ContactSection />
      <Footer />
      <AIChat />
    </div>
  );
}
