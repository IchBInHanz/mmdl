const { exec } = require("child_process");
MOVIES_DL_PATH = "L:\MOVIES"
SERIES_DL_PATH = "L:\SERIES"

async function downloadTorrent(socket, data) {
    DL_PATH = MOVIES_DL_PATH
    if (data.media_type == 'tv') {
        DL_PATH = SERIES_DL_PATH
    }
    console.log('Started download...')
    // exec(`webtorrent download "${data.magnet}" -o "${DL_PATH}"`, (error, stdout, stderr) => {
    //     if (error) {
    //         socket.emit('downloadTorrentErorr', error.message)
    //         return;
    //     }
    //     if (stderr) {
    //         socket.emit('downloadTorrentErorr', stderr)
    //         return;
    //     }
    //     console.log('Download finished...')
    //     socket.emit('downloadTorrentSuccess')
    // })
    console.log('Download finished...')
    socket.emit('downloadTorrentSuccess')
}

exports.downloadTorrent = downloadTorrent