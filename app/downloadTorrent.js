const { exec } = require("child_process");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
MOVIES_DL_PATH = "L:\MOVIES"
SERIES_DL_PATH = "L:\SERIES"


// MOVIES_DL_PATH = './'

async function downloadTorrent(socket, data) {
    DL_PATH = MOVIES_DL_PATH
    if (data.media_type == 'tv') {
        DL_PATH = SERIES_DL_PATH
    }
    console.log(`Started download of ${data.name}...`)
    rawdata = fs.readFileSync('./data/downloads.json');
    var downloads = JSON.parse(rawdata);
    var uuid = uuidv4()
    downloads[uuid] = {
        "uuid": uuid,
        "title": data.name,
        "start_time": new Date(),
        "status": "active"
    }
    var downloadsData = JSON.stringify(downloads);
    fs.writeFileSync('./data/downloads.json', downloadsData);

    console.log(data)
    exec(`webtorrent download "${data.torrentData.magnet}" -o "${DL_PATH}"`, (error, stdout, stderr) => {
        if (error) {
            socket.emit('downloadTorrentErorr', error.message)
            updateStatus(uuid, 'error')
            return;
        }
        if (stderr) {
            socket.emit('downloadTorrentErorr', stderr)
            updateStatus(uuid, 'error')
            return;
        }
        console.log(`Download finished ${data.name}`)
        updateStatus(uuid, 'finished')
        socket.emit('downloadTorrentSuccess')
    })
}


function updateStatus(uuid, status) {
    rawdata = fs.readFileSync('./data/downloads.json');
    var downloadsFile = JSON.parse(rawdata);
    downloadsFile[uuid]['status'] = status
    downloadsFile[uuid]['end_date'] = new Date()
    var downloadsData = JSON.stringify(downloadsFile);
    fs.writeFileSync('./data/downloads.json', downloadsData);
}

exports.downloadTorrent = downloadTorrent