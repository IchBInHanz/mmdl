const TorrentSearchApi = require('torrent-search-api');

async function searchTorrent(socket, data) {
    console.log(`Searching for "${data.query}" ...`)
    TorrentSearchApi.enableProvider('ThePirateBay');
    // TorrentSearchApi.enableProvider('1337x');
    const torrents = await TorrentSearchApi.search(data.query, '', 20);
    results = {
        "4k": [],
        "2k": [],
        "1080": [],
        "720": []
    }
    torrents.forEach((torrent) => {
        if (torrent.title.toLowerCase().includes('4k')) {
            results["4k"].push(torrent)
        } else if (torrent.title.toLowerCase().includes('2k')) {
            results["2k"].push(torrent)
        } else if (torrent.title.toLowerCase().includes('1080')) {
            results["1080"].push(torrent)
        } else if (torrent.title.toLowerCase().includes('720')) {
            results["720"].push(torrent)
        }
    })
    results = {
        "4k": results["4k"][0],
        "2k": results["2k"][0],
        "1080": results["1080"][0],
        "720": results["720"][0]
    }
    socket.emit('searchTorrentResults', results)
    return
}

exports.searchTorrent = searchTorrent