import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../../config";
import { HeartPulse, Plus, Search } from "lucide-react";

const API_URL = `${BASE_URL}/community/posts/`;

export default function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.success) {
            setPosts(response.data.posts);
          }
        })
        .catch((error) => console.error("Error fetching posts:", error))
        .finally(() => setLoading(false));
    }
  }, [token]);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.section
      className="bg-gradient-to-b from-slate-50 to-emerald-50 min-h-screen px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-emerald-100">
              <HeartPulse className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Community Discussions
            </h2>
          </div>
          <Link to="/community/new-post">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full text-white shadow-md hover:shadow-lg flex items-center gap-2 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="h-5 w-5" />
              New Post
            </motion.button>
          </Link>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 placeholder-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600 mb-4"></div>
            <p className="text-slate-500">Loading discussions...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">
              {searchQuery ? "No matching discussions found" : "No discussions yet"}
            </p>
            {!searchQuery && (
              <Link to="/community/new-post">
                <motion.button
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  Start a discussion
                </motion.button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <Link key={post.id} to={`/community/posts/${post.id}`}>
                <motion.div
                  className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:border-emerald-300 transition-all"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-slate-800">
                        {post.title}
                      </h3>
                      <p className="text-slate-600">
                        {post.content.length > 200 ? (
                          <span>
                            {post.content.slice(0, 200)}...
                            <span className="text-emerald-600 hover:underline ml-1">
                              Read more
                            </span>
                          </span>
                        ) : (
                          post.content
                        )}
                      </p>

                      {/* Author & Date */}
                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                        <p>
                          <span className="font-medium">Posted by:</span>{" "}
                          {post.user}
                        </p>
                        <p>
                          {new Date(post.created_at).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Image */}
                    {post.image && (
                      <div className="md:w-48 md:h-48 w-full h-40 overflow-hidden rounded-lg">
                        <img
                          src={`${BASE_URL}${post.image}`}
                          alt="Post"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}