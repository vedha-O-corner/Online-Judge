const express = require("express");
const router = express.Router();
const adminOnly = require("../middleware/adminMiddleware");
const protect = require("../middleware/authMiddleware");
const {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
} = require("../controllers/problemController");
router.get("/", getAllProblems);
router.post("/", protect, adminOnly, createProblem);
router.get("/:id", getProblemById);
router.put("/:id", protect, adminOnly, updateProblem);
router.delete("/:id", protect, adminOnly, deleteProblem);
module.exports = router;