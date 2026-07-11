const express = require("express");

const router = express.Router();

const {
    createContest,
    getAllContests,
    getContestById,
    updateContest,
    deleteContest,
    joinContest,
    getLeaderboard,
} = require("../controllers/contestController");

const { protect, admin } = require("../middleware/authMiddleware");

// Public Routes

router.get("/", getAllContests);

router.get("/:id", getContestById);

// Protected User Routes

router.post("/:id/join", protect, joinContest);

router.get("/:id/leaderboard", protect, getLeaderboard);

// Admin Routes

router.post("/", protect, admin, createContest);

router.put("/:id", protect, admin, updateContest);

router.delete("/:id", protect, admin, deleteContest);

module.exports = router;