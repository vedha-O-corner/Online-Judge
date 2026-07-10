// const { exec } = require("child_process");

// const executeCode = (executablePath, input) => {
//     return new Promise((resolve, reject) => {

//         const process = exec(
//             `"${executablePath}"`,
//             (error, stdout, stderr) => {

//                 if (error) {
//                     return reject(stderr);
//                 }

//                 resolve(stdout.trim());

//             }
//         );

//         process.stdin.write(input);

//         process.stdin.end();

//     });
// };

// module.exports = {
//     executeCode,
// };