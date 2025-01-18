export interface GeneratedImage {
  url: string;
}

export interface ImageGenerationResult {
  images?: GeneratedImage[];
  error?: Error;
  status?: string;
  logs?: string[];
}