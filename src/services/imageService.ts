import { fal } from '../config/fal';
import type { ImageGenerationResult } from '../types/image';

export const generateImage = async (prompt: string): Promise<ImageGenerationResult> => {
  try {
    if (!prompt.trim()) {
      throw new Error('Prompt cannot be empty');
    }

    const logs: string[] = [];

    const result = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          const messages = update.logs.map((log) => log.message);
          logs.push(...messages);
          console.log(messages);
        }
      },
    });
    
    return { 
      images: result.data.images,
      status: 'success',
      logs
    };

  } catch (error) {
    console.error("Image generation error:", error);
    
    if (error instanceof Error) {
      return { 
        error,
        status: 'error',
        logs: [error.message]
      };
    }
    
    return { 
      error: new Error('Unknown error occurred'),
      status: 'error'
    };
  }
};