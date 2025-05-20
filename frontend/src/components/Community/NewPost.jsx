import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { HeartPulse, Image, ArrowRight } from "lucide-react";

const API_URL = `${BASE_URL}/community/create_post/`;

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login-register", { replace: true });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication required. Please log in.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) formData.append("image", image);

        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success("Post created successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => navigate("/community"), 2000);
            } else {
                setError(response.data.message || "Failed to create post.");
            }
        } catch (err) {
            setError("Error submitting post. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50 flex flex-col items-center py-12"
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200"
                >
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center mb-8"
                    >
                        <div className="p-3 rounded-full bg-emerald-100 mb-4">
                            <HeartPulse className="h-7 w-7 text-emerald-600" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center">
                            Create New Community Post
                        </h1>
                        <p className="text-slate-600 mt-2 text-center">
                            Share your heart health experiences with the Cardio Guard community
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-rose-500 text-sm text-center p-3 bg-rose-50 rounded-lg"
                            >
                                {error}
                            </motion.p>
                        )}

                        {/* Title Input */}
                        <div>
                            <label className="block text-slate-700 text-sm font-medium mb-2">Post Title</label>
                            <input
                                type="text"
                                placeholder="Enter a descriptive title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 placeholder-slate-400"
                            />
                        </div>

                        {/* Content Input */}
                        <div>
                            <label className="block text-slate-700 text-sm font-medium mb-2">Post Content</label>
                            <textarea
                                placeholder="Share your thoughts, questions, or experiences..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows="6"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 placeholder-slate-400"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-slate-700 text-sm font-medium mb-2">Add Image (Optional)</label>
                            <label className="flex flex-col items-center justify-center w-full bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-6 cursor-pointer hover:border-emerald-400 transition-colors">
                                <div className="flex flex-col items-center justify-center">
                                    <Image className="h-8 w-8 text-slate-400 mb-2" />
                                    <p className="text-sm text-slate-500">
                                        {image ? image.name : "Click to upload or drag and drop"}
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                            Publish Post <ArrowRight className="h-4 w-4" />
                        </motion.button>
                    </motion.form>
                </motion.div>
            </motion.div>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ backgroundColor: "#059669", color: "white" }}
            />
        </>
    );
}