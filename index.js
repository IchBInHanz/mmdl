const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const findTorrent = require('./app/findTorrent');
const dlTorrent = require('./app/dlTorrent');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    socket.on('findTorrent', (data) => {
      findTorrent.findTorrent(socket, data)
    })
    socket.on('dlTorrent', (data) => {
      dlTorrent.dlTorrent(socket, data)
    })
});

server.listen(80, () => {
  console.log('listening on *:80');
});