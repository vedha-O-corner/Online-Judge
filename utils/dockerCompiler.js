// const { exec } = require("child_process");
// const path = require("path");

// const dockerCompile = (filePath, language) => {
//     return new Promise((resolve, reject) => {

//         if (language !== "cpp") {
//             return reject("Language not supported yet");
//         }

//         const folder = path.dirname(filePath);

//         const fileName = path.basename(filePath);

//         const executable = fileName.replace(".cpp", ".out");

//         const command = `docker run --rm -v "${folder}:/code" gcc:latest bash -c "g++ /code/${fileName} -o /code/${executable}"`;

//         exec(command, (error, stdout, stderr) => {

//             if (error) {
//                 return reject(stderr);
//             }

//             resolve(path.join(folder, executable));

//         });

//     });
// };

// module.exports = {
//     dockerCompile,
// };