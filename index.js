const { prompt } = require('inquirer');
// require database
const db = require('./db');

// require console table
require('console.table');

startApp();

// app start
function startApp() {
    console.log('Welcome to employee management');
    mainMenu();
};

function mainMenu() {
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
                viewDepartments();
                break;
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
            case 'QUIT':
                quit();
                break;
            default:
                'QUIT'
        }
    });
};


// view departments
function viewDepartments() {
    db.getAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log('\n');
            console.table(departments);
        })
        .then(() => mainMenu()
        );
};


// view roles
function viewRoles() {
    db.getAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log('\n');
            console.table(roles);
        })
        .then(() => mainMenu()
        );
};


// view employees
function viewEmployees() {
    db.getAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(() => mainMenu()
        );
};


// add a department
function addDepartment() {
    prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the department name:'
        }
    ])
        .then(res => {
            let name = res;
            db.addDepartment(name)
                .then(() => console.log(`Department ${name} has been added!`))
                .then(() => mainMenu()
                );
        });
};


// add role
function addRole() {
    db.getAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Please enter the role name:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Please enter the role salary:'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Please select the department where this role should be added:',
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    db.addRole(role)
                        .then(() => console.log(`${role.title} has been added!`))
                        .then(() => mainMenu()
                        );
                })
        })
};


// add an employee
function addEmployee() {
    prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Please enter the employee's first name:"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Please enter the employee's last name:"
        }
    ])
    .then(res => {
        let first_name = res.first_name;
        let last_name = res.last_name;    

        db.getAllRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                }));

                prompt([
                    {
                        type: 'list',
                        name: 'roleId',
                        message: "What is this employee's role?",
                        choices: roleChoices
                    }
                ])
                .then(res => {
                    let role_id = res.roleId;

                    db.getAllEmployees()
                        .then(([rows]) => {
                        let employees = rows;
                        const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                            name: `${last_name}, ${first_name}`,
                            value: id
                        }));

                        managerChoices.splice(0,0,{name: 'None', value: 'null'});

                        prompt([
                            {
                                type: 'list',
                                name: 'managerId',
                                message: "Please select the employee's manager:",
                                choices: managerChoices
                            }
                        ])
                        .then(res => {
                            let employee = {
                                manager_id: res.managerId,
                                role_id: role_id,
                                first_name: first_name,
                                last_name: last_name
                            };

                            db.addEmployee(employee);
                        })
                        .then(() => console.log(
                            `${last_name}, ${first_name} has been added successfully`
                        ))
                        .then(() => mainMenu()
                        );

                    })
                })
            });
        });
    };


// update employee role
function updateEmployeeRole() {
    db.getAllEmployees ()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${last_name}, ${first_name}`,
                value: id
        }));

        prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Please select an employee to update:',
                choices: employeeChoices
            }
        ])
        .then(res => {
            let employeeId = res.employeeId;
            db.getAllRoles ()
            .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                }));

                prompt([
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'Please select a role to assign to employee!',
                        choices: roleChoices
                    }
                ])
                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                .then(() => console.log('Employee has been assigned to new role!'))
                .then(() => mainMenu()
                );
            })
        });
    });
};


// quit
function quit() {
    console.log("See you next time!");
    process.exit();
};