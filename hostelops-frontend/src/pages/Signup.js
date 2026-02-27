import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"; // your Axios instance
import "../styles/Login.css";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      console.log("Signup response:", res.data);

      alert("Signup successful! Please login.");
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response && err.response.data) {
        alert("Signup failed: " + err.response.data.message);
      } else {
        alert("Signup failed: Network or server error");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <button
            style={{
              background: "none",
              border: "none",
              color: "#2575fc",
              cursor: "pointer",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
