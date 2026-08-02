import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";

import "./Login.css";

export default function Register() {

  const navigate = useNavigate();

  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const register = async () => {

    if (!full_name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/auth/register", {
        full_name,
        email,
        password,
      });

      toast.success(res.data.message);

      navigate("/");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Registration Failed"
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
          Create your account and start preparing smarter.
        </p>

        <div className="feature">

          <span>📄</span>

          <div>

            <h3>AI Resume Review</h3>

            <p>
              Receive ATS score and improvement suggestions.
            </p>

          </div>

        </div>

        <div className="feature">

          <span>🤖</span>

          <div>

            <h3>Mock Interviews</h3>

            <p>
              Practice company-specific interview questions with AI feedback.
            </p>

          </div>

        </div>

        <div className="feature">

          <span>📈</span>

          <div>

            <h3>Progress Tracking</h3>

            <p>
              Monitor interview readiness and resume performance.
            </p>

          </div>

        </div>

      </div>

      <div className="right-panel">

        <div className="login-card">

          <h2>Create Account 🚀</h2>

          <p>Join PrepPilot AI</p>

          <input
            type="text"
            placeholder="Full Name"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
          />

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
            onClick={register}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <Link
            to="/"
            className="register-link"
          >
            Already have an account? Login
          </Link>

        </div>

      </div>

    </div>

  );

}