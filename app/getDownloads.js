const fs = require('fs');

async function getDownloads(socket) {
    let rawdata = fs.readFileSync('./data/downloads.json');
    let downloads = JSON.parse(rawdata);
    socket.emit('downloadsResults', downloads)
}

exports.getDownloads = getDownloads