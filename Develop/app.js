const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
var teamComplete = false;
var firstEmployeeCreated = false;
const employees = [];
init();

async function init() {
  while (teamComplete === false) {
    if (!firstEmployeeCreated) {
      await createManager();
    } else {
      await createEmp();
    }
  }
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  } else {
    fs.writeFile(outputPath, render(employees), function (err) {
      if (err) {
        throw err;
      }
      console.log("Successful! You have created a webpage for your team.");
    });
  }
}

async function createEmp() {
  await inquirer
    .prompt([
      {
        type: "list",
        name: "create",
        message: "Would you like to add another team member?",
        choices: ["Yes", "No"],
      },
    ])
    .then(async function (answers) {
      if (answers.create === "Yes") {
        //run appropriate createEmp
        await empSwitch();
      } else {
        teamComplete = true;
        console.log("Great, let's create that webpage!");
      } //write that file!!! "output"
    });
}

function empSwitch(res) {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "emprole",
        message: "What is this employee's role?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then(function (answers) {
      switch (answers.emprole) {
        case "Manager":
          return createManager();
        case "Engineer":
          return createEngineer();
        case "Intern":
          return createIntern();
        default:
          break;
      }
    });
}

function createIntern() {
  var questions = [
    {
      type: "input",
      name: "name",
      message: "What is the Intern's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is this Intern's id number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is this Intern's email address?",
    },
    {
      type: "input",
      name: "school",
      message: "Where did this Intern go to University?",
    },
  ];

  return inquirer.prompt(questions).then(function (answers) {
    //create manager instance
    var employee = new Intern(
      answers.name,
      answers.id,
      answers.email,
      answers.school
    );
    employees.push(employee); //add intern to employee array
  });
}

function createEngineer() {
  var questions = [
    {
      type: "input",
      name: "name",
      message: "What is the engineer's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is this engineer's id number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is this engineer's email address?",
    },
    {
      type: "input",
      name: "github",
      message: "What is this engineer's github username?",
    },
  ];

  return inquirer.prompt(questions).then(function (answers) {
    //create manager instance
    var employee = new Engineer(
      answers.name,
      answers.id,
      answers.email,
      answers.github
    );
    employees.push(employee); //add engineer to employee array
  });
}

function createManager() {
  var questions = [
    {
      type: "input",
      name: "name",
      message: "What is the manager's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is this manager's id number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is this manager's email address?",
    },
    {
      type: "input",
      name: "phone",
      message: "What is this manager's phone number?",
    },
  ];

  return inquirer.prompt(questions).then((answers) => {
    //create manager instance
    var employee = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.phone
    );
    employees.push(employee); //add manager to employee array
    firstEmployeeCreated = true;
  });
}
