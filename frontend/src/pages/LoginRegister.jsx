import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Mail, Lock, User, Smartphone, HeartPulse } from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { BASE_URL } from '../config';

const LoginRegister = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const endpoint = isLogin
            ? `${BASE_URL}users/user_login/`
            : `${BASE_URL}users/user_register/`;

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(isLogin ? {
                    email: formData.email,
                    password: formData.password
                } : {
                    email: formData.email,
                    password: formData.password,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    phone_number: formData.phone
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            if (isLogin) {
                const userResponse = await fetch(`${BASE_URL}users/user_details/`, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                });
                const userData = await userResponse.json();

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(userData.user_details));

                toast.success("Logged in successfully!");
                setTimeout(() => navigate("/", { replace: true }), 2000);
            } else {
                toast.success("Registered successfully!");
                setIsLogin(true);
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50 flex flex-col">
            <Navbar />
            
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
                theme="colored"
                toastStyle={{ backgroundColor: '#059669' }}
            />

            <div className="flex-grow flex flex-col lg:flex-row">
                {/* Left Section */}
                <motion.div
                    className="lg:w-1/2 bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center p-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center max-w-md">
                        <motion.div
                            key={isLogin ? 'login-text' : 'register-text'}
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/20 mb-6">
                                <HeartPulse className="h-10 w-10 text-white" />
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Cardio <span className="font-light">Guard</span>
                            </h2>
                            <p className="text-lg text-emerald-100">
                                {isLogin 
                                    ? "Welcome back to your heart health dashboard"
                                    : "Join our community for proactive cardiac care"}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Section */}
                <div className="lg:w-1/2 flex items-center justify-center p-8">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={isLogin ? 'login' : 'register'}
                            className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
                            variants={formVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {!isLogin && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <User className="h-5 w-5 text-slate-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="First Name"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
                                                />
                                            </div>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <User className="h-5 w-5 text-slate-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Last Name"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Smartphone className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone Number"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800"
                                    />
                                </div>

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-rose-500 text-sm"
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-md hover:shadow-lg transition-all text-white font-semibold"
                                >
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                </motion.button>
                            </form>

                            <p className="mt-6 text-center text-slate-600">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                                <button
                                    onClick={toggleForm}
                                    className="ml-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                                >
                                    {isLogin ? 'Register now' : 'Sign in instead'}
                                </button>
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginRegister;