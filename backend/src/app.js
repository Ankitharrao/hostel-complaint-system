const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ["http://localhost:80", "http://localhost", "http://localhost:3000", "http://localhost:3001"];

app.use(cors({
  origin: true,  // reflects the request origin, allows all
  credentials: true
}));


app.use("/api/auth", require("./routes/auth"));
app.use("/api/complaints", require("./routes/complaints"));

module.exports = app;
