import { motion } from "framer-motion";
import { MessageSquare, Heart, Reply, User } from "lucide-react";

const Feature_3 = () => {
  const posts = [
    {
      user: "Sarah Johnson",
      role: "Cardiac Patient",
      content: "This community helped me understand my risk factors better than any doctor's visit!",
      likes: 142,
      comments: [
        {
          user: "Mike Chen",
          content: "Same here! The personalized tips made a real difference 🌟",
          replies: [
            {
              user: "HealthCoachAmy",
              content: "Thrilled to hear this! Keep tracking your progress 💪"
            }
          ]
        }
      ]
    },
    {
      user: "Dr. Raj Patel",
      role: "Cardiologist",
      content: "Great platform for patient education and peer support. Valuable insights for clinicians too!",
      likes: 89,
      comments: [
        {
          user: "NurseEmily",
          content: "Absolutely! Using it to reinforce post-op care instructions"
        }
      ]
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-100 mb-6">
            <MessageSquare className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            <span className="text-emerald-600">Community</span> of Care
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Connect, share, and learn with patients and professionals in our supportive health community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:border-emerald-300 transition-all duration-300"
            >
              {/* Post Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <User className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-slate-800 font-semibold">{post.user}</h3>
                  <p className="text-sm text-emerald-600">{post.role}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-slate-700 mb-6">{post.content}</p>

              {/* Interactions */}
              <div className="flex items-center gap-6 text-slate-500">
                <button className="flex items-center gap-2 hover:text-rose-500 transition-colors">
                  <Heart className="h-5 w-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-emerald-600 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span>{post.comments.length}</span>
                </button>
              </div>

              {/* Comments Section */}
              <div className="mt-6 space-y-6">
                {post.comments.map((comment, cIndex) => (
                  <div key={cIndex} className="ml-4 pl-4 border-l-2 border-slate-200">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm text-emerald-600">{comment.user}</span>
                    </div>
                    <p className="text-slate-600 text-sm">{comment.content}</p>

                    {/* Replies */}
                    {comment.replies?.map((reply, rIndex) => (
                      <div key={rIndex} className="ml-6 mt-4 pl-4 border-l-2 border-slate-200">
                        <div className="flex items-center gap-3 mb-2">
                          <Reply className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm text-emerald-600">{reply.user}</span>
                        </div>
                        <p className="text-slate-600 text-sm">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl text-slate-800 mb-6">Join the Conversation</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Start Your First Post
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_3;