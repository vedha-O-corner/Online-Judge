// const { exec } = require("child_process");
// const path = require("path");

// const runInDocker = (filePath, input) => {

//     return new Promise((resolve, reject) => {

//         const folder = path.dirname(filePath);

//         const fileName = path.basename(filePath);

//         const executable = fileName.replace(".cpp", ".out");

//         const command = `docker run --rm -i -v "${folder}:/code" gcc:latest bash -c "g++ /code/${fileName} -o /code/${executable} && /code/${executable}"`;

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
//     runInDocker,
// };