import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Github, Mail as Gmail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp, signInWithProvider } = useAuth();
  const location = useLocation();

  // Handle OAuth callback
  useEffect(() => {
    if (location.pathname === '/auth/callback') {
      const handleCallback = async () => {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        
        if (accessToken) {
          // Token exists in URL, handle the callback
          const { error } = await signIn(accessToken);
          if (error) {
            setError(error.message);
          }
        }
      };

      handleCallback();
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = isLogin 
      ? await signIn(email, password)
      : await signUp(email, password);

    if (error) {
      setError(error.message);
    }
  };

  const handleOAuthSignIn = async (provider: 'github' | 'google') => {
    setError(null);
    const { error } = await signInWithProvider(provider);
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-300 border border-dark-300 rounded-lg py-2 px-10 focus:outline-none focus:border-neon-purple transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-300 border border-dark-300 rounded-lg py-2 px-10 focus:outline-none focus:border-neon-purple transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple hover:opacity-90 transition-opacity font-semibold"
        >
          {isLogin ? 'Sign In' : 'Create Account'}
        </motion.button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-dark-200 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.button
            type="button"
            onClick={() => handleOAuthSignIn('github')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center py-2.5 px-4 rounded-lg bg-dark-300 hover:bg-dark-300/80 transition-colors"
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </motion.button>
          <motion.button
            type="button"
            onClick={() => handleOAuthSignIn('google')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center py-2.5 px-4 rounded-lg bg-dark-300 hover:bg-dark-300/80 transition-colors"
          >
            <Gmail className="w-5 h-5 mr-2" />
            Google
          </motion.button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-gray-400 hover:text-neon-purple transition-colors"
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;