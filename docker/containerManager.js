const { exec } = require("child_process");
const path = require("path");

const createContainer = (workspace) => {
    return new Promise((resolve, reject) => {

        const command = `docker run -dit --rm -v "${workspace}:/workspace" -w /workspace gcc:latest bash`;

        exec(command, (error, stdout, stderr) => {

            if (error) {
                return reject(stderr);
            }

            resolve(stdout.trim());

        });

    });
};

const removeContainer = (containerId) => {
    return new Promise((resolve, reject) => {

        exec(`docker stop ${containerId}`, (error, stdout, stderr) => {

            if (error) {
                return reject(stderr);
            }

            resolve();

        });

    });
};

module.exports = {
    createContainer,
    removeContainer,
};