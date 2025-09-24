export default function Footer() {

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-luxury font-bold mb-4">Garima Bansal</h3>
            <p className="text-gray-400 mb-4">
              Creating lasting legacies through exceptional real estate service in Puget Sound.
            </p>
            <div className="text-sm text-gray-400">
              <p>License #154826</p>
              <p>NWMLS Member</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#listings" className="hover:text-white transition-colors">Luxury Home Sales</a></li>
              <li><a href="#seniors" className="hover:text-white transition-colors">Senior Downsizing</a></li>
              <li><a href="#valuation" className="hover:text-white transition-colors">Home Valuations</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Market Analysis</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Areas Served</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#neighborhoods" className="hover:text-white transition-colors">Bellevue</a></li>
              <li><a href="#neighborhoods" className="hover:text-white transition-colors">Redmond</a></li>
              <li><a href="#neighborhoods" className="hover:text-white transition-colors">Seattle</a></li>
              <li><a href="#neighborhoods" className="hover:text-white transition-colors">Issaquah</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Site Map</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Garima Bansal Real Estate. All rights reserved. Equal Housing Opportunity.</p>
        </div>
      </div>
    </footer>
  );
}
