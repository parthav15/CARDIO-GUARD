import { useState } from 'react';
import { AlertCircle, Check, Clock, FileText, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SubmittedFeedbacks = () => {
  const [feedbacks] = useState([
    {
      id: 1,
      title: 'Feature Request: Night Mode',
      content: 'It would be great to have a dark mode option for better nighttime use of the application.',
      status: 'pending',
      date: '3 days ago'
    },
    {
      id: 2,
      title: 'Bug Report: Camera Feed Issue',
      content: 'Experiencing lag in the camera feed during heart rate monitoring.',
      status: 'resolved',
      date: '1 week ago'
    },
    {
      id: 3,
      title: 'Suggestion: Mobile App',
      content: 'Would love to see a mobile version of Cardio Guard for on-the-go monitoring.',
      status: 'reviewing',
      date: '2 weeks ago'
    }
  ]);

  const getStatusConfig = (status) => {
    const config = {
      resolved: {
        icon: <Check className="w-4 h-4" />,
        color: 'bg-emerald-100 text-emerald-700',
        bg: 'bg-emerald-50'
      },
      pending: {
        icon: <Clock className="w-4 h-4" />,
        color: 'bg-amber-100 text-amber-700',
        bg: 'bg-amber-50'
      },
      reviewing: {
        icon: <AlertCircle className="w-4 h-4" />,
        color: 'bg-blue-100 text-blue-700',
        bg: 'bg-blue-50'
      },
      default: {
        icon: <AlertCircle className="w-4 h-4" />,
        color: 'bg-slate-100 text-slate-700',
        bg: 'bg-slate-50'
      }
    };
    return config[status] || config.default;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <FileText className="h-6 w-6 text-emerald-600" />
        <h2 className="text-2xl font-bold text-slate-800">Your Feedback Submissions</h2>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-4">
        {feedbacks.map((feedback) => {
          const status = getStatusConfig(feedback.status);
          return (
            <motion.div 
              key={feedback.id}
              whileHover={{ y: -2 }}
              className={`p-5 rounded-xl shadow-sm border ${status.bg} border-slate-200`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-slate-800">{feedback.title}</h3>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                  {status.icon}
                  {feedback.status}
                </span>
              </div>

              <p className="text-slate-600 mt-2">{feedback.content}</p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-slate-500">{feedback.date}</span>
                <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                  View Details
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Overview */}
      <div className="mt-8">
        <div className="flex items-center gap-3 mb-4">
          <BarChart2 className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-slate-800">Feedback Overview</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: 12, color: 'bg-slate-100 text-slate-800' },
            { label: 'Resolved', value: 8, color: 'bg-emerald-100 text-emerald-800' },
            { label: 'Pending', value: 3, color: 'bg-amber-100 text-amber-800' },
            { label: 'In Review', value: 1, color: 'bg-blue-100 text-blue-800' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className={`p-4 rounded-xl shadow-sm ${stat.color}`}
            >
              <p className="text-sm font-medium text-slate-600">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmittedFeedbacks;