const Contest = require("../models/contest");
const Problem = require("../models/problem");
const Submission = require("../models/submission");
const createContest = async (req, res) => {
    try {

        const {
            title,
            description,
            startTime,
            endTime,
            problems,
            isPublic,
        } = req.body;

        if (
            !title ||
            !description ||
            !startTime ||
            !endTime ||
            !problems
        ) {
            return res.status(400).json({
                message: "Please provide all required fields",
            });
        }

        for (const problemId of problems) {

            const existingProblem = await Problem.findById(problemId);

            if (!existingProblem) {
                return res.status(404).json({
                    message: `Problem not found: ${problemId}`,
                });
            }

        }

        const contest = await Contest.create({
            title,
            description,
            startTime,
            endTime,
            problems,
            createdBy: req.user._id,
            isPublic,
        });

        return res.status(201).json({
            message: "Contest created successfully",
            contest,
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        });

    }
};

const getAllContests = async (req, res) => {
    try {

        const contests = await Contest.find()
            .populate("createdBy", "name email")
            .populate("problems", "title difficulty")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: contests.length,
            contests,
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        });

    }
};

const getContestById = async (req, res) => {
    try {

        const contest = await Contest.findById(req.params.id)
            .populate("createdBy", "name email")
            .populate("problems", "title description difficulty");

        if (!contest) {
            return res.status(404).json({
                message: "Contest not found",
            });
        }

        return res.status(200).json(contest);

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        });

    }
};

const updateContest = async (req, res) => {
    try {

        const contest = await Contest.findById(req.params.id);

        if (!contest) {
            return res.status(404).json({
                message: "Contest not found",
            });
        }

        const {
            title,
            description,
            startTime,
            endTime,
            problems,
            isPublic,
        } = req.body;

        if (problems) {

            for (const problemId of problems) {

                const existingProblem = await Problem.findById(problemId);

                if (!existingProblem) {
                    return res.status(404).json({
                        message: `Problem not found: ${problemId}`,
                    });
                }

            }

        }

        contest.title = title || contest.title;
        contest.description = description || contest.description;
        contest.startTime = startTime || contest.startTime;
        contest.endTime = endTime || contest.endTime;
        contest.problems = problems || contest.problems;

        if (isPublic !== undefined) {
            contest.isPublic = isPublic;
        }

        await contest.save();

        return res.status(200).json({
            message: "Contest updated successfully",
            contest,
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        });

    }
};

const deleteContest = async (req, res) => {
    try {

        const contest = await Contest.findById(req.params.id);

        if (!contest) {
            return res.status(404).json({
                message: "Contest not found",
            });
        }

        await Contest.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "Contest deleted successfully",
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        });

    }
};

const joinContest = async (req, res) => {
    try {

        const contest = await Contest.findById(req.params.id);

        if (!contest) {
            return res.status(404).json({
                message: "Contest not found",
            });
        }

        const alreadyJoined = contest.participants.includes(req.user._id);

        if (alreadyJoined) {
            return res.status(400).json({
                message: "You have already joined this contest",
            });
        }

        contest.participants.push(req.user._id);

        await contest.save();

        return res.status(200).json({
            message: "Successfully joined the contest",
            contest,
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        });

    }
};

const getLeaderboard = async (req, res) => {
    try {

        const contest = await Contest.findById(req.params.id)
            .populate("participants", "name email");

        if (!contest) {
            return res.status(404).json({
                message: "Contest not found",
            });
        }

        const leaderboard = [];

        for (const participant of contest.participants) {

            const submissions = await Submission.find({
                contest: contest._id,
                user: participant._id,
                status: "Accepted",
            });

            const solvedProblems = new Set();

            for (const submission of submissions) {
                solvedProblems.add(submission.problem.toString());
            }

            leaderboard.push({
                user: participant,
                solved: solvedProblems.size,
            });

        }

        leaderboard.sort((a, b) => b.solved - a.solved);

        return res.status(200).json({
            contest: contest.title,
            leaderboard,
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        });

    }
};

module.exports = {
    createContest,
    getAllContests,
    getContestById,
    updateContest,
    deleteContest,
    joinContest,
    getLeaderboard,
};