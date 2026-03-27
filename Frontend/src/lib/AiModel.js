import { GoogleGenAI } from "@google/genai";

// Access the API key from environment variables
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY });

const config = {
    responseMimeType: "text/plain", // Ensuring the AI returns raw text 
};

export async function getAIRecommendation(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config,
        });
        return response.text;
    } catch (error) {
        //surface quota/rate-limit issues
        const message =
            typeof error?.message === "string" ? error.message : "Unknown error";
        if (message.includes('"code":429') || message.includes("RESOURCE_EXHAUSTED")) {
            console.warn("Rate limit / quota exceeded. Please wait and try again.");
            return "Rate limit or quota exceeded. Please wait a few seconds and try again.";
        }
        console.error("Error sending message", error);
        return null;
    }
}
