import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini AI client
// Note: In a real production app, ensure API keys are handled securely via backend proxies if possible.
// Here we use the environment variable as requested.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Είσαι ο B2 Bot, ένας έξυπνος, φιλικός και "cool" βοηθός για μαθητές της Β' Γυμνασίου (8th grade) στην Ελλάδα.
Το ύφος σου πρέπει να είναι ενθαρρυντικό, μοντέρνο, αλλά και εκπαιδευτικό. 
Χρησιμοποίησε emojis και μίλα όπως θα μιλούσε ένας cool καθηγητής ή ένας έξυπνος συμμαθητής.
Μπορείς να βοηθήσεις με απορίες στα μαθήματα, να πεις αστεία, ή να δώσεις συμβουλές οργάνωσης.
Απάντησε πάντα στα Ελληνικά εκτός αν σου ζητηθεί κάτι άλλο.
Κράτα τις απαντήσεις σχετικα σύντομες και ευανάγνωστες.
`;

export const streamGeminiResponse = async (
  prompt: string, 
  onChunk: (text: string) => void
) => {
  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    for await (const chunk of response) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("\n\n**Ωχ! Κάτι πήγε στραβά.** Ο server ίσως είναι φορτωμένος. Δοκίμασε ξανά σε λίγο! 🤖");
  }
};