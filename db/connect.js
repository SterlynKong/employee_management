const mysql = require('mysql2');

// create connection to DATABASE
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    user: 'root',
    password: 'sqladmin',
    database: 'emp_manage'
});


connection.connect(err => {
    if (err) throw err;
    consle.log('Connected to emp_manage as id ' + connection.threadId);
});

module.exports = connection;