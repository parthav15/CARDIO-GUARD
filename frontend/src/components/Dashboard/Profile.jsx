import React, { useState } from 'react';
import { Pencil, HeartPulse, User, Mail, Phone, Save } from 'lucide-react';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState(user);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const { data } = await axios.post(`${BASE_URL}users/edit_user_details/`, new FormData(e.target), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user_details));
        setProfileData(data.user_details);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const formData = new FormData();
      formData.append('profile_picture', file);

      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`${BASE_URL}users/edit_profile_picture/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.user_details));
          setProfileData(data.user_details);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Error updating profile picture');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <HeartPulse className="h-8 w-8 text-emerald-600" />
        <h2 className="text-2xl font-bold text-slate-800">
          Profile Settings
        </h2>
      </div>
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 p-1 shadow-md">
            <div className="w-full h-full bg-white rounded-full overflow-hidden flex items-center justify-center">
              {profileData.profile_picture ? (
                <img
                  src={`${BASE_URL}media/${profileData.profile_picture}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-16 w-16 text-emerald-600" />
              )}
            </div>
          </div>
          <label className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-slate-100 transition-colors">
            <Pencil className="h-4 w-4 text-emerald-600" />
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleProfilePictureChange} 
              className="hidden" 
            />
          </label>
        </div>
        
        <div className="space-y-2 flex-1">
          <h3 className="text-xl font-semibold text-slate-800">
            {profileData.first_name} {profileData.last_name}
          </h3>
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="h-4 w-4" />
            <span>{profileData.email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <User className="h-4 w-4" />
            <span>@{profileData.username}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Phone className="h-4 w-4" />
            <span>{profileData.phone_number || 'Not provided'}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              name="first_name"
              value={profileData.first_name}
              onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              name="last_name"
              value={profileData.last_name}
              onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              name="username"
              value={profileData.username}
              onChange={(e) => setProfileData({...profileData, username: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              name="phone_number"
              value={profileData.phone_number}
              onChange={(e) => setProfileData({...profileData, phone_number: e.target.value})}
            />
          </div>
        </div>
        <motion.button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save className="h-4 w-4" />
          Update Profile
        </motion.button>
      </form>
    </div>
  );
};

export default Profile;