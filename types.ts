
export interface StyleOption {
  id: string;
  name: string;
  description: string;
  promptSuffix: string;
  image: string;
}

export interface AspectRatioOption {
  id: string;
  label: string;
  ratio: string;
  icon: string;
}

export interface GenerationState {
  originalPrompt: string;
  refinedPrompt: string;
  selectedStyle: string;
  selectedAspectRatio: string;
  isRefining: boolean;
  isGenerating: boolean;
  generatedImageUrl: string | null;
  error: string | null;
}
