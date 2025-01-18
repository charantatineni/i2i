import { fal } from "@fal-ai/client";

// Initialize fal.ai client
const apiKey = import.meta.env.VITE_FAL_API_KEY;
if (!apiKey) {
  throw new Error('FAL_API_KEY is not set in environment variables');
}

fal.config({
  credentials: {
    key: apiKey
  }
});

// Enhanced type definitions
export interface ImageGenerationResult {
  images?: { url: string }[];
  error?: Error;
  status?: string;
  logs?: string[];
}

export const generateImage = async (prompt: string): Promise<ImageGenerationResult> => {
  try {
    if (!prompt.trim()) {
      throw new Error('Prompt cannot be empty');
    }

    const logs: string[] = [];

    const result = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt,
        // Add any additional parameters you might need
        // num_inference_steps: 50,
        // image_size: "1024x1024",
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
    
    // Enhanced error handling
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
};// import { fal } from "@fal-ai/client";

// // Initialize fal.ai client
// const apiKey = import.meta.env.VITE_FAL_API_KEY;
// if (!apiKey) {
//   throw new Error('FAL_API_KEY is not set in environment variables');
// }
// fal.config({
//   credentials: {
//     key: apiKey
//   }
// });

// export interface ImageGenerationResult {
//   images?: { url: string }[];
//   error?: Error;
// }

// export const generateImage = async (prompt: string): Promise<ImageGenerationResult> => {
//   try {
//     const result = await fal.subscribe("fal-ai/flux/dev", {
//       input: {
//         prompt,
//       },
//       logs: true,
//       onQueueUpdate: (update) => {
//         if (update.status === "IN_PROGRESS") {
//           console.log(update.logs.map((log) => log.message));
//         }
//       },
//     });
    
//     return { images: result.data.images };
//   } catch (error) {
//     console.error("Image generation error:", error);
//     return { error: error as Error };
//   }
// };