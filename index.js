const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Question set for manager
const question_manager = [{
        type: 'input',
        name: 'manager_name',
        message: 'Please build your team.\nWhat is the name of the manager?'
    },
    {
        type: 'input',
        name: 'manager_id',
        message: 'What is id of the manager?'
    },
    {
        type: 'input',
        name: 'manager_email',
        message: 'What is the email of the manager?'
    },
    {
        type: 'input',
        name: 'manager_office_number',
        message: 'What is the office number of the manager?'
    }
];

//Question set for engineer
const question_engineer = [{
        type: 'input',
        name: 'engineer_name',
        message: 'What is the name of the engineer?'
    },
    {
        type: 'input',
        name: 'engineer_id',
        message: 'What is the id of the engineer?'
    },
    {
        type: 'input',
        name: 'engineer_email',
        message: 'What is the email of the engineer?'
    },
    {
        type: 'input',
        name: 'engineer_github',
        message: 'What is the github username of the engineer?'
    }
];

// Question set for intern
const question_intern = [{
        type: 'input',
        name: 'intern_name',
        message: 'What is the name of the intern?'
    },
    {
        type: 'input',
        name: 'intern_id',
        message: 'What is the id of the intern?'
    },
    {
        type: 'input',
        name: 'intern_email',
        message: 'What is the email of the intern?'
    },
    {
        type: 'input',
        name: 'intern_school',
        message: 'What is the school of the intern?'
    }
];


// Question set for menu
const question_menu = [{
    type: 'list',
    name: 'option',
    message: 'Please select what type of employee you would like to add?',
    choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
}];

// Array  holds the team employees
const team = [];

// Ask questions function for different sets of questions
const askQuestions = (quest_set) => {
    inquirer.prompt(quest_set)
        .then((answers) => {
            console.log(answers);
            if (quest_set === question_manager) {
                team.push(new Manager(answers.manager_name, answers.manager_id, answers.manager_email, answers.manager_office_number));
                askQuestions(question_menu);
            } else if (quest_set === question_engineer) {
                team.push(new Engineer(answers.engineer_name, answers.engineer_id, answers.engineer_email, answers.engineer_github));
                askQuestions(question_menu);
            } else if (quest_set === question_intern) {
                team.push(new Intern(answers.intern_name, answers.intern_id, answers.intern_email, answers.intern_school));
                askQuestions(question_menu);
            } else if (quest_set === question_menu) {
                if (answers.option == 'Add an engineer') {
                    askQuestions(question_engineer);
                } else if (answers.option == 'Add an intern') {
                    askQuestions(question_intern);
                } else if (answers.option == 'Finish building the team') {
                    writeFile();
                }
            }
        });
};

// Write file function
const writeFile = () => {
    // Make an output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, render(team), (error) => error ? console.error(error) : console.log("team is successfully created!"));
};


// Init 
askQuestions(question_manager);