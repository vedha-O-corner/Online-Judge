const { exec } = require("child_process");

const dockerCompile = (containerId, language) => {
    return new Promise((resolve, reject) => {

        if (language !== "cpp") {
            return reject("Language not supported");
        }

        const command =
            `docker exec ${containerId} g++ Main.cpp -o Main.out`;

        exec(command, (error, stdout, stderr) => {

            if (error) {
                return reject(stderr);
            }

            resolve("Main.out");

        });

    });
};

module.exports = {
    dockerCompile,
};