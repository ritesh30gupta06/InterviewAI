const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODELS = [
  "gemini-flash-latest",
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite",
  "gemini-2.0-flash"
];

async function generate(prompt) {
  let lastError;

  for (const model of MODELS) {
    try {
      console.log("Trying:", model);

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      console.log("Using model:", model);

      return response.text;
    } catch (err) {
      console.log(model, "failed");
      lastError = err;

      if (err.status === 429) {
        throw err;
      }
    }
  }

  throw lastError;
}

async function analyzeResume(text) {
  const prompt = `
You are an ATS Resume Analyzer.

Return ONLY valid JSON.

{
"atsScore":"85%",
"strengths":[
"...",
"..."
],
"improvements":[
"...",
"..."
]
}

Resume:

${text}
`;

  return await generate(prompt);
}

module.exports = {
  analyzeResume,
  generate,
};