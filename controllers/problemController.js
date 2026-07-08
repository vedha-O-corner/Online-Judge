const Problem = require("../models/problem");

const createProblem = async (req, res) => {
    try {
        const problem = await Problem.create({
            ...req.body,
            createdBy: req.user._id,
        });

        return res.status(201).json({
            message: "Problem created successfully",
            problem,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find();

        return res.status(200).json({
            count: problems.length,
            problems,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found",
            });
        }

        return res.status(200).json(problem);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const updateProblem = async (req, res) => {
    try {
        const problem = await Problem.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found",
            });
        }

        return res.status(200).json({
            message: "Problem updated successfully",
            problem,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const deleteProblem = async (req, res) => {
    try {
        const problem = await Problem.findByIdAndDelete(req.params.id);

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found",
            });
        }

        return res.status(200).json({
            message: "Problem deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createProblem,
    getAllProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
};