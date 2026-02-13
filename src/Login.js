import React, { useState } from "react";
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://smart-bin-backend-zygj.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("email", data.email);
      localStorage.setItem("credits", data.credits);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert("Backend waking up. Try again in 10 seconds.");
    } finally {
      setLoading(false);
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
