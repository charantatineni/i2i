import { fal } from "@fal-ai/client";

const apiKey = import.meta.env.VITE_FAL_API_KEY;

if (!apiKey) {
  throw new Error('VITE_FAL_API_KEY is not set in environment variables');
}

fal.config({
  credentials: apiKey
});

export const generateImage = async (prompt: string) => {
  try {
    const result = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log(update.logs.map((log) => log.message));
        }
      },
    });
    
    return { data: result.data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};