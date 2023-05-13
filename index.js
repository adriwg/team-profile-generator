const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Validates the input to ensure it does not contain any numbers.
const validate_no_numbers = val => /^[^\d]+$/.test(val) || 'Numbers are not allowed.';

// Validates the input to ensure it is a valid email.
const validate_email = val => /^\S+@\S+\.\S+$/.test(val) || 'Please enter a valid email address.';


// Validates the input to ensure it contains only numbers.
const validateNumbersOnly = val => /^[0-9]+$/.test(val) || 'Please enter numbers 0-9 only.';

// Validates the input to ensure it contains only letters, numbers and hyphens.
const validateAlphanumericHyphens = val => /^[a-zA-Z0-9-]+$/.test(val) || 'Please enter alphanumeric characters and hyphens only.';

// Question set for manager
const question_manager = [{
        type: 'input',
        name: 'manager_name',
        message: 'Build your team.\nWhat is the name of the manager?',
        validate: validate_no_numbers
    },
    {
        type: 'input',
        name: 'manager_id',
        message: 'What is id of the manager?',
        validate: validateNumbersOnly
    },
    {
        type: 'input',
        name: 'manager_email',
        message: 'What is the email of the manager?',
        validate: validate_email
    },
    {
        type: 'input',
        name: 'manager_office_number',
        message: 'What is the office number of the manager?',
        validate: validateNumbersOnly
    }
];

//Question set for engineer
const question_engineer = [{
        type: 'input',
        name: 'engineer_name',
        message: 'What is the name of the engineer?',
        validate: validate_no_numbers
    },
    {
        type: 'input',
        name: 'engineer_id',
        message: 'What is the id of the engineer?',
        validate: validateNumbersOnly
    },
    {
        type: 'input',
        name: 'engineer_email',
        message: 'What is the email of the engineer?',
        validate: validate_email
    },
    {
        type: 'input',
        name: 'engineer_github',
        message: 'What is the github username of the engineer?',
        validate: validateAlphanumericHyphens
    }
];

// Question set for intern
const question_intern = [{
        type: 'input',
        name: 'intern_name',
        message: 'What is the name of the intern?',
        validate: validate_no_numbers
    },
    {
        type: 'input',
        name: 'intern_id',
        message: 'What is the id of the intern?',
        validate: validateNumbersOnly
    },
    {
        type: 'input',
        name: 'intern_email',
        message: 'What is the email of the intern?',
        validate: validate_email
    },
    {
        type: 'input',
        name: 'intern_school',
        message: 'What is the school of the intern?',
        validate: validate_no_numbers
    }
];


// Question set for menu
const question_menu = [{
    type: 'list',
    name: 'option',
    message: 'Please choose the type of team member you wish to add:',
    choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
}];

// Array  holds the team employees
const team = [];

// Ask questions function for different sets of questions
const askQuestions = (quest_set) => {
    inquirer.prompt(quest_set)
        .then((answers) => {
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

// Init 
askQuestions(question_manager);

// Write file function
const writeFile = () => {
    // Make an output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, render(team), (error) => error ? console.error(error) : console.log("team is successfully created!"));
};