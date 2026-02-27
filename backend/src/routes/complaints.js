const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateStatus
} = require("../controllers/complaintController");

router.post("/", auth, createComplaint);
router.get("/", auth, getMyComplaints);
// admin
router.get("/all", auth, getAllComplaints);
router.put("/:id/status", auth, updateStatus);

module.exports = router;
