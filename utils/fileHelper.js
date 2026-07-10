const fs = require("fs");
const path = require("path");

const createSourceFile = (submissionId, language, code) => {

    const extensions = {
        cpp: "cpp",
        java: "java",
        python: "py",
    };

    const tempDir = path.join(__dirname, "..", "temp");

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    const workspace = path.join(tempDir, submissionId.toString());

    if (!fs.existsSync(workspace)) {
        fs.mkdirSync(workspace);
    }

    const fileName = `Main.${extensions[language]}`;

    const filePath = path.join(workspace, fileName);

    fs.writeFileSync(filePath, code);

    return {
        workspace,
        filePath,
    };

};

module.exports = {
    createSourceFile,
};