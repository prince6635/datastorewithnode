/* Redis: short-term saving, like text messages or data in games
* data in RAM, changes of data in disk (logs), use logs to recover data
* */

var redis = require('redis');

var client = redis.createClient(6379, '127.0.0.1');
client.on('error', function (err) {
    console.log('Error: ' + err);
});

// save data by key-value pair format
client.set('color', 'red', redis.print);
client.get('color', function (err, value) {
    if (err) {
        throw err;
    }
    console.log('Got: ' + value);
});

// save data by hash table format
client.hmset('camping', {
    'shelter': '2-person tent',
    'cooking': 'campstove'
}, redis.print);

client.hget('camping', 'cooking', function (err, value) {
    if (err) throw err;
    console.log('Will be cooking with: ' + value);
});

client.hkeys('camping', function (err, keys) {
    if (err) throw err;
    keys.forEach(function (key, i) {
        console.log(' ' + key);
    });
});

// save data by linked list
client.lpush('tasks', 'Paint the bikeshed red.', redis.print);
client.lpush('tasks', 'Paint the bikeshed green.', redis.print);
client.lrange('tasks', 0, -1, function (err, items) {
    if (err) throw err;
    items.forEach(function (item, i) {
        console.log(' ' + item);
    });
});

// save data by set
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '72.10.37.196', redis.print);
client.smembers('ip_addresses', function (err, members) {
    if (err) throw err;
    console.log(members);
});


