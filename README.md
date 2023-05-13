# Team Profile Generator

## Description

The Team Profile Generator is a command-line application that allows you to easily create a webpage containing basic information about your team. By providing details for the manager and team members, the application generates a webpage that displays essential information about each team member. This makes it convenient for the manager to access and share the team's information.

[Sample of generated webpage](https://adriwg.github.io/team-profile-generator/output/team.html)

## Installation

To run the application, you need to install the required dependencies, which are `inquirer` and `Jest`. Simply execute the command `npm install` in your integrated terminal to install the dependencies.

## Usage

1. Open the integrated terminal in VS Code and run the command `node index.js`. This will start the application.
2. Follow the prompt questions to provide the information of the manager, which includes details such as name, email, and office number.
3. Once you have finished entering the manager's information, a menu will be displayed with the options "**Add an engineer**," "**Add an intern**" and "**Finish building the team**" Choose the desired option to add a team member of that type.
4. Enter the information for the team member, including their name, email, and specific details based on their role.
5. After adding a team member, the menu will be displayed again, allowing you to add additional team members or finish building the team.
6. If you choose "**Finish building the team**," a webpage containing the basic information of the entire team will be generated. The generated webpage will be saved in the **output** directory.  

<img width="864" alt="Screenshot 2023-05-13 at 10 22 34 PM" src="https://github.com/adriwg/team-profile-generator/assets/124637485/ba9f5fae-84fb-40e8-b302-4df1be546491">  

<img width="1469" alt="Screenshot 2023-05-13 at 10 28 29 PM" src="https://github.com/adriwg/team-profile-generator/assets/124637485/7b35a190-294d-48c2-844e-78daae363ca2">


## Credits

N/A

## License

Please refer to the LICENSE in the repo.

## Tests

To run the test, execute the command `npm run test`.
