const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    submitCode,
    getSubmissionById,
    getMySubmissions,
    deleteSubmission,
} = require("../controllers/submissionController");

router.post("/", protect, submitCode);

router.get("/my", protect, getMySubmissions);

router.get("/:id", protect, getSubmissionById);

router.delete("/:id", protect, deleteSubmission);

module.exports = router;