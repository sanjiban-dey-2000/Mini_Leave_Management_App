import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        
        {/* Logo & About */}
        <div>
          <h1 className="text-2xl font-bold">WorkFlow<span className="text-indigo-200">.app</span></h1>
          <p className="mt-3 text-gray-200 text-sm leading-relaxed">
            Streamline your workplace with smart tools for employees and admins.  
            Work smarter, not harder.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-200">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Resources</h2>
          <ul className="space-y-2 text-gray-200">
            <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
            <li><Link to="/support" className="hover:text-white transition">Support</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"><FaFacebookF /></a>
            <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"><FaTwitter /></a>
            <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"><FaLinkedinIn /></a>
            <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-white/20 pt-6 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} WorkFlow.app — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
