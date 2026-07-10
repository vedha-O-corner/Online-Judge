// const { exec } = require("child_process");
// const path = require("path");

// const dockerExecute = (executablePath, input) => {
//     return new Promise((resolve, reject) => {

//         const folder = path.dirname(executablePath);

//         const executable = path.basename(executablePath);

//         const command = `docker run --rm -i -v "${folder}:/code" gcc:latest bash -c "/code/${executable}"`;

//         const process = exec(command, (error, stdout, stderr) => {

//             if (error) {
//                 return reject(stderr);
//             }

//             resolve(stdout.trim());

//         });

//         process.stdin.write(input);

//         process.stdin.end();

//     });
// };

// module.exports = {
//     dockerExecute,
// };