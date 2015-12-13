// redis: can pass data by message channel (publish/subscribe mode)

var net = require('net');
var redis = require('redis');

var server = net.createServer(function(socket) {
    var subscriber;
    var publisher;

    // !!! DON'T need to listen on the connect event
    // http://stackoverflow.com/questions/16903844/node-js-net-events-dont-fire
    //socket.on('connect', function() {
        subscriber = redis.createClient();
        subscriber.subscribe('main_chat_room');

        subscriber.on('message', function(channel, message) {
            socket.write('Channel ' + channel + ': ' + message);
        });

        publisher = redis.createClient();
    //});

    socket.on('data', function(data) {
        publisher.publish('main_chat_room', data);
    });

    socket.on('end', function() {
        subscriber.unsubscribe('main_chat_room');
        subscriber.end();
        publisher.end();
    });
});

server.listen(3000);

// client
/* telnet 127.0.0.1 3000
 * or in node, create net.Socket and .connect(3000);
 */
/