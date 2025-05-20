import { motion } from "framer-motion";
import { HeartPulse, Mail, Phone, Send, Clock } from "lucide-react";

const ContactUs = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating Pulse Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-200/20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-100 mb-6">
            <HeartPulse className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Contact <span className="text-emerald-600">Cardio Guard</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our cardiac care team is ready to assist you with any questions about heart health
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">Inquiry Type</label>
              <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Medical Consultation</option>
                <option>Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-2">Message</label>
              <textarea
                rows="4"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              Send Message
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="p-8 bg-white rounded-xl shadow-lg border border-slate-200">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-100 mb-6">
                <HeartPulse className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Cardio Guard Support</h3>
              <p className="text-slate-600 mb-6 flex items-center justify-center lg:justify-start gap-2">
                <Clock className="h-5 w-5 text-emerald-600" />
                24/7 Cardiac Health Assistance
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-slate-700 flex items-center gap-2 justify-center lg:justify-start">
                    <Phone className="h-5 w-5 text-emerald-600" />
                    Emergency Contact:
                  </p>
                  <p className="text-slate-600">+1 (800) CAR-DIAC</p>
                </div>
                <div>
                  <p className="font-medium text-slate-700 flex items-center gap-2 justify-center lg:justify-start">
                    <Mail className="h-5 w-5 text-emerald-600" />
                    General Support:
                  </p>
                  <p className="text-slate-600">support@cardioguard.com</p>
                </div>
                <div>
                  <p className="font-medium text-slate-700 flex items-center gap-2 justify-center lg:justify-start">
                    <Mail className="h-5 w-5 text-emerald-600" />
                    Technical Support:
                  </p>
                  <p className="text-slate-600">tech@cardioguard.com</p>
                </div>
              </div>
            </div>

            {/* Pulse Animation */}
            <div className="relative h-2 mt-8 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 right-0 h-full bg-emerald-500"
                animate={{
                  scaleX: [0, 1.5, 0],
                  opacity: [0.5, 1, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;