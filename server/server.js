//SERVER

const express = require('express');
const socket = require('socket.io');

let app = express();
let server = app.listen(3000);

app.use(express.static('public'));

let io = socket(server);

let players = {

}

io.sockets.on('connection', user => {
    console.log(`New Connection ${user.id}`)

    user.on('connected', info => {
        io.to(user.id).emit('Init', io.sockets.sockets.size);
        logPlayerCount(99);
    });

    user.broadcast.emit('NewUser', user.id);

    user.on('disconnecting', info => {
        user.broadcast.emit('RemoveUser', user.id);
    });

    user.on('disconnect', info => {
        console.log(`Disconnected ${user.id} (${info})`);
        logPlayerCount(99);
    });

    user.on('PlayerMovement', points => {
        players[user.id] = points;
        user.broadcast.emit("AllPlayers", players)
    })



    //USERS[user.id] = {x: 0, y: 0}

    // user.on('UserMouse', (data) => {
    //     USERS[user.id] = {x: data.x, y: data.y}
    //     user.broadcast.emit('AllUsers', USERS)
    // })


    // user.on('mouse', (data) => {
    //     user.broadcast.emit('mouse', data)
    // })
});

logPlayerCount = (maxPlayers) => {
    console.log(`${io.sockets.sockets.size}/${maxPlayers}`);
}