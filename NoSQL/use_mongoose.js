var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/tasks');

// register schema
var Schema = mongoose.Schema;
var Tasks = new Schema({
    project: String,
    description: String
});
mongoose.model('Task', Tasks);

// add task
var Task = mongoose.model('Task');
var task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red.';
task.save(function (err) {
    if (err) throw err;
    console.log('Task saved.');
});

// update
Task.update(
    {_id: '566ded8ab61beb609f19d6fe'},
    {description: 'Paint the bikeshed green.'},
    {multi: false},
    function (err, rows_updated) {
        if (err) throw err;
        console.log('Updated: ' + rows_updated);
    }
);

// search
Task.find({'project': 'Bikeshed'}, function (err, tasks) {
    console.log('searching...');
    for (var i = 0; i < tasks.length; i++) {
        console.log('ID:' + tasks[i]._id);
        console.log(tasks[i].description);
    }
});

// delete
Task.findById('566ded95f82dc66a9f05a8e0', function (err, task) {
    task.remove();
});

//mongoose.disconnect();