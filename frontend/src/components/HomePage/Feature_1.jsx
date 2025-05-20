import { motion } from "framer-motion";
import { HeartPulse, Sparkles, Shield, Activity } from "lucide-react";

const Feature_1 = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full pattern-dots pattern-emerald-500 pattern-opacity-20 pattern-size-8" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-24">
          {/* Left Column - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-8"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <div className="p-3 rounded-full bg-emerald-100">
                <HeartPulse className="h-6 w-6 text-emerald-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                Advanced Cardiac <span className="text-emerald-600">Protection</span>
              </h2>
            </motion.div>

            <p className="text-lg text-slate-600 leading-relaxed">
              Cardio Guard leverages cutting-edge machine learning to analyze health parameters and 
              predict cardiovascular risks with clinical-grade accuracy. Our platform bridges 
              technology and healthcare for proactive heart health management.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-2 rounded-full bg-emerald-100 mt-1">
                  <Activity className="h-5 w-5 text-emerald-600" />
                </div>
                <p className="text-slate-700">
                  Real-time risk assessment powered by deep learning algorithms
                </p>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-2 rounded-full bg-emerald-100 mt-1">
                  <Shield className="h-5 w-5 text-emerald-600" />
                </div>
                <p className="text-slate-700">
                  Personalized preventive care recommendations tailored to your health profile
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-xl aspect-square">
              {/* Floating Elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0"
              >
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-emerald-200 to-transparent rounded-full blur-xl opacity-30" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-l from-teal-200 to-transparent rounded-full blur-xl opacity-30" />
              </motion.div>

              {/* Main Visual */}
              <div className="relative z-10 text-center p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  className="inline-block"
                >
                  <div className="inline-flex items-center justify-center p-6 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 mb-6">
                    <HeartPulse className="h-12 w-12 text-emerald-600" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
                    Cardio <span className="text-emerald-600">Guard</span>
                  </h2>
                  <p className="text-lg text-slate-600">
                    Your intelligent heart health companion
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Floating Elements */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-emerald-400 rounded-full"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 100 - 50 + "%",
            y: Math.random() * 100 - 50 + "%"
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
            x: Math.random() * 100 - 50 + "%",
            y: Math.random() * 100 - 50 + "%"
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </section>
  );
};

export default Feature_1;