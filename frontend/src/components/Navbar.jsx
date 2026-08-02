import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

import { removeToken } from "../services/auth";
import "./Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    removeToken();

    toast.success("Logged out successfully");

    navigate("/");

  };

  return (

    <div className="navbar">

      <div>

        <h2>Welcome 👋</h2>

        <p>Let's improve your interview skills today.</p>

      </div>

      <div className="nav-right">

        <button className="icon-btn">

          <FaBell />

        </button>

        <div className="profile">

          <FaUserCircle />

          <span>Candidate</span>

        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>

  );

}