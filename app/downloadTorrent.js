const { exec } = require("child_process");
DL_PATH = "L:\MOVIES"

async function downloadTorrent(socket, data) {
    console.log('Started download...')
    exec(`webtorrent download "${data}" -o "${DL_PATH}"`, (error, stdout, stderr) => {
        if (error) {
            socket.emit('downloadTorrentErorr', error.message)
            return;
        }
        if (stderr) {
            socket.emit('downloadTorrentErorr', stderr)
            return;
        }
        console.log('Download finished...')
        socket.emit('downloadTorrentSuccess')
    })
}

exports.downloadTorrent = downloadTorrent