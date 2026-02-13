import React, { useState } from "react";
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
const res = await fetch(
  "https://smart-bin-backend-zygj.onrender.com/api/auth/login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }
);


      const data = await res.json();

      if (data.email) {
        localStorage.setItem("email", data.email);
        localStorage.setItem("credits", data.credits);
        window.location.href = "/dashboard";
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="app-bg">
      <div className="glass-card">
        <h1 className="title">
          Smart Bin <span>🗑</span>
        </h1>

        <input
          className="input-field"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="primary-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
