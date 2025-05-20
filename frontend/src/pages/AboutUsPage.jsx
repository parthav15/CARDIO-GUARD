import { motion } from 'framer-motion';
import { HeartPulse, Users, BarChart3, GraduationCap } from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';

const AboutUs = () => {
  const teamMembers = [
    { name: 'Dr. Rajesh Sharma', role: 'Lead Cardiologist', exp: '15+ years' },
    { name: 'Dr. Priya Singh', role: 'Research Head', exp: 'PhD in ML' },
    { name: 'Arjun Mehta', role: 'Full Stack Developer', exp: 'HealthTech Expert' },
    { name: 'Ananya Reddy', role: 'Patient Care Lead', exp: '10+ years' },
  ];

  const stats = [
    { number: '50K+', label: 'Lives Impacted' },
    { number: '92%', label: 'Prediction Accuracy' },
    { number: '150+', label: 'Medical Partners' },
    { number: '24/7', label: 'Support Available' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-emerald-900">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-24 px-6 text-center"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-10"
          >
            <div className="relative inline-block">
              <HeartPulse className="h-20 w-20 text-emerald-400 mx-auto animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping opacity-75"></div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-500">
              Protecting Hearts with Intelligent Care
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-lg text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Cardio Guard pioneers a new era in cardiovascular health, blending clinical excellence with artificial intelligence to provide proactive, personalized heart care solutions.
          </motion.p>

          {/* Pulse Animation */}
          <div className="absolute bottom-0 left-0 w-full h-2 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 right-0 h-full bg-emerald-400"
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
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6 relative">
              <span className="relative inline-block">
                Our Mission
                <span className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400/50"></span>
              </span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              We're committed to making advanced cardiac care accessible through AI-powered early detection systems, personalized treatment recommendations, and continuous remote monitoring.
            </p>
            <div className="flex items-start gap-4 p-6 bg-slate-700/30 rounded-xl border border-slate-600/50 hover:border-emerald-400/30 transition-all">
              <GraduationCap className="h-8 w-8 text-emerald-400 mt-1 flex-shrink-0" />
              <p className="text-slate-300">
                Collaborating with leading medical institutions worldwide to validate and improve our algorithms
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="p-6 bg-slate-700/20 rounded-xl border border-slate-600/30 hover:bg-slate-700/40 transition-all"
              >
                <div className="text-3xl font-bold text-emerald-400 mb-2">{stat.number}</div>
                <div className="text-slate-300 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900/70 to-emerald-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-4 mb-6 rounded-full bg-slate-800/50 border border-slate-700/50">
              <Users className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Experts</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              A world-class team combining decades of clinical experience with cutting-edge technology expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-emerald-400/50 transition-all"
              >
                <div className="h-48 w-full mb-4 rounded-lg bg-gradient-to-br from-slate-700/50 to-emerald-900/50 group-hover:to-emerald-800/50 transition-all"></div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-emerald-400 mb-2 text-sm font-medium">{member.role}</p>
                <p className="text-slate-400 text-sm">{member.exp}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-4 mb-6 rounded-full bg-slate-700/30 border border-slate-600/50">
              <BarChart3 className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Principles</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="p-8 bg-slate-700/30 rounded-xl border border-slate-600/50 hover:border-emerald-400/30 transition-all"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <HeartPulse className="h-5 w-5 text-emerald-400 mr-2" />
                Patient Centric
              </h3>
              <p className="text-slate-300">
                We design every tool and algorithm with the patient's health journey as our north star.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-slate-700/30 rounded-xl border border-slate-600/50 hover:border-emerald-400/30 transition-all"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 text-emerald-400 mr-2" />
                Evidence-Based
              </h3>
              <p className="text-slate-300">
                Our solutions undergo rigorous clinical validation and peer review before deployment.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-slate-700/30 rounded-xl border border-slate-600/50 hover:border-emerald-400/30 transition-all"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 text-emerald-400 mr-2" />
                Continuous Advancement
              </h3>
              <p className="text-slate-300">
                Daily model updates incorporating the latest medical research and real-world data.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;