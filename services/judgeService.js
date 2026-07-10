const Submission = require("../models/submission");
const Problem = require("../models/problem");

const { createSourceFile } = require("../utils/fileHelper");
const { compareOutput } = require("../utils/comparator");

const {
    createContainer,
    removeContainer,
} = require("../docker/containerManager");

const {
    dockerCompile,
} = require("../docker/dockerCompiler");

const {
    dockerExecute,
} = require("../docker/dockerExecutor");

const judgeSubmission = async (submissionId) => {

    console.log("Judge started");

    let containerId;

    try {

        const submission = await Submission.findById(submissionId);

        console.log("Submission Found");

        if (!submission) {
            throw new Error("Submission not found");
        }

        const problem = await Problem.findById(submission.problem);

        console.log("Problem Found");

        if (!problem) {
            throw new Error("Problem not found");
        }

        const { workspace } = createSourceFile(
            submission._id,
            submission.language,
            submission.code
        );

        console.log("Source File Created");

        containerId = await createContainer(workspace);

        console.log("Container Created");

        try {

            await dockerCompile(
                containerId,
                submission.language
            );

            console.log("Compiled");

        } catch (error) {

            console.error("Compilation Error");
            console.error(error);

            await Submission.findByIdAndUpdate(
                submissionId,
                {
                    status: "Compilation Error",
                }
            );

            if (containerId) {
                await removeContainer(containerId);
            }

            return;
        }

        console.log("Test Cases:", problem.testCases);
        console.log("Number of Test Cases:", problem.testCases.length);

        for (const testCase of problem.testCases) {

            console.log("Executing Test Case");
            console.log("Input:", testCase.input);

            const result = await dockerExecute(
                containerId,
                testCase.input
            );

            console.log("Execution Result:");
            console.log(result);

            if (result.timedOut) {

                await Submission.findByIdAndUpdate(
                    submissionId,
                    {
                        status: "Time Limit Exceeded",
                    }
                );

                await removeContainer(containerId);

                return;
            }

            if (result.exitCode !== 0) {

                await Submission.findByIdAndUpdate(
                    submissionId,
                    {
                        status: "Runtime Error",
                    }
                );

                await removeContainer(containerId);

                return;
            }

            const correct = compareOutput(
                result.stdout,
                testCase.output
            );

            console.log("Comparison:", correct);

            if (!correct) {

                await Submission.findByIdAndUpdate(
                    submissionId,
                    {
                        status: "Wrong Answer",
                    }
                );

                await removeContainer(containerId);

                return;
            }

        }

        await Submission.findByIdAndUpdate(
            submissionId,
            {
                status: "Accepted",
            }
        );

        console.log("Accepted");

        await removeContainer(containerId);

    } catch (error) {

        console.error("Judge Error");
        console.error(error);
        console.error(error.stack);

        if (containerId) {
            await removeContainer(containerId);
        }

    }

};

module.exports = {
    judgeSubmission,
};