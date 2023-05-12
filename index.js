const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Question sets
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

const question_menu = [{
    type: 'list',
    name: 'option',
    message: 'Please select what type of employee you would like to add?',
    choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
}];

// Object holds the team employees
const employee = {
    manager: [],
    engineer: [],
    intern: []
};

const askQuestions = (quest_set) => {
    inquirer.prompt(quest_set)
        .then((answers) => {
            console.log(answers);
            if (quest_set === question_manager) {
                employee.manager.push(answers);
                askQuestions(question_menu);
            } else if (quest_set === question_engineer) {
                employee.engineer.push(answers);
                askQuestions(question_menu);
            } else if (quest_set === question_intern) {
                employee.intern.push(answers);
                askQuestions(question_menu);
            } else if (quest_set === question_menu) {
                if (answers.option == 'Add an engineer') {
                    askQuestions(question_engineer);
                } else if (answers.option == 'Add an intern') {
                    askQuestions(question_intern);
                } else if (answers.option == 'Finish building the team') {
                    console.log("finish building the team");
                    //render(employee);
                }
            }
            console.log(employee);
        });

};

/* const askQuestions = (quest_set) => {
    const all_questions = [...quest_set, ...question_menu];
    console.log(all_questions);
    inquirer.prompt(all_questions).then((answers) => {
        console.log(answers);
        if (answers.option === 'Add an engineer') {
            employee.engineer.push(delete answers.option);
            askQuestions(question_engineer);
        }else{

        }
    });

}; */

askQuestions(question_manager);