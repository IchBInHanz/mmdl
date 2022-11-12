const PORT = 0361

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const searchTorrent = require('./app/searchTorrent');
const downloadTorrent = require('./app/downloadTorrent');
const getDownloads = require('./app/getDownloads');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/p', (req, res) => {
  res.sendFile(__dirname + '/public/page.html');
});

app.get('/downloads', (req, res) => {
  res.sendFile(__dirname + '/public/downloads.html');
});

io.on('connection', (socket) => {
    socket.on('searchTorrent', (data) => {
      searchTorrent.searchTorrent(socket, data)
    })
    socket.on('downloadTorrent', (data) => {
      downloadTorrent.downloadTorrent(socket, data)
    })
    socket.on('getDownloads', () => {
      getDownloads.getDownloads(socket)
    })
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});