// require connection
const connection = require('./connect');

class DB {
    constructor() {
        this.connection = connection;
    }
    // get all departments
    getAllDepartments() {
        return this.connection.promise().query(
            'SELECT departments.id, departments.name FROM departments'
        );
    };

    // get all roles
    getAllRoles() {
        return this.connection.promise().query(
            'SELECT roles.id, roles.title, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id;'
        );
    };

    // get all employees
    getAllEmployees() {
        return this.connection.promise().query(
            'SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, departments.name AS department, roles.salary, CONCAT(manager.last_name, manager.first_name) AS manager FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id;'
        );
    };

    // add department
    addDepartment(department) {
        return this.connection.promise().query(
            'INSERT INTO departments SET ?',
            department           
        );
    };

    // add role
    addRole(role) {
        return this.connection.promise().query(
            'INSERT INTO roles SET ?',
            role
        );
    };

    // add employee
    addEmployee(employee) {
        return this.connection.promise().query(
            'INSERT INTO employees SET ?',
            employee
        );
    };

    // update employee
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            'UPDATE employees SET role_id = ? WHERE id = ?',
            [roleId, employeeId]
        );
    };
};


module.exports = new DB;
