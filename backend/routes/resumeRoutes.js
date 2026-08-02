const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");

const { analyzeResume } = require("../services/geminiService");
const authMiddleware = require("../middleware/authMiddleware");
const db = require("../config/db");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/analyze",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({
          message: "Please upload a PDF Resume",
        });
      }

      const data = await pdf(req.file.buffer);

      const resumeText = data.text;

      const aiResponse = await analyzeResume(resumeText);

      const cleaned = aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const result = JSON.parse(cleaned);

      const score = parseInt(result.score);

      await db.query(
        `INSERT INTO resume_analysis (user_id, ats_score)
         VALUES (?, ?)`,
        [
          req.user.id,
          score,
        ]
      );

      res.json(result);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Resume Analysis Failed",
      });

    }
  }
);

module.exports = router;