import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const samplePosts = [
  {
    id: 1,
    title: 'Die Bedeutung der Knochendichtemessung ab 50',
    date: '13. April 2026',
    category: 'Vorsorge',
    excerpt: 'Warum die DEXA-Messung der Goldstandard in der Osteoporose-Früherkennung ist...',
    status: 'published',
    image: '/assets/images/service_densitometry.jpg'
  },
  {
    id: 2,
    title: 'KI in der Radiologie: Unterstützung für präzisere Diagnosen',
    date: '10. März 2026',
    category: 'Technologie',
    excerpt: 'Wie künstliche Intelligenz uns hilft, selbst kleinste Veränderungen noch früher zu erkennen.',
    status: 'published',
    image: '/assets/images/hero_building.jpg'
  },
  {
    id: 3,
    title: 'Mammographie-Screening: Was Sie wissen sollten',
    date: 'Entwurf für Mai',
    category: 'Frauengesundheit',
    excerpt: 'Ein Leitfaden für Patientinnen zur optimalen Vorbereitung und dem Ablauf der Untersuchung.',
    status: 'draft',
    image: '/assets/images/hero_interior.jpg'
  }
];

const Blog = () => {
  const [view, setView] = useState('published');
  
  const filteredPosts = samplePosts.filter(post => post.status === view);

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Sparkles size={18} />
              <span>AI-Managed Health Blog</span>
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
              Review Drafts
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
              
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <Clock size={16} />
                <span>{post.date}</span>
                {post.status === 'draft' && (
                  <span className="text-orange-500 font-bold ml-auto flex items-center gap-1">
                    <CheckCircle size={14} />
                    Needs Approval
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#8B2323] transition-colors font-[Outfit]">
                {post.title}
              </h3>
              
              <p className="text-gray-600 line-clamp-2 mb-4">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-2 text-[#8B2323] font-bold">
                <span className="text-sm uppercase tracking-wider">Weiterlesen</span>
                <BookOpen size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
