const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

io.on('connection', socket => {

    socket.join('room');

    socket.on('disconnect', function () {
        socket.leave('room');
    });

    console.log("new user: " + socket.id);

    socket.on('sendMessage', (message) => {
        console.log(message);
        io.to('room').emit('message', message);
    });
});


mongoose.connect('mongodb://rogerbambinetti:rogerbambinetti@cluster-shard-00-00-jmacf.mongodb.net:27017,cluster-shard-00-01-jmacf.mongodb.net:27017,cluster-shard-00-02-jmacf.mongodb.net:27017/chatroom?ssl=true&replicaSet=Cluster-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json());
app.use(cors());
app.use(routes);


server.listen(3333);