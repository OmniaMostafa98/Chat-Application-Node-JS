const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/:id', (req, res) => {
  res.sendFile(__dirname + '/specificuser.html');
 
  
});

io.on('connection', (socket) => {
  console.log(socket.id);
    socket.on('chat message', (msg,user) => {
     // io.emit('chat message', msg);
      io.to(socket.id).emit('chat message', msg);
      io.to(user).emit('chat message', msg);
      
      
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});