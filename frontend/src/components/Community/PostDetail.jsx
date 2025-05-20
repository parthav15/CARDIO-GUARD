import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MessageSquare, HeartPulse, Reply, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import { BASE_URL } from "../../config";

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [reply, setReply] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const [token, setToken] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem("token");
        if (tokenFromStorage) {
            setToken(tokenFromStorage);
        }
    }, []);

    useEffect(() => {
        if (token) {
            axios
                .get(`${BASE_URL}community/posts/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response.data.success) {
                        setPost(response.data.post);
                    }
                })
                .catch((error) => console.error("Error fetching post:", error))
                .finally(() => setLoading(false));
        }
    }, [id, token]);

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}community/create_comment/${id}/`,
                { content: comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                setComment("");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    const handleReplySubmit = async (commentId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}community/create_reply/${commentId}/`,
                { content: reply[commentId] },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating reply:", error);
        }
    };

    const toggleReplyInput = (commentId) => {
        setShowReplyInput(prev => ({ ...prev, [commentId]: !prev[commentId] }));
        setReply(prev => ({ ...prev, [commentId]: "" }));
    };

    if (loading) return <div className="text-center mt-5 text-slate-500">Loading...</div>;
    if (!post) return <div className="text-center mt-5 text-slate-500">Post not found.</div>;

    return (
        <>
            <Navbar />
            <main className="flex-grow min-h-screen w-full px-4 md:px-10 py-8 bg-gradient-to-b from-slate-50 to-emerald-50">
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-emerald-600 mb-6 hover:text-emerald-700 flex items-center gap-2 transition-colors"
                    onClick={() => navigate("/community")}
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to discussions
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Post Header */}
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-emerald-100">
                            <HeartPulse className="h-6 w-6 text-emerald-600" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{post.post.title}</h1>
                    </div>

                    {/* Post Meta */}
                    <div className="flex items-center gap-4 text-slate-500 text-sm">
                        <span>
                            {new Date(post.post.created_at).toLocaleString()}
                        </span>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                            Community Discussion
                        </span>
                    </div>

                    {/* Post Content */}
                    <motion.div
                        className="p-6 bg-white rounded-xl shadow-sm border border-slate-200"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-slate-700 leading-relaxed">{post.post.content}</p>
                        {post.post.image && (
                            <motion.div
                                className="mt-6 overflow-hidden rounded-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <img
                                    src={`${BASE_URL}${post.post.image}`}
                                    alt="Post"
                                    className="w-full max-w-2xl h-96 object-cover rounded-xl"
                                />
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Author Info */}
                    {post.post.user && (
                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-emerald-600" />
                            </div>
                            <p className="text-slate-600">Posted by {post.post.user}</p>
                        </div>
                    )}
                </motion.div>

                {/* Comments Section */}
                <motion.div
                    className="mt-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-3">
                        <MessageSquare className="w-6 h-6 text-emerald-600" />
                        Community Responses
                    </h2>

                    <motion.div className="space-y-4" variants={containerVariants}>
                        {/* Comment Input */}
                        <motion.div
                            className="p-4 bg-white rounded-xl shadow-sm border border-slate-200"
                            variants={itemVariants}
                        >
                            <textarea
                                className="w-full p-3 bg-slate-50 text-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 border border-slate-200"
                                rows="3"
                                placeholder="Share your thoughts..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCommentSubmit}
                                className="mt-3 px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                            >
                                Post Response
                            </motion.button>
                        </motion.div>

                        {/* Comments List */}
                        <AnimatePresence>
                            {post.comments.length > 0 ? (
                                post.comments.map((c) => (
                                    <motion.div
                                        key={c.id}
                                        className="bg-white rounded-xl shadow-sm p-4 border border-slate-200"
                                        variants={itemVariants}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <div className="flex gap-4">
                                            <img
                                                src={`https://api.dicebear.com/9.x/initials/svg?seed=${c.user}&background=%2304a777&color=white`}
                                                alt={c.user}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium text-emerald-700">{c.user}</p>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        onClick={() => toggleReplyInput(c.id)}
                                                        className="text-slate-500 hover:text-emerald-600 flex items-center gap-1 text-sm"
                                                    >
                                                        <Reply className="w-4 h-4" />
                                                        <span>Reply</span>
                                                    </motion.button>
                                                </div>
                                                <p className="mt-1 text-slate-600">{c.content}</p>

                                                {/* Reply Input */}
                                                <AnimatePresence>
                                                    {showReplyInput[c.id] && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="mt-4 pl-8 border-l-2 border-slate-200"
                                                        >
                                                            <textarea
                                                                className="w-full p-2 bg-slate-50 text-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 border border-slate-200"
                                                                rows="2"
                                                                placeholder="Write your reply..."
                                                                value={reply[c.id] || ""}
                                                                onChange={(e) => setReply(prev => ({ ...prev, [c.id]: e.target.value }))}
                                                            />
                                                            <div className="flex gap-2 mt-2">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                    onClick={() => handleReplySubmit(c.id)}
                                                                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-sm"
                                                                >
                                                                    Post Reply
                                                                </motion.button>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                    onClick={() => toggleReplyInput(c.id)}
                                                                    className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </motion.button>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Replies List */}
                                                {c.replies?.length > 0 && (
                                                    <div className="mt-4 pl-8 border-l-2 border-slate-200 space-y-4">
                                                        {c.replies.map((reply) => (
                                                            <motion.div
                                                                key={reply.id}
                                                                className="pt-4 flex gap-3"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                            >
                                                                <img
                                                                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${reply.user}&background=%2304a777&color=white`}
                                                                    alt={reply.user}
                                                                    className="w-10 h-10 rounded-full"
                                                                />
                                                                <div>
                                                                    <p className="text-sm font-medium text-emerald-700">
                                                                        {reply.user}
                                                                    </p>
                                                                    <p className="text-slate-600 text-sm">{reply.content}</p>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.p
                                    className="text-slate-500 text-center py-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    No responses yet. Start the conversation!
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </main>
            <Footer />
        </>
    );
};

export default PostDetail;