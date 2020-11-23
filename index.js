const { prompt } = require('inquirer');
// require database
const db = require('./db');

// require console table
require('console.table');

startApp();

// app start
function startApp () {
    console.log('Welcome to employee management');
    mainMenu();
};

function mainMenu () {
    prompt([
        {
            type: 'list',
            name: 'action',
            message: "What do you want to do?",
            choices: [
                { 
                    name: 'View All Departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'Add A Department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Add A Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Add An Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
                {
                    name: 'Quit',
                    value: 'QUIT'
                }
            ]
        }        
    ]).then(res => {
        let action = res.action;

        // take next action based on initial choice
        switch (action) {
            case 'VIEW_DEPARTMENTS':
                viewDePARTMENTS();
                break;:
            case 'VIEW_ROLES':
                viewRoles();
                break;
            case 'VIEW_EMPLOYEES':
                viewEmployees();
                break;
            case 'ADD_DEPARTMENT':
                addDepartment();
                break;
            case 'ADD_ROLE':
                addRole();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRole();
                break;
            default:
                'QUIT';
        }
    })
};