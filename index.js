const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const findTorrent = require('./app/findTorrent');
findTorrent.findTorrent()


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('findTorrent', (data) => {
      console.log(data)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(80, () => {
  console.log('listening on *:80');
});