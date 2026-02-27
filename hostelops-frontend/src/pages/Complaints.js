import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/complaint.css";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userRole, setUserRole] = useState(""); // store user role

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchComplaints();
      fetchUserRole();
    }
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch current user info to check role
  const fetchUserRole = async () => {
    try {
      const res = await API.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserRole(res.data.role); // assume res.data.role === "admin" or "user"
    } catch (err) {
      console.error("Failed to get user info:", err);
    }
  };

  const submitComplaint = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/complaints",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      fetchComplaints();
    } catch (err) {
      alert("Failed to add complaint");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="complaints-container">
      <div className="header">
        <h2>Hostel Complaints</h2>
        <div>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          {userRole === "admin" && (
            <button
              style={{ marginLeft: "10px", backgroundColor: "#ff4d4f", color: "#fff" }}
              onClick={() => navigate("/admin")}
            >
              Admin
            </button>
          )}
          <button style={{ marginLeft: "10px" }} onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <form className="complaint-form" onSubmit={submitComplaint}>
        <input
          type="text"
          placeholder="Complaint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Complaint Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Add Complaint</button>
      </form>

      <div className="complaint-list">
        {complaints.length === 0 ? (
          <p>No complaints yet</p>
        ) : (
          complaints.map((c) => (
            <div className="complaint-card" key={c._id}>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Complaints;
