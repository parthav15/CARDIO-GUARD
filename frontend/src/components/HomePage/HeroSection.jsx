import { motion } from "framer-motion";
import { useState } from "react";
import videoSource from '../../assets/cardio_video.mp4';
import { HeartPulse, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-800/20 to-slate-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-100/20 backdrop-blur-sm mb-8">
            <HeartPulse className="h-8 w-8 text-emerald-400" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Revolutionizing <span className="text-emerald-400">Heart Health</span> with AI
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto"
          >
            Our advanced algorithms predict cardiovascular risks with unprecedented accuracy, 
            empowering both patients and healthcare professionals with proactive insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a 
              href='/login-register'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all">
                Get Started <ArrowRight className="h-4 w-4" />
              </button>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Pulse Animation */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-900/50 to-transparent z-20">
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-emerald-400"
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
    </section>
  );
};

export default HeroSection;