const Submission = require("../models/submission");
const Problem = require("../models/problem");

const submitCode = async (req, res) => {
    try {
        const { problem, language, code } = req.body;

        if (!problem || !language || !code) {
            return res.status(400).json({
                message: "Please provide all required fields",
            });
        }

        const existingProblem = await Problem.findById(problem);

        if (!existingProblem) {
            return res.status(404).json({
                message: "Problem not found",
            });
        }

        const submission = await Submission.create({
            user: req.user._id,
            problem,
            language,
            code,
        });

        return res.status(201).json({
            message: "Submission created successfully",
            submission,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id)
            .populate("user", "name email")
            .populate("problem", "title difficulty");

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found",
            });
        }

        return res.status(200).json(submission);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getMySubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({
            user: req.user._id,
        })
        .populate("problem", "title difficulty")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            count: submissions.length,
            submissions,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const deleteSubmission = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found",
            });
        }

        if (
            submission.user.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        await Submission.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "Submission deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


module.exports={
    submitCode,
    getSubmissionById,
    getMySubmissions,
    deleteSubmission,
};