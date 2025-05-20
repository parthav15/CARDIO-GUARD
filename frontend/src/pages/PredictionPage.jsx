import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../components/HomePage/Navbar";
import Footer from "../components/HomePage/Footer";
import PredictionForm from "../components/Prediction/PredictionForm";
import HospitalRecommendations from "../components/Prediction/HospitalRecommendations";
import { BASE_URL } from "../config";
import { HeartPulse } from "lucide-react";

const PredictionPage = () => {
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHospitals, setShowHospitals] = useState(false);

  const handlePrediction = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setShowHospitals(false);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const response = await axios.post(
        `${BASE_URL}cardio/predict/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setPredictionResult(response.data.prediction);
        setShowHospitals(true);
      } else {
        throw new Error(response.data.message || "Prediction failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50">
      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-100 mb-4">
            <HeartPulse className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">
            Heart Health <span className="text-emerald-600">Assessment</span>
          </h1>
          <p className="text-slate-600 mt-2">
            Get your personalized cardiovascular risk prediction
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <PredictionForm
            onSubmit={handlePrediction}
            predictionResult={predictionResult}
            loading={loading}
          />
        </motion.div>

        {showHospitals && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <HospitalRecommendations
              hasRisk={predictionResult?.includes("likely")}
            />
          </motion.div>
        )}

        {error && (
          <motion.div
            className="mt-8 p-4 bg-rose-100 text-rose-700 rounded-lg border border-rose-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-rose-600" />
              <span>Error: {error}</span>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PredictionPage;
