
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

/**
 * Refines a user's prompt using the Gemini text model with high-quality visual instructions.
 */
export const refinePromptWithGemini = async (prompt: string, styleName: string, styleDetails: string): Promise<string> => {
  const ai = getAIClient();
  const systemInstruction = `You are a world-class AI Image Prompt Engineer. 
  Your task is to take a simple user idea and a specific art style, and transform them into a masterpiece-level prompt for an image generation model.
  
  RULES:
  1. The final prompt must be in ENGLISH.
  2. Describe lighting (e.g., "golden hour", "cinematic volumetric lighting", "soft bokeh").
  3. Describe composition (e.g., "wide angle shot", "extreme close-up", "rule of thirds").
  4. Describe texture and detail (e.g., "intricate textures", "hyper-realistic skin pores", "sharp focus").
  5. Incorporate the style "${styleName}" naturally into the description using technical terms: ${styleDetails}.
  6. Output ONLY the refined English prompt. No introductions, no quotes, no explanations.`;

  const userQuery = `Initial idea: "${prompt}". Style to apply: "${styleName}".`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      },
    });

    return response.text?.trim() || prompt;
  } catch (error) {
    console.error("Erro ao refinar prompt:", error);
    throw new Error("Não foi possível refinar sua ideia. Tente novamente.");
  }
};

/**
 * Generates an image based on the provided prompt using the Gemini image model.
 */
export const generateImageWithGemini = async (prompt: string, styleSuffix: string, aspectRatio: string = "1:1"): Promise<string> => {
  const ai = getAIClient();
  const fullPrompt = `${prompt}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
        },
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate) throw new Error("A IA não gerou uma imagem para este prompt.");

    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("Formato de imagem inválido recebido da API.");
  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
    throw new Error("Falha na geração. O prompt pode ter violado as políticas de segurança.");
  }
};
