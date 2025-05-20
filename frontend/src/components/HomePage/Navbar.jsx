import { motion } from "framer-motion";
import { HeartPulse, X, Menu, LogIn, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Prediction", path: "/predict" },
    { name: "Community", path: "/community" },
    { name: "Feedback", path: "/feedback" },
    { name: "Contact", path: "/contact-us" },
    { name: "About", path: "/about-us" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const userString = localStorage.getItem("user");
      const userObj = JSON.parse(userString);
      setUser(userObj);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    toast.success("Logged out successfully!");
    setTimeout(() => (window.location.href = "/"), 1000);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-md border-b border-slate-100 fixed w-full z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="p-1 rounded-full bg-emerald-100">
              <HeartPulse className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-xl font-bold text-slate-800">
              Cardio<span className="text-emerald-600">Guard</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="text-slate-600 hover:text-emerald-600 font-medium relative group"
                >
                  {link.name}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-emerald-600 w-0 group-hover:w-full transition-all duration-300"
                    layoutId="navUnderline"
                  />
                </motion.div>
              </Link>
            ))}

            {isLoggedIn ? (
              <div className="relative">
                <motion.button
                  onClick={toggleMenu}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full shadow-sm"
                >
                  <span>Hi, {user?.first_name}</span>
                  <User className="h-4 w-4" />
                </motion.button>

                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md border border-slate-200"
                  >
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        <User className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-slate-700 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link to="/login-register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full shadow-sm flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Get Started
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-2 mt-2"
          >
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="block px-3 py-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                >
                  {link.name}
                </motion.div>
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard">
                    <button className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-lg">
                      <User className="h-4 w-4" />
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white px-6 py-2 rounded-lg"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login-register">
                  <button className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-lg">
                    <LogIn className="h-4 w-4" />
                    Get Started
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;