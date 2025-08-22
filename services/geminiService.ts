
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `You are an A-Frame expert. Generate a complete, self-contained HTML file for an A-Frame scene based on the user's request.
- The HTML must include <script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script> in the <head>.
- The scene must be inside <a-scene>.
- Add an ambient light and a directional light for good visibility. e.g. <a-light type="ambient" color="#888"></a-light> and <a-light type="directional" intensity="0.5" position="-1 1 2"></a-light>.
- Add a sky background using <a-sky color="#..."></a-sky>. Choose a suitable color.
- Interpret the user's prompt to create objects using A-Frame primitives like <a-box>, <a-sphere>, <a-cylinder>, <a-plane>, <a-cone>, etc.
- Combine and position these primitives to create the described model.
- Use colors and materials to make the scene visually appealing.
- Place the camera at a reasonable starting position using <a-entity camera look-controls position="0 1.6 5"></a-entity>, so the generated objects are clearly visible.
- Ensure the scene is interesting and well-composed.
- Do NOT include any explanations, comments, or markdown formatting like \`\`\`html. Output only the raw HTML code, starting with <!DOCTYPE html>.`;

/**
 * Generates A-Frame HTML code from a text prompt using the Gemini API.
 * @param prompt The user's description of the 3D scene.
 * @returns A string containing the full A-Frame HTML.
 */
export const generateAFrameCode = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const rawCode = response.text;

    // Clean up potential markdown formatting from the response
    const cleanedCode = rawCode.replace(/^```html\n?/, '').replace(/\n?```$/, '').trim();

    if (!cleanedCode.toLowerCase().includes('a-scene')) {
        throw new Error("Generated content does not appear to be a valid A-Frame scene.");
    }

    return cleanedCode;

  } catch (error) {
    console.error("Error generating A-Frame code:", error);
    throw new Error("Failed to generate 3D model. The model may have returned an invalid response.");
  }
};
