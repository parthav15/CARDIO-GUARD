import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { BASE_URL } from '../config';
import { HeartPulse, Star } from 'lucide-react';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login-register');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message || rating === 0) {
      toast.error('Please fill out all fields and provide a rating!');
      return;
    }

    const payload = {
      ...formData,
      rating: rating
    };

    const token = localStorage.getItem('token');
    
    fetch(`${BASE_URL}feedback/add_feedback/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success('Thank you for your valuable feedback!');
          setFormData({ name: '', email: '', message: '' });
          setRating(0);
        } else {
          toast.error(data.message || 'Submission failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again.');
      });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50 flex flex-col">
      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
        toastStyle={{ backgroundColor: '#059669' }}
      />

      <motion.div 
        className="flex-grow flex items-center justify-center p-4 sm:p-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-100 mb-4">
              <HeartPulse className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">
              Share Your <span className="text-emerald-600">Experience</span>
            </h2>
            <p className="mt-2 text-slate-600">
              Your feedback helps us improve heart health services
            </p>
          </div>

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
                <label className="block text-slate-700 font-medium mb-2">Your Feedback</label>
                <textarea
                  name="message"
                  placeholder="Share your thoughts..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 placeholder-slate-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-2">Rating</label>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="focus:outline-none"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'fill-emerald-500 text-emerald-500'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Submit Feedback
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default FeedbackPage;