const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/GroupChat', (req, res) => {
  res.sendFile(__dirname + '/GroupChatOne.html');
 
  
});

io.on('connection', (socket) => {
    var room;
  console.log(socket.id);
    socket.on('room name', (msg) => {
     
      socket.join(msg);
      
      io.to(socket.id).emit('chat message', "Welcome in our room");

      room=msg;
      
    });
    socket.on('Message', (msg) => {
     
        
        io.to(room).emit('chat message', msg);

  
        
        
      });

  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});