const { generate } = require("../services/geminiService");

exports.generateInterview = async (req, res) => {
  try {
    const { company, role, difficulty } = req.body;

    if (!company || !role || !difficulty) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const prompt = `
You are a Senior ${company} Interviewer.

Generate exactly 10 REALISTIC interview questions.

Company: ${company}

Role: ${role}

Difficulty: ${difficulty}

The questions should follow the interview style of ${company}.

Question Distribution:
- 2 HR
- 2 OOP
- 2 DBMS
- 2 Operating System
- 2 DSA

Do NOT generate generic textbook questions.

Return ONLY valid JSON.

{
  "questions":[
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "..."
  ]
}
`;

    const text = await generate(prompt);

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(cleaned);

    res.json(data);

  } catch (err) {

    console.log(err);

    if (err.status === 429) {
      return res.status(429).json({
        message:
          "Gemini API free quota has been exhausted. Please wait for quota reset or use another API key.",
      });
    }

    res.status(500).json({
      message: "Interview Generation Failed",
    });

  }
};