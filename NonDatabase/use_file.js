// Pay attention to concurrency, multi-threads try to access the same file.

/* Input:
* $ node use_file.js add Floss the cat.
* Saved.
* $ node use_file.js list
* Floss the cat.
* $ node use_file.js add Buy some hats.
* $ node use_file.js list
* Floss the cat.
* Buy some hats.
* */

var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
var command = args.shift();
var taskDescription = args.join(' ');
var file = path.join(process.cwd(), '/.tasks');
console.log(file);

switch (command) {
    case 'list':
        _listTasks(file);
        break;
    case 'add':
        _addTask(file, taskDescription);
        break;
    default:
        console.log('Usage: ' + process.argv[0] + ' list|add [taskDescription]');
}

// load file's JSON data
function _loadOrInitializeTaskArray(file, cb) {
    fs.exists(file, function (exists) {
        var tasks = [];
        if(exists) {
            fs.readFile(file, 'utf-8', function (err, data) {
                if(err) {
                    throw err;
                }

                var data = data.toString();
                var tasks = JSON.parse(data || '[]');
                cb(tasks);
            });
        } else {
            cb([]);
        }
    });
}

function _listTasks(file) {
    _loadOrInitializeTaskArray(file, function (tasks) {
        for(var i in tasks) {
            console.log(tasks[i]);
        }
    });
}

// store the file on disk
function _storeTasks(file, tasks) {
    fs.writeFile(file, JSON.stringify(tasks), 'utf-8', function (err) {
        if(err) {
            throw err;
        }

        console.log('Saved.');
    });
}

function _addTask(file, taskDescription) {
    _loadOrInitializeTaskArray(file, function (tasks) {
        tasks.push(taskDescription);
        _storeTasks(file, tasks);

    });
}

