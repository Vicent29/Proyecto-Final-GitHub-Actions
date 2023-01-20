const core = require("@actions/core");
const path = require('path');
const fs = require("fs");

//Declaration of variables
const readmePath = path.resolve('./README.md');
const resultado_tests = core.getInput('resultado_cypress');

const test_succes = "https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg";
const test_failure = "https://img.shields.io/badge/test-failure-red"

//Add Badge
var Badge = resultado_tests == "success" ? test_succes : test_failure;

//Change Readme
fs.readFile(readmePath, 'utf8', function(err, data) {
    if (err) throw err;
    let README = data.search(test_succes) !== -1 ? data.replace(test_succes, Badge) : data.replace(test_failure, Badge)
    fs.writeFile(readmePath, README, function(err) {
        if (err) throw err;
        console.log("Badge añadido correctamente");
        process.exit(0)
    });
});