import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { 
  MapPin,
  Mail,
  Phone,
  HeartPulse,
  Clock,
  AlertCircle
} from 'lucide-react';

const ContactusPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login-register');
    }
  }, [navigate]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill out all fields!');
      return;
    }

    console.log('Contact form submitted:', formData);
    toast.success('Your message has been sent!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50 flex flex-col">
      <Navbar />

      <div className="my-12" />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
        toastStyle={{ backgroundColor: '#059669' }}
      />

      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-100 mb-6">
            <HeartPulse className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Get in Touch with <span className="text-emerald-600">Cardio Guard</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our team is ready to assist you with any questions about heart health and our services.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <motion.div
            className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-8"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Regarding Cardiac Care"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder="How can we assist you?"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 placeholder-slate-400 resize-none"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="w-full lg:w-1/2 space-y-6"
            variants={infoVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Our Location</h3>
                  <p className="text-slate-600">
                    123 Heart Wellness Avenue<br />
                    Health City, HC 12345<br />
                    Punjab, India
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Contact Details</h3>
                  <div className="space-y-1 text-slate-600">
                    <p className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-500" />
                      Emergency: +91 987 654 3210
                    </p>
                    <p>General: +91 11 2345 6789</p>
                    <p>Fax: +91 11 2345 6790</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Email & Hours</h3>
                  <div className="space-y-1 text-slate-600">
                    <p>Support: support@cardioguard.com</p>
                    <p>General: info@cardioguard.com</p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      Mon-Fri: 8AM - 8PM IST
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      Sat-Sun: 9AM - 5PM IST
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactusPage;