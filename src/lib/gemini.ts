import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

// Initialize the client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Get a generative model
const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
};

// Generate content with structured output
export async function generateWithGemini(prompt: string, systemPrompt?: string) {
  try {
    const model = getGeminiModel();
    
    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
    };
    
    // Create a chat session
    const chat = model.startChat({
      history: systemPrompt ? [{ role: 'user', parts: [{ text: systemPrompt }] }] : [],
      generationConfig,
    });
    
    // Send message and get response
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    throw error;
  }
}

export default genAI; 