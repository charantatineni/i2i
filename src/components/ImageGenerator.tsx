import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Loader2 } from 'lucide-react';
import { generateImage } from '../services/imageService';
import type { GeneratedImage } from '../types/image';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<GeneratedImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await generateImage(prompt);

    if (result.error) {
      setError(result.error.message);
    } else if (result.images?.[0]) {
      setImage(result.images[0]);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter your prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 bg-dark-300 border border-dark-300 rounded-lg p-4 focus:outline-none focus:border-neon-purple transition-colors resize-none"
            placeholder="Describe the image you want to generate..."
            required
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple hover:opacity-90 transition-opacity font-semibold flex items-center justify-center disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              Generate Image
            </>
          )}
        </motion.button>
      </form>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg overflow-hidden"
        >
          <img
            src={image.url}
            alt="Generated"
            className="w-full h-auto rounded-lg"
          />
        </motion.div>
      )}
    </div>
  );
};

export default ImageGenerator;