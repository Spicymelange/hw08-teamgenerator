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
    }
    else {
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
  await inquirer.prompt([
    {
      type: "list",
      name: "create",
      message: "Would you like to add another team member?",
      choices: [
        "Yes",
        "No"
      ]
    }     
  ]).then(async function (answers) {
    if (answers.create === "Yes") {
      //run appropriate createEmp
      await empSwitch();
    }
    else {
      teamComplete = true;
      console("Great, let's create that webpage!");
    }//write that file!!! "output"
  })
};

function empSwitch(res) {
  inquirer.prompt([
    {
      type: "input",
      name: "emprole",
      message: "What is this employee's role?",
      choices: [
        "Manager",
        "Engineer",
        "Intern"
      ]
    }
    ]).then(function(answers) {
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
    })
}

function createIntern() {
  var questions = [
    {
      type: "input",
      name: "name",
      message: "What is the Intern's name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is this Intern's id number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is this Intern's email address?"
    },
    {
      type: "input",
      name: "school",
      message: "Where did this Intern go to University?"
    }
  ];

  inquirer.prompt(questions).then(function (answers) {
    //create manager instance
    var employee = new Intern(answers.name, answers.id, answers.email, answers.github);
    employees.push(employee);//add intern to employee array
  })
}

function createEngineer() {
  var questions = [
    {
      type: "input",
      name: "name",
      message: "What is the engineer's name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is this engineer's id number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is this engineer's email address?"
    },
    {
      type: "input",
      name: "github",
      message: "What is this engineer's github username?"
    }
  ];

  inquirer.prompt(questions).then(function (answers) {
    //create manager instance
    var employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
    employees.push(employee);//add engineer to employee array
  })
}

function createManager() {
  var questions = [
    {
      type: "input",
      name: "name",
      message: "What is the manager's name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is this manager's id number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is this manager's email address?"
    },
    {
      type: "input",
      name: "phone",
      message: "What is this manager's phone number?"
    }
  ];
  
  return inquirer.prompt(questions).then(answers => {
    //create manager instance
    var employee = new Manager(answers.name, answers.id, answers.email, answers.phone);
    employees.push(employee);//add manager to employee array
    firstEmployeeCreated = true;
  });
}

// use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
//      Use validate on every input to check criteria
    //create manager, engineer, itern objects with user inputs // createEmp(Eng/Intern)
//Joe is creating manager and empTeam seperately
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


//X...create employee class, constructor, methods, pass all tests 
//X... vars-boolean for isTeamDone, firstEmployee(should be manager), array of employees
//  init() will need to call createManager, then create other employees
//  inquirer syntax?
//  once manager is created update firstEmployee state
//  after each employee, prompt for another create function?
//
//  while(!isTeamDone) continue prompt
//ask question w/ inquirer prompt .then send answers
//     
//insert array of answers into placeholders

//write file team.html