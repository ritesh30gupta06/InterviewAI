import React, { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Interview.css";

export default function Interview() {

  const [company, setCompany] = useState("Google");
  const [role, setRole] = useState("Software Engineer Intern");
  const [difficulty, setDifficulty] = useState("Medium");

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const generateInterview = async () => {

    try {

      setLoading(true);

      const res = await API.post("/interview/generate", {
        company,
        role,
        difficulty,
      });

      setQuestions(res.data.questions);

      if (res.data.questions.length > 0) {
        setCurrentQuestion(res.data.questions[0]);
      }

      setAnswer("");
      setResult(null);

    } catch (err) {

      alert(err.response?.data?.message || "Interview Generation Failed");

    } finally {

      setLoading(false);

    }

  };

  const evaluateAnswer = async () => {

    if (!answer.trim()) {
      alert("Please enter your answer.");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/evaluation/evaluate", {

        company,
        role,
        difficulty,

        question: currentQuestion,

        answer,

      });

      setResult(res.data);

    } catch (err) {

      alert(err.response?.data?.message || "Evaluation Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="layout">

      <Sidebar />

      <div className="main">

        <Navbar />

        <div className="interview-box">

          <h1>🤖 AI Mock Interview</h1>

          <p>
            Generate company-specific interview questions and receive instant AI
            feedback.
          </p>

          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option>Google</option>
            <option>Amazon</option>
            <option>Microsoft</option>
            <option>Goldman Sachs</option>
            <option>Atlassian</option>
            <option>PhonePe</option>
            <option>Razorpay</option>
          </select>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Software Engineer Intern</option>
            <option>SDE 1</option>
            <option>Backend Developer</option>
            <option>Frontend Developer</option>
            <option>Full Stack Developer</option>
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <button onClick={generateInterview}>
            {loading ? "Generating..." : "Generate Interview"}
          </button>

          {currentQuestion && (
            <>
              <div className="question-card">

                <h3>Interview Question</h3>

                <p>{currentQuestion}</p>

              </div>

              <textarea
                placeholder="Write your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />

              <button onClick={evaluateAnswer}>
                {loading ? "Evaluating..." : "Evaluate Answer"}
              </button>
            </>
          )}

          {result && (

            <div className="result-card">

              <h2>📊 AI Evaluation</h2>

              <div className="score-grid">

                <div className="score-card">
                  <h2>{result.technicalScore}/10</h2>
                  <p>Technical</p>
                </div>

                <div className="score-card">
                  <h2>{result.communicationScore}/10</h2>
                  <p>Communication</p>
                </div>

                <div className="score-card">
                  <h2>{result.overallScore}/10</h2>
                  <p>Overall</p>
                </div>

              </div>

              <h3>AI Suggestions</h3>

              <ul className="feedback-list">

                {result.feedback.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}

              </ul>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}