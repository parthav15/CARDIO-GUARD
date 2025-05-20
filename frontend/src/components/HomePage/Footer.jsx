import { motion } from "framer-motion";
import { HeartPulse, Mail, Phone, MapPin, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-emerald-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-emerald-100">
                <HeartPulse className="h-6 w-6 text-emerald-600" />
              </div>
              <span className="text-2xl font-bold text-white">
                Cardio <span className="text-emerald-400">Guard</span>
              </span>
            </div>
            <p className="text-slate-300">
              Revolutionizing cardiac care through AI-powered solutions and preventive healthcare.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">123 Cardiac Lane, Health City, HC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span className="text-slate-300">+1 (800) CAR-DIAC</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span className="text-slate-300">support@cardioguard.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-slate-300">Subscribe to our newsletter for the latest updates</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
                whileHover={{ scale: 1.02 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-8 text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} Cardio Guard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;