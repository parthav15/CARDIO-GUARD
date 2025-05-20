import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/HomePage/Navbar';
import HeroSection from '../components/HomePage/HeroSection';
import Feature_1 from '../components/HomePage/Feature_1';
import Feature_2 from '../components/HomePage/Feature_2';
import Feature_3 from '../components/HomePage/Feature_3';
import Feature_4 from '../components/HomePage/Feature_4';
import ContactSection from '../components/HomePage/ContactUs';
import Footer from '../components/HomePage/Footer';

function HomePage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-emerald-50">
      <Navbar />
      
      <main className="overflow-hidden">
        <HeroSection />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 space-y-24 md:space-y-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <Feature_1 />
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <Feature_2 />
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <Feature_3 />
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <Feature_4 />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-50 to-teal-50 py-16"
        >
          <ContactSection />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;