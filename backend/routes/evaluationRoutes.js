const express = require("express");

const router = express.Router();

const {
  evaluateAnswer,
} = require("../controllers/evaluationController");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/evaluate",
  authMiddleware,
  evaluateAnswer
);

module.exports = router;