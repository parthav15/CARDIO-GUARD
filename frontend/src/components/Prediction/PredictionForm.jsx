import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  Info,
  RefreshCw,
  User,
  Clock,
  Scale,
  BarChart2,
  ClipboardList,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const OptionCard = ({ label, description, value, isSelected, onClick }) => (
  <motion.div
    onClick={onClick}
    className={`p-5 rounded-xl border cursor-pointer transition-all
      ${isSelected ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-300 hover:border-emerald-300'}
    `}
    whileHover={{ scale: 1.02 }}
  >
    <h3 className="text-lg font-semibold text-slate-800 mb-2">{label}</h3>
    <p className="text-sm text-slate-600">{description}</p>
    <div className={`mt-3 text-xs ${isSelected ? 'text-emerald-600' : 'text-slate-500'}`}>
      {isSelected ? '✓ Selected' : 'Click to select'}
    </div>
  </motion.div>
);

const NumericalInput = ({ label, unit, help, value, onChange, suggestions }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-slate-800">
      <span className="font-medium">{label}</span>
      {unit && <span className="text-sm text-slate-500">({unit})</span>}
    </div>

    <div className="flex gap-3 flex-wrap">
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="flex-1 px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
        placeholder={`Enter ${label}`}
      />

      {suggestions && (
        <div className="flex gap-2 flex-wrap">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onChange({ target: { value: suggestion } })}
              className="px-3 py-1 text-sm bg-slate-100 rounded-lg hover:bg-slate-200
                         border border-slate-300 text-slate-700 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>

    {help && <p className="text-sm text-slate-500 mt-1">{help}</p>}
  </div>
);

const PredictionForm = ({ onSubmit, predictionResult, loading }) => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [stepDirection, setStepDirection] = useState(1);

  const fieldGroups = [
    ["age", "sex", "cp"],
    ["trestbps", "chol", "fbs"],
    ["restecg", "thalach", "exang"],
    ["oldpeak", "slope", "ca", "thal"],
  ];

  const fieldDetails = {
    age: {
      label: "Age",
      unit: "years",
      help: "Enter your age in years (29-77)",
      icon: User,
      suggestions: [30, 45, 60, 75]
    },
    sex: {
      label: "Biological Sex",
      icon: User,
      options: [
        { value: 1, label: "Female", description: "Assigned female at birth" },
        { value: 0, label: "Male", description: "Assigned male at birth" }
      ]
    },
    cp: {
      label: "Chest Pain Type",
      icon: HeartPulse,
      options: [
        { value: 1, label: "Yes" },
        { value: 0, label: "No" }
      ]
    },
    trestbps: {
      label: "Resting Blood Pressure",
      unit: "mm Hg",
      help: "Your blood pressure at rest (94-200)",
      icon: Scale,
      suggestions: [120, 140, 160, 180]
    },
    chol: {
      label: "Cholesterol Level",
      unit: "mg/dl",
      help: "Serum cholesterol in mg/dl (126-564)",
      icon: Clock,
      suggestions: [200, 240, 280, 320]
    },
    fbs: {
      label: "Fasting Blood Sugar",
      icon: Info,
      options: [
        { value: 0, label: "Not sure", description: "I don't know my fasting blood sugar" },
        { value: 1, label: "Normal (< 120 mg/dl)", description: "Fasting blood sugar below 120 mg/dl" },
        { value: 2, label: "High (> 120 mg/dl)", description: "Fasting blood sugar above 120 mg/dl" }
      ]
    },
    restecg: {
      label: "Resting ECG",
      icon: BarChart2,
      options: [
        { value: 0, label: "Not sure", description: "I don't know my ECG results" },
        { value: 1, label: "Normal", description: "Normal resting electrocardiogram" },
        { value: 2, label: "ST-T Abnormality", description: "Abnormal ST-T wave changes" },
        { value: 3, label: "LV Hypertrophy", description: "Left ventricular hypertrophy" }
      ]
    },
    thalach: {
      label: "Max Heart Rate",
      unit: "bpm",
      help: "Highest heart rate achieved (71-202)",
      icon: User,
      suggestions: [120, 150, 180, 200]
    },
    exang: {
      label: "Exercise Angina",
      icon: HeartPulse,
      options: [
        { value: 0, label: "Not sure", description: "I don't know if I have exercise-induced angina" },
        { value: 1, label: "No", description: "No chest pain during exercise" },
        { value: 2, label: "Yes", description: "Experience chest pain during exercise" }
      ]
    },
    oldpeak: {
      label: "ST Depression",
      unit: "mm",
      help: "ST depression induced by exercise (0-6.2)",
      icon: Scale,
      suggestions: [1.0, 2.0, 3.0, 4.0]
    },
    slope: {
      label: "ST Slope",
      icon: BarChart2,
      options: [
        { value: 0, label: "Not sure", description: "I don't know my ST slope results" },
        { value: 1, label: "Upsloping", description: "Upward sloping ST segment" },
        { value: 2, label: "Flat", description: "Flat ST segment" },
        { value: 3, label: "Downsloping", description: "Downward sloping ST segment" }
      ]
    },
    ca: {
      label: "Major Vessels",
      help: "Number of major vessels (0-4) colored by flourosopy",
      suggestions: [0, 1, 2, 3, 4]
    },
    thal: {
      label: "Thalassemia",
      icon: Info,
      options: [
        { value: 0, label: "Not sure", description: "I don't know my thalassemia results" },
        { value: 1, label: "Normal", description: "Normal blood flow" },
        { value: 2, label: "Fixed Defect", description: "Permanent blood flow defect" },
        { value: 3, label: "Reversible Defect", description: "Temporary blood flow defect" }
      ]
    }
  };

  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        value === "" ? 0 : Number(value)
      ])
    );
    if (currentStep === fieldGroups.length - 1) {
      onSubmit(processedData);
    }
  };

  const handleStepChange = (newStep) => {
    const direction = newStep > currentStep ? 1 : -1;
    setStepDirection(direction);
    setCurrentStep(newStep);
  };

  const renderField = (field) => {
    const config = fieldDetails[field];
    const IconComponent = config?.icon || Info;

    if (config?.options) {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-800 mb-3">
            <IconComponent className="h-5 w-5 text-emerald-600" />
            <h3 className="font-medium">{config.label}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {config.options.map((option) => (
              <OptionCard
                key={option.value}
                label={option.label}
                description={option.description}
                isSelected={formData[field] == option.value}
                onClick={() => setFormData({ ...formData, [field]: option.value })}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <NumericalInput
        label={config?.label || field}
        unit={config?.unit}
        help={config?.help}
        value={formData[field]}
        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
        suggestions={config?.suggestions}
      />
    );
  };

  return (
    <motion.div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 relative">
      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RefreshCw className="h-8 w-8 text-emerald-600 animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-emerald-100">
          <HeartPulse className="h-6 w-6 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Heart Health Assessment</h2>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="text-emerald-600 hover:text-emerald-700 ml-auto"
        >
          <Info className="h-5 w-5" />
        </button>
      </div>

      {showHelp && (
        <motion.div
          className="bg-emerald-50 p-4 rounded-lg mb-6 border border-emerald-100"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className="text-slate-700 text-sm">
            Please provide accurate medical information for the best prediction results. All data is securely processed and never stored.
          </p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait" custom={stepDirection}>
          <motion.div
            key={currentStep}
            custom={stepDirection}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {fieldGroups[currentStep].map((field) => (
              <div key={field} className="space-y-5">
                {renderField(field)}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between pt-4">
          <motion.button
            type="button"
            onClick={() => handleStepChange(currentStep - 1)}
            disabled={currentStep === 0}
            className="flex items-center gap-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent"
            whileHover={{ scale: currentStep === 0 ? 1 : 1.03 }}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </motion.button>

          {currentStep < fieldGroups.length - 1 ? (
            <motion.button
              type="button"
              onClick={() => handleStepChange(currentStep + 1)}
              className="flex items-center gap-1 px-6 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700"
              whileHover={{ scale: 1.03 }}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow hover:shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Prediction
            </motion.button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {predictionResult && (
          <motion.div
            className={`mt-6 p-5 rounded-lg border ${
              predictionResult.includes("not likely")
                ? "bg-emerald-50 border-emerald-200"
                : "bg-rose-50 border-rose-200"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <h3
              className={`text-lg font-semibold mb-3 ${
                predictionResult.includes("not likely")
                  ? "text-emerald-700"
                  : "text-rose-700"
              }`}
            >
              {predictionResult.includes("not likely")
                ? "✅ Low Risk Detected"
                : "⚠ Potential Risk Detected"}
            </h3>
            <p className="text-slate-700">{predictionResult}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PredictionForm;
