const { exec } = require("child_process");
DL_PATH = "L:\MOVIES"

async function downloadTorrent(socket, data) {
    exec(`webtorrent download "${data}" -o "${DL_PATH}"`, (error, stdout, stderr) => {
        if (error) {
            socket.emit('downloadTorrentErorr', error.message)
            return;
        }
        if (stderr) {
            socket.emit('downloadTorrentErorr', stderr)
            return;
        }
        socket.emit('downloadTorrentSuccess')
    })
    socket.emit('downloadTorrentSuccess')

}

exports.downloadTorrent = downloadTorrent