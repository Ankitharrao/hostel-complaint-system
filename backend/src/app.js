const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // React dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


app.use("/api/auth", require("./routes/auth"));
app.use("/api/complaints", require("./routes/complaints"));

module.exports = app;
