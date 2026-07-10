// const { exec } = require("child_process");
// const path = require("path");

// const compileCode = (filePath, language) => {
//     return new Promise((resolve, reject) => {

//         if (language === "cpp") {

//             const outputFile = filePath.replace(".cpp", ".exe");

//             const command = `g++ "${filePath}" -o "${outputFile}"`;

//             exec(command, (error, stdout, stderr) => {

//                 if (error) {
//                     return reject(stderr);
//                 }

//                 resolve(outputFile);

//             });

//         }

//         else if (language === "python") {

//             resolve(filePath);

//         }

//         else if (language === "java") {

//             const command = `javac "${filePath}"`;

//             exec(command, (error, stdout, stderr) => {

//                 if (error) {
//                     return reject(stderr);
//                 }

//                 resolve(filePath.replace(".java", ".class"));

//             });

//         }

//         else {

//             reject("Unsupported language");

//         }

//     });
// };

// module.exports = {
//     compileCode,
// };