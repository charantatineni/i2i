import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  return (
    <div className="min-h-screen pt-32 px-4 relative overflow-hidden">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-200 p-8 rounded-2xl border border-dark-300"
        >
          <div className="text-center mb-8">
            <Sparkles className="w-12 h-12 text-neon-purple mx-auto mb-4" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
              Welcome to I2I
            </h2>
          </div>

          <AuthForm />
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-pink/20 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full filter blur-[128px]" />
      </div>
    </div>
  );
};

export default AuthPage;