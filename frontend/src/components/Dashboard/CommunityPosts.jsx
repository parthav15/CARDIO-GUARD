import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Edit, Trash2, ArrowRight, Plus } from 'lucide-react';

const CommunityPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in.');
        setLoading(false);
        return;
      }
      
      try {
        const response = await axios.get(`${BASE_URL}community/list_posts_by_user/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setPosts(response.data.posts);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Error retrieving posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeleteConfirmation = (postId) => {
    setPostToDelete(postId);
    setShowModal(true);
  };

  const handleDeletePost = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in.');
      return;
    }

    try {
      const response = await axios.delete(`${BASE_URL}community/delete_post/${postToDelete}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setPosts(posts.filter(post => post.id !== postToDelete));
        toast.success(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error deleting post.');
    } finally {
      setShowModal(false);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required. Please log in.');
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}community/edit_post/${editingPost.id}/`,
        {
          title: editingPost.title,
          content: editingPost.content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setPosts(posts.map(post => post.id === editingPost.id ? response.data.post : post));
        setEditingPost(null);
        toast.success(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error updating post.');
    }
  };

  if (loading) return (
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-rose-100 text-rose-700 p-4 rounded-lg border border-rose-200">
      {error}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">
          My Community Posts
        </h2>
        <Link to="/community/new-post">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Plus className="h-4 w-4" />
            New Post
          </motion.button>
        </Link>
      </div>
      
      <AnimatePresence>
        {editingPost ? (
          <motion.div
            key="editForm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">Edit Post</h3>
            <form onSubmit={handleUpdatePost} className="space-y-4">
              <div>
                <label className="block text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Content</label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  rows="5"
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <motion.button
                  type="button"
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setEditingPost(null)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-md"
                  whileHover={{ scale: 1.02 }}
                >
                  Save Changes
                </motion.button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="postsList"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {posts.length === 0 ? (
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  You haven't created any posts yet
                </h3>
                <p className="text-slate-600 mb-4">
                  Share your thoughts with the Cardio Guard community
                </p>
                <Link to="/community/new-post">
                  <motion.button
                    className="flex items-center gap-2 mx-auto px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Plus className="h-4 w-4" />
                    Create Your First Post
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              posts.map(post => (
                <motion.div
                  key={post.id}
                  className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-all"
                  whileHover={{ y: -3 }}
                >
                  <h3 className="text-lg font-semibold text-slate-800">{post.title}</h3>
                  <p className="text-slate-600 mt-2 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-slate-500">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <div className="flex gap-3">
                      <motion.button
                        className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setEditingPost(post)}
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </motion.button>
                      <motion.button
                        className="flex items-center gap-1 text-sm text-rose-600 hover:text-rose-700"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleDeleteConfirmation(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-lg font-bold text-slate-800 mb-3">Delete Post?</h3>
              <p className="text-slate-600 mb-6">
                Are you sure you want to delete this post? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <motion.button
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg shadow-sm hover:bg-rose-600"
                  whileHover={{ scale: 1.02 }}
                  onClick={handleDeletePost}
                >
                  Delete Post
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
        toastStyle={{ backgroundColor: '#059669' }}
      />
    </div>
  );
};

export default CommunityPosts;