import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wand2, Brain, Image } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Wand2 className="w-6 h-6 text-neon-pink" />,
      title: "AI-Powered Creation",
      description: "Transform your imagination into stunning visuals with our advanced AI technology"
    },
    {
      icon: <Brain className="w-6 h-6 text-neon-blue" />,
      title: "Smart Processing",
      description: "Intelligent algorithms that understand context and deliver precise results"
    },
    {
      icon: <Image className="w-6 h-6 text-neon-purple" />,
      title: "High Quality Output",
      description: "Generate professional-grade images ready for any project"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent animate-gradient">
                Transform Your Imagination
              </span>
              <br />
              Into Images<br/>
              <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent animate-gradient">With I2I</span>
            </h1>
            
            <h2></h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Turn your creative ideas into stunning visuals with our AI-powered image generation platform
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/auth"
                className="inline-block px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple hover:opacity-90 transition-opacity"
              >
                Start Creating Now
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-xl bg-dark-200 border border-dark-300 hover:border-neon-purple transition-colors"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/20 rounded-full filter blur-[128px]" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-neon-purple/20 rounded-full filter blur-[128px]" />
      </div>
    </div>
  );
};

export default LandingPage;