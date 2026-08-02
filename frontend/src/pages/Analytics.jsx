import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

import "./Analytics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Analytics() {

  const [stats, setStats] = useState({
    atsScore: 0,
    interviewReadiness: 0,
    mockInterviews: 0,
    highestScore: 0,
    companies: [],
  });

  useEffect(() => {

    const load = async () => {

      try {

        const res = await API.get("/dashboard");

        setStats(res.data);

      } catch (err) {

        console.log(err);

      }

    };

    load();

  }, []);

  const doughnutData = {
    labels:
      stats.companies.length > 0
        ? stats.companies.map((c) => c.company)
        : ["No Data"],

    datasets: [
      {
        data:
          stats.companies.length > 0
            ? stats.companies.map((c) => c.total)
            : [1],
      },
    ],
  };

  const lineData = {
    labels: ["ATS", "Average", "Highest"],

    datasets: [
      {
        label: "Performance",

        data: [
          stats.atsScore,
          stats.interviewReadiness,
          stats.highestScore,
        ],

        tension: 0.4,
      },
    ],
  };

  return (
    <div className="layout">

      <Sidebar />

      <div className="main">

        <Navbar />

        <div className="analytics">

          <h1>📊 Analytics Dashboard</h1>

          <div className="stats">

            <div className="card">
              <h2>{stats.atsScore}%</h2>
              <p>ATS Score</p>
            </div>

            <div className="card">
              <h2>{stats.interviewReadiness}</h2>
              <p>Average Interview Score</p>
            </div>

            <div className="card">
              <h2>{stats.highestScore}</h2>
              <p>Highest Score</p>
            </div>

            <div className="card">
              <h2>{stats.mockInterviews}</h2>
              <p>Mock Interviews</p>
            </div>

          </div>

          <div className="charts">

            <div className="chart-card">

              <h2>Performance</h2>

              <Line data={lineData} />

            </div>

            <div className="chart-card">

              <h2>Companies Practiced</h2>

              <Doughnut data={doughnutData} />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}