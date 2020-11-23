// require connection
const connection = require('./connect');

class DB {
    // get all departments
    getAllDepartments() {
        return this.connection.promise().query(
            'SELECT department.id, department.name FROM departments'
        );
    };

    // get all roles
    getAllRoles() {
        return this.connection.promise().query(
            'SELECT roles.id, roles.title, departments.name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id;'
        );
    };

    // get all employees
    getAllEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, departments.name AS department, roles.salary, CONCAT(manager.last_name, ',', manager.first_name) AS manager FROM employees LEFT JOIN roles on employee.role_id = role.id LEFT JOIN departments on role.department_id = department.id'
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
            'UPDATE employee SET role_id = ? WHERE id = ?',
            [roleId, employeeId]
        );
    };
};


module.exports = new DB;
