import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, CheckCircle, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { blogPosts as samplePosts } from '../data/blogPosts';

const BlogModal = ({ post, onClose }) => {
  if (!post) return null;

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[40px] overflow-hidden shadow-2xl flex flex-col relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur p-2 rounded-full text-gray-900 hover:bg-[#8B2323] hover:text-white transition-all shadow-lg"
        >
          <X size={24} />
        </button>

        <div className="overflow-y-auto">
          <div className="relative h-[300px] md:h-[450px]">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>

          <div className="px-8 md:px-16 pb-16 pt-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-[#8B2323] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock size={16} />
                <span>{post.date}</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-[#1f2937] mb-8 font-[Outfit] leading-tight">
              {post.title}
            </h2>

            <div 
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Blog = () => {
  const [view, setView] = useState('published');
  const [selectedPost, setSelectedPost] = useState(null);
  
  const filteredPosts = samplePosts.filter(post => post.status === view);

  return (
    <section id="blog" className="py-24 bg-transparent relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#8B2323]/5 text-[#8B2323] px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Sparkles size={18} />
              <span>Diagnostik am Puls der Zeit</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1f2937] font-[Outfit]">
              Wissen für Ihre <span className="text-[#8B2323]">Gesundheit</span>
            </h2>
          </div>
          
          <div className="flex bg-gray-100 p-1.5 rounded-2xl">
            <button 
              onClick={() => setView('published')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                view === 'published' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Veröffentlicht
            </button>
            <button 
              onClick={() => setView('draft')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                view === 'draft' ? 'bg-[#8B2323] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Vorschau
              {samplePosts.filter(p => p.status === 'draft').length > 0 && (
                <span className="w-5 h-5 bg-white text-[#8B2323] rounded-full text-[10px] flex items-center justify-center">
                  {samplePosts.filter(p => p.status === 'draft').length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer"
            >
              <div className="relative rounded-[32px] overflow-hidden mb-6 aspect-[4/3]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-[#8B2323]">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-700 mb-3">
                <Clock size={16} />
                <span>{post.date}</span>
                {post.status === 'draft' && (
                  <span className="text-orange-500 font-bold ml-auto flex items-center gap-1">
                    <CheckCircle size={14} />
                    Unveröffentlicht
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#8B2323] transition-colors font-[Outfit]">
                {post.title}
              </h3>
              
              <p className="text-gray-950 line-clamp-2 mb-4">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-2 text-[#8B2323] font-bold">
                <span className="text-base uppercase tracking-wider">Weiterlesen</span>
                <BookOpen size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <BlogModal 
            post={selectedPost} 
            onClose={() => setSelectedPost(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;
