const db = require("../config/db");

const getDashboard = async (req, res) => {
  try {

    const [[resume]] = await db.query(
      "SELECT ats_score FROM resume_analysis ORDER BY id DESC LIMIT 1"
    );

    const [[interviews]] = await db.query(
      "SELECT COUNT(*) AS total FROM interview_history"
    );

    const [[average]] = await db.query(
      "SELECT AVG(overall_score) AS avgScore FROM interview_history"
    );

    const [[highest]] = await db.query(
      "SELECT MAX(overall_score) AS highestScore FROM interview_history"
    );

    const companies = await db.query(
      `SELECT company, COUNT(*) AS total
       FROM interview_history
       GROUP BY company`
    );

    res.json({
      atsScore: resume?.ats_score || 0,
      interviewReadiness: Number(average?.avgScore || 0).toFixed(1),
      mockInterviews: interviews.total || 0,
      highestScore: Number(highest?.highestScore || 0).toFixed(1),
      companies: companies[0],
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboard,
};