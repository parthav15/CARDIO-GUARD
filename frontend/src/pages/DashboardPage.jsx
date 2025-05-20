import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MessageSquare, AlertCircle, Settings, LogOut, HeartPulse } from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import Profile from '../components/Dashboard/Profile';
import CommunityPosts from '../components/Dashboard/CommunityPosts';
import SubmittedFeedbacks from '../components/Dashboard/SubmittedFeedbacks';
import SettingsPanel from '../components/Dashboard/SettingsPanel';
import { BASE_URL } from '../config';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const userString = localStorage.getItem('user');
  const userObj = JSON.parse(userString);
  const [profileData, setProfileData] = useState(userObj);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login-register';
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'profile': return <Profile user={profileData} />;
      case 'posts': return <CommunityPosts />;
      case 'feedbacks': return <SubmittedFeedbacks />;
      case 'settings': return <SettingsPanel />;
      default: return <Profile user={profileData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50 flex flex-col">
      <Navbar />
      
      {/* Grid Layout Container */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-[auto_1fr] flex-1">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="lg:w-64 bg-white shadow-lg lg:h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto border-r border-slate-200"
        >
          <div className="p-6">
            <div className="flex items-center gap-4 mb-8 p-4 bg-emerald-50 rounded-xl">
              <div className="relative">
                <img
                  src={`${BASE_URL}media/${profileData.profile_picture}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
                />
                <HeartPulse className="absolute -bottom-1 -right-1 h-5 w-5 text-emerald-600 bg-white rounded-full p-0.5 border border-emerald-200" />
              </div>
              <div>
                <h3 className="text-slate-800 font-medium">{profileData.first_name} {profileData.last_name}</h3>
                <p className="text-sm text-slate-500">{profileData.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'profile', icon: <User size={18} className="text-emerald-600" />, label: 'Profile' },
                { id: 'posts', icon: <MessageSquare size={18} className="text-emerald-600" />, label: 'My Posts' },
                { id: 'feedbacks', icon: <AlertCircle size={18} className="text-emerald-600" />, label: 'Feedbacks' },
                { id: 'settings', icon: <Settings size={18} className="text-emerald-600" />, label: 'Settings' },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id 
                      ? 'bg-emerald-100 text-emerald-700 font-medium shadow-inner'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-lg mt-8 transition-all"
              >
                <LogOut size={18} className="text-rose-600" />
                <span>Logout</span>
              </motion.button>
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <main className="lg:h-[calc(100vh-5rem)] overflow-y-auto p-4 lg:p-8 bg-slate-50">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-xl shadow-md p-6 lg:p-8 border border-slate-200"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default DashboardPage;