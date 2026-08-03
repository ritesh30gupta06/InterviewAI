import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Resume.css";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const res = await API.post("/resume/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAnalysis(res.data);

    } catch (err) {
      alert(err.response?.data?.message || "Resume Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="resume-container">

          <h1>📄 AI Resume Analyzer</h1>

          <p>Upload your resume and receive AI-powered ATS feedback.</p>

          <div className="upload-card">

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={uploadResume}>
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>

          </div>

          {analysis && (
            <div className="analysis-card">

              <div className="score-box">
                <h2>{analysis.score}</h2>
                <span>ATS Score</span>
              </div>

              <div className="feedback-box">

                <h3>✅ Strengths</h3>

                <ul>
                  {(analysis.strengths || []).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3 style={{ marginTop: "25px" }}>
                  🔥 Improvements
                </h3>

                <ul>
                  {(analysis.improvements || []).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}