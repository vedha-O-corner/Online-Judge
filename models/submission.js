const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: true,
        },

        language: {
            type: String,
            enum: ["cpp", "java", "python"],
            required: true,
        },

        code: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Accepted",
                "Wrong Answer",
                "Compilation Error",
                "Runtime Error",
                "Time Limit Exceeded",
            ],
            default: "Pending",
        },

        executionTime: {
            type: Number,
            default: 0,
        },

        memory: {
            type: Number,
            default: 0,
        },
        contest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contest",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Submission", submissionSchema);