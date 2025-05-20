import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Feature_4 = () => {
  const testimonials = [
    {
      name: "Dr. Emily Sanders",
      role: "Cardiologist",
      location: "New York, USA",
      text: "Cardio Guard has transformed how we approach preventive care. The AI predictions align remarkably well with our clinical assessments.",
      rating: 5,
      avatar: "👩⚕️"
    },
    {
      name: "Michael Chen",
      role: "Patient",
      location: "Toronto, Canada",
      text: "The community support and early risk detection gave me a second chance at life. Forever grateful!",
      rating: 5,
      avatar: "👨💻"
    },
    {
      name: "HealthFirst Clinic",
      role: "Medical Institution",
      location: "London, UK",
      text: "Implementation reduced our diagnostic time by 40% while maintaining 98% accuracy. Essential tool for modern healthcare.",
      rating: 4.8,
      avatar: "🏥"
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 to-teal-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-100 mb-6">
            <Star className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Trusted by <span className="text-emerald-600">Thousands</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join 50,000+ users who've transformed their heart health journey with Cardio Guard
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:border-emerald-300 transition-all duration-300"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <h3 className="text-slate-800 font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-emerald-600">{testimonial.role}</p>
                  <p className="text-xs text-slate-500">{testimonial.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`}
                  />
                ))}
                <span className="text-sm text-slate-500 ml-2">
                  {testimonial.rating}
                </span>
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-600 italic">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center"
        >
          {[
            { value: "50K+", label: "Active Users", color: "text-emerald-600" },
            { value: "92%", label: "Accuracy Rate", color: "text-teal-600" },
            { value: "4.9/5", label: "Average Rating", color: "text-amber-500" },
            { value: "10M+", label: "Predictions Made", color: "text-sky-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-4 bg-white rounded-xl shadow-sm border border-slate-200"
            >
              <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-slate-600 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_4;