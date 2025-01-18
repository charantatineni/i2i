import React from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import ImageGenerator from '../components/ImageGenerator';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
            Welcome to I2I, {user?.email}!
          </h1>
          <motion.button
            onClick={signOut}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-lg bg-dark-300 hover:bg-dark-300/80 transition-colors flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-200 p-8 rounded-2xl border border-dark-300"
        >
          <ImageGenerator />
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full filter blur-[128px]" />
      </div>
    </div>
  );
};

export default Dashboard;