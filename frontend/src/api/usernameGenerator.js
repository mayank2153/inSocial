import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

async function usernameGenerator() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      "Generate one unique and meaningful anonymous username that is easy to remember and suitable for a diverse range of users. The username should be a combination of words or phrases that evoke a positive or neutral idea, concept, or imagery. It should not include any real names or common identifiers.Username should not be greater than 15 characters. Ensure the username is creative, meaningful, and distinctive.Return only the username without any additional explanation."
    ]);
    
    return result.response.text();
  } catch (error) {
    console.error("Error generating username:", error);
    return ""
    
  }
}
export default usernameGenerator;


