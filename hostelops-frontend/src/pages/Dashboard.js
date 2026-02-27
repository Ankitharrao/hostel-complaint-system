import API from "../services/api";
import { useEffect, useState } from "react";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    API.get("/complaints").then(res => setComplaints(res.data));
  }, []);

  const createComplaint = async () => {
    await API.post("/complaints", {
      title: "Fan issue",
      description: "Fan not working",
      category: "Electrical",
      priority: "High"
    });
    alert("Complaint submitted");
  };

  return (
    <div>
      <h2>My Complaints</h2>
      <button onClick={createComplaint}>Create Complaint</button>
      <ul>
        {complaints.map(c => (
          <li key={c._id}>{c.title} - {c.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
