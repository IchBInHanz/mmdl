const { exec } = require("child_process");
DL_PATH = "L:\MOVIES"

async function dlTorrent(socket, data) {
    console.log('Downloading...')
    exec(`webtorrent download "${data}" -o "${DL_PATH}"`, (error, stdout, stderr) => {
        if (error) {
            socket.emit('dlTorrentErorr', error.message)
            return;
        }
        if (stderr) {
            socket.emit('dlTorrentErorr', stderr)
            return;
        }
        socket.emit('dlTorrentSuccess')
    })
}

exports.dlTorrent = dlTorrent