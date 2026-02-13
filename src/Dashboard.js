import React, { useEffect, useState } from "react";
import "./App.css";

function Dashboard() {
  const [bins, setBins] = useState([]);
  const email = localStorage.getItem("email");
  const credits = localStorage.getItem("credits") || 0;

  useEffect(() => {
    fetch("https://smart-bin-backend-zygj.onrender.com/api")
      .then((res) => res.json())
      .then((data) => setBins(data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="app-bg">
      <div className="glass-card">

        <h1 className="title">
          Smart Bin <span>♻️</span>
        </h1>

        <div className="user-box">
          {email}
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <p>💰 Credits</p>
            <h2>{credits}</h2>
          </div>

          <div className="stat-card">
            <p>🧴 Plastic</p>
            <h2>2.5 kg</h2>
          </div>
        </div>

        {bins.map((bin) => (
          <div key={bin._id} className="bin-section">
            <h3>{bin.location}</h3>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${bin.level}%` }}
              ></div>
            </div>

            <p className="status">
              {bin.status} • {bin.level}%
            </p>
          </div>
        ))}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default Dashboard;
