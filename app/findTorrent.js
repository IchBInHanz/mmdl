// const puppeteer = require('puppeteer');
const TorrentSearchApi = require('torrent-search-api');




async function findTorrent(socket, data) {
    TorrentSearchApi.enableProvider('ThePirateBay');
    const torrents = await TorrentSearchApi.search(data.query, '', 20);
    avt = {
        "4k": [],
        "2k": [],
        "1080": [],
        "720": []
    }
    torrents.forEach((torrent) => {
        if (torrent.title.toLowerCase().includes('4k')) {
            avt["4k"].push(torrent)
        } else if (torrent.title.toLowerCase().includes('2k')) {
            avt["2k"].push(torrent)
        } else if (torrent.title.toLowerCase().includes('1080')) {
            avt["1080"].push(torrent)
        } else if (torrent.title.toLowerCase().includes('720')) {
            avt["720"].push(torrent)
        }
    })
    avt = {
        "4k": avt["4k"][0],
        "2k": avt["2k"][0],
        "1080": avt["1080"][0],
        "720": avt["720"][0]
    }
    socket.emit('searchResults', avt)
    return
}

exports.findTorrent = findTorrent