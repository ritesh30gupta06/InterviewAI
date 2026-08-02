const db = require("../config/db");
const { generate } = require("../services/geminiService");

exports.evaluateAnswer = async (req, res) => {
  try {

    const {
      company,
      role,
      difficulty,
      question,
      answer,
    } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        message: "Question and Answer are required",
      });
    }

    const prompt = `
You are a Senior ${company} Interviewer.

Evaluate this interview answer.

Company:
${company}

Role:
${role}

Difficulty:
${difficulty}

Question:
${question}

Candidate Answer:
${answer}

Return ONLY valid JSON.

{
"technicalScore":8,
"communicationScore":8,
"overallScore":8,
"feedback":[
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

    const result = JSON.parse(cleaned);

    await db.query(
      `INSERT INTO interview_history
      (user_id, company, role, difficulty, question, answer, overall_score)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        company,
        role,
        difficulty,
        question,
        answer,
        result.overallScore,
      ]
    );

    res.json(result);

  } catch (err) {

    console.log(err);

    if (err.status === 429) {
      return res.status(429).json({
        message:
          "Gemini API free quota has been exhausted. Please wait for quota reset or use another API key.",
      });
    }

    res.status(500).json({
      message: "Evaluation Failed",
    });

  }
};