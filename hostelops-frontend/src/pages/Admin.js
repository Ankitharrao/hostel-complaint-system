import { useState, useEffect } from "react";
import API from "../services/api";
import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in as admin");
      navigate("/login");
      return;
    }

    const fetchComplaints = async () => {
      try {
        const res = await API.get("/complaints/all");
        setComplaints(res.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        alert("Failed to fetch complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Update complaint status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/complaints/${id}/status`, { status: newStatus });
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  // Filter complaints by category
  const filteredComplaints =
    filterCategory === "All"
      ? complaints
      : complaints.filter((c) => c.category === filterCategory);

  // Extract all unique categories
  const categories = ["All", ...new Set(complaints.map((c) => c.category))];

  return (
    <div className="admin-container">
      <h2>All Complaints</h2>

      {loading ? (
        <p>Loading complaints...</p>
      ) : (
        <>
          <div style={{ marginBottom: "15px" }}>
            <label>
              Filter by category:{" "}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filteredComplaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((c) => (
                  <tr key={c._id || c.id}>
                    <td>{c._id || c.id}</td>
                    <td>{c.user || c.email}</td>
                    <td>{c.title}</td>
                    <td>{c.description}</td>
                    <td>{c.category}</td>
                    <td>{c.status}</td>
                    <td>
                      <select
                        value={c.status}
                        onChange={(e) =>
                          handleStatusChange(c._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default AdminPage;
