const fs = require("fs");
const generate = require("./utils/generate");
function getLicense(value) 
{
    switch (value === "GNU AGPLv3") 
    {
        case 0:
            return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
        case 1:
            return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        case 2: 
            return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
        case 3:
            return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
        case 4:
            return "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
        case 5:
            return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
        case 6:
            return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    }

    function validateInput(value) 
    {
        if (value != "") 
        {
            return true;
        } 
        else 
        {
            return "Please answer the question with some kind on input.";
        }
    }

    let questions = [

        {
            type: "input",
            name: "title",
            message: "What is the title of your project?",
            validate: validateInput,
        },

        {
            type: "input",
            name: "description",
            message: "Please enter a description of your project.",
            validate: validateInput,
        },

        {
            type: "input",
            name: "installation",
            message: "Please enter an explanation how to install the software, or commands for the program.",
            validate: validateInput,
        },

        {
            type: "input",
            name: "usage",
            message: "Please describe how we can use this program/project.",
            validate: validateInput,
        },

        {
            type: "list",
            name: "license",
            message: "Please select a license for this project.",
            choices: [
                "GNU AGPLv3",
                "GNU GPLv3",
                "GNU LGPLv3",
                "Apache 2.0",
                "Boost Software 1.0",
                "MIT",
                "Mozilla",
            ],
            validate: validateInput,
        },

        {
            type: "input",
            name: "contributing",
            message: "How can users contribute to your project.",
            validate: validateInput,
        },

        {
            type: "input",
            name: "tests",
            message: "Please enter any testing instructions you would like to provide for this project.",
            validate: validateInput,
        },

        {
            type: "input",
            name: "userName",
            message: "What is your GitHub username?",
            validate: validateInput,
        },

        {
            type: "input",
            name: "userEmail",
            message: "What is your GitHub email address that contributors may contact?",
            validate: function (value) 
            {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) 
                {
                    return true;
                } 
                else 
                {
                    return "Not a valid email address. Please enter a valid email address.";
                }
            },
        },
    ];
    function writeToFile(fileName, data) 
    {
        fs.writeToFile(fileName, generateMarkdown(data), function (err)
        {
            if (err) 
            {
                return console.log(err);
            }
        });
    }

    function init() 
    {
        inquire.prompt(questions).then((data) => 
        {
            console.log(JSON.stringify(data, null, " "));
            data.getLicense = getLicense(data.license);
            writeToFile("./example/README.md", data);
        });
    }
    init();
}
