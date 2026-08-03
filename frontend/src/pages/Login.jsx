import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";
import { saveToken } from "../services/auth";

import "./Login.css";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      saveToken(res.data.token);

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="login-page">

      <div className="left-panel">

        <h1>PrepPilot AI</h1>

        <p className="subtitle">
          AI Powered Career Preparation Platform
        </p>

        <div className="feature">

          <span>🚀</span>

          <div>

            <h3>Resume Analyzer</h3>

            <p>
              Improve your ATS score using AI-powered feedback.
            </p>

          </div>

        </div>

        <div className="feature">

          <span>🤖</span>

          <div>

            <h3>AI Mock Interviews</h3>

            <p>
              Practice company-specific interview questions.
            </p>

          </div>

        </div>

        <div className="feature">

          <span>📊</span>

          <div>

            <h3>Analytics Dashboard</h3>

            <p>
              Track your interview readiness and progress.
            </p>

          </div>

        </div>

      </div>

      <div className="right-panel">

        <div className="login-card">

          <h2>Welcome Back 👋</h2>

          <p>Sign in to continue</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          <Link
            to="/register"
            className="register-link"
          >
            Create New Account
          </Link>

        </div>

      </div>

    </div>

  );

}