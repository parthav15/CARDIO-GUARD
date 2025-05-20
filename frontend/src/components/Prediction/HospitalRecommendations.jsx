import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, HeartPulse } from "lucide-react";
import { BASE_URL } from "../../config";

const HospitalRecommendations = ({ hasRisk }) => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Error getting location:", error)
    );
  }, []);

  useEffect(() => {
    if (location) {
      fetchNearbyHospitals();
    }
  }, [location]);

  const handleGetDirections = (hospitalLat, hospitalLng) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hospitalLat},${hospitalLng}`;
    window.open(mapsUrl, '_blank');
  };

  const fetchNearbyHospitals = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const response = await fetch(`${BASE_URL}cardio/find_nearby_hospitals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          latitude: location.lat,
          longitude: location.lng,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch hospitals");
      
      const data = await response.json();
      data.success ? setHospitals(data.hospitals) : setHospitals([]);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-emerald-100">
          <MapPin className="h-5 w-5 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">
          {hasRisk ? "Recommended Cardiac Centers" : "Cardiac Health Resources"}
        </h2>
      </div>

      <p className="text-slate-600 mb-6">
        {hasRisk
          ? "Based on your results, we recommend consulting these specialized cardiac centers:"
          : "Maintain your heart health with these recommended resources:"}
      </p>

      {loading && (
        <div className="h-64 bg-slate-100 rounded-lg flex flex-col items-center justify-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
          <p className="text-slate-500">Finding nearby hospitals...</p>
        </div>
      )}

      {error && (
        <div className="h-64 bg-rose-50 rounded-lg flex items-center justify-center border border-rose-200">
          <p className="text-rose-600">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-3">
          {hospitals.map((hospital) => (
            <motion.div 
              key={hospital.place_id} 
              className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors"
              whileHover={{ y: -2 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {hospital.name}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">{hospital.vicinity}</p>
                </div>
                <motion.button
                  onClick={() => handleGetDirections(
                    hospital.geometry.location.lat,
                    hospital.geometry.location.lng
                  )}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm">Directions</span>
                </motion.button>
              </div>

              <div className="flex items-center mt-3">
                <span className="text-amber-500 text-sm font-medium">
                  {hospital.rating} ★
                </span>
                <span className="text-slate-500 text-sm ml-2">
                  ({hospital.user_ratings_total} reviews)
                </span>
              </div>
              
              {hospital.opening_hours?.open_now && (
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <p className="text-emerald-600 text-sm">Open Now</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className={`flex items-start gap-2 p-3 rounded-lg ${hasRisk ? 'bg-rose-50 border border-rose-200' : 'bg-emerald-50 border border-emerald-200'}`}>
          <HeartPulse className={`h-5 w-5 mt-0.5 ${hasRisk ? 'text-rose-600' : 'text-emerald-600'}`} />
          <p className={`text-sm ${hasRisk ? 'text-rose-700' : 'text-emerald-700'}`}>
            {hasRisk
              ? "Please consult a cardiologist within the next 48 hours"
              : "Regular checkups help maintain heart health"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HospitalRecommendations;