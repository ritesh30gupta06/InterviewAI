import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    atsScore: 0,
    interviewReadiness: 0,
    mockInterviews: 0,
    codingProblems: 420,
  });

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await API.get("/dashboard");

      setStats(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
          fontWeight: "600"
        }}
      >

        Loading Dashboard...

      </div>

    );

  }

  return (

    <div className="layout">

      <Sidebar />

      <div className="main">

        <Navbar />

        <div className="dashboard">

          <h1>Dashboard</h1>

          <p>
            Welcome back! Here's your latest preparation progress.
          </p>

          <div className="stats">

            <div className="card">

              <h2>{stats.atsScore}</h2>

              <p>ATS Resume Score</p>

            </div>

            <div className="card">

              <h2>{stats.interviewReadiness}%</h2>

              <p>Interview Readiness</p>

            </div>

            <div className="card">

              <h2>{stats.mockInterviews}</h2>

              <p>Mock Interviews</p>

            </div>

            <div className="card">

              <h2>{stats.codingProblems}</h2>

              <p>Coding Problems</p>

            </div>

          </div>

          <div
            style={{
              marginTop: "40px",
              background: "#111827",
              padding: "30px",
              borderRadius: "20px"
            }}
          >

            <h2>Quick Actions</h2>

            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "25px",
                flexWrap: "wrap"
              }}
            >

              <button className="action-btn">
                🤖 Generate AI Interview
              </button>

              <button className="action-btn">
                📄 Analyze Resume
              </button>

              <button className="action-btn">
                📊 View Analytics
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}