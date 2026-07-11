const {
    createContest,
    getAllContests,
    getContestById,
    updateContest,
    deleteContest,
    joinContest,
} = require("../controllers/contestController");
router.post("/:id/join", protect, joinContest);
router.get("/:id/leaderboard", protect, getLeaderboard);