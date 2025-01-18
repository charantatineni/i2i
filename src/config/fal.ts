import { fal } from "@fal-ai/client";

const FAL_API_KEY = import.meta.env.VITE_FAL_API_KEY;

if (!FAL_API_KEY) {
  throw new Error('VITE_FAL_API_KEY is not set in environment variables');
}

// Initialize fal.ai client with proper credentials format
fal.config({
  credentials: FAL_API_KEY
});

export { fal };