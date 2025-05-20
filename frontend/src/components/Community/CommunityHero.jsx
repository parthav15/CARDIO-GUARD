import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";

export default function CommunityHero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-emerald-600 to-teal-600 min-h-[50vh] flex items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
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

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl text-center mt-20 relative z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
            <HeartPulse className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome To <br />
          <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            Cardio Guard  
          </span>{" "}
          Community
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-lg text-emerald-100 mb-6 max-w-2xl mx-auto"
        >
          Join heart health advocates, medical professionals, and AI enthusiasts in our vibrant community dedicated to cardiovascular wellness.
        </motion.p>
        
        {/* Pulse Animation */}
        <div className="absolute bottom-6 left-0 w-full h-16 bg-gradient-to-t from-emerald-600/50 to-transparent z-20">
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-white"
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
    </motion.section>
  );
}