const { exec } = require("child_process");

const dockerExecute = (
    containerId,
    input,
    timeLimit = 2000
) => {

    return new Promise((resolve, reject) => {

        const escapedInput = input.replace(/\n/g, "\\n");

        const command = `docker exec ${containerId} bash -c "echo -e '${escapedInput}' | ./Main.out"`;

        const child = exec(
            command,
            { timeout: timeLimit },
            (error, stdout, stderr) => {

                if (error) {

                    if (error.killed) {
                        return resolve({
                            stdout: "",
                            stderr: "",
                            exitCode: -1,
                            timedOut: true,
                        });
                    }

                    return resolve({
                        stdout: stdout.trim(),
                        stderr: stderr.trim(),
                        exitCode: error.code,
                        timedOut: false,
                    });
                }

                resolve({
                    stdout: stdout.trim(),
                    stderr: stderr.trim(),
                    exitCode: 0,
                    timedOut: false,
                });

            }
        );

    });

};

module.exports = {
    dockerExecute,
};