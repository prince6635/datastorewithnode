var http = require('http');
var work = require('./lib/timetrack');
var mysql = require('mysql');

// Set up MySql:
// http://stackoverflow.com/questions/10299148/mysql-error-1045-28000-access-denied-for-user-billlocalhost-using-passw
// "CREATE DATABASE timetrack;" to create the database first.

// 1, create a mysql db connection
var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'ziwang',
    password: 'admin',
    database: 'timetrack'
});

// 2, create a http server
var server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST':
            switch (req.url) {
                case '/':
                    work.add(db, req, res);
                    break;
                case '/archive':
                    work.archive(db, req, res);
                    break;
                case '/delete':
                    work.delete(db, req, res);
                    break;
            }
            break;
        case 'GET':
            switch (req.url) {
                case '/':
                    work.show(db, res);
                    break;
                case '/archived':
                    work.showArchived(db, res);
            }
            break;
    }
});

// 3, create db table and listen to the http request port
db.query(
    'CREATE TABLE IF NOT EXISTS work (' +
    'id INT(10) NOT NULL AUTO_INCREMENT, ' +
    'hours DECIMAL(5,2) DEFAULT 0, ' +
    'date DATE, ' +
    'archived INT(1) DEFAULT 0, ' +
    'description LONGTEXT, ' +
    'PRIMARY KEY(id))',
    function (err) {
        if (err) {
            throw err;
        }

        console.log('Server started...');
        server.listen(3000, '127.0.0.1');
    }
);



