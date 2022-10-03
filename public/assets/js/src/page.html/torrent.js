res = [
    "4k",
    "2k",
    "1080",
    "720"
]

function searchTorrent(query) {
    if (searchParams.get('media_type') == 'tv') {
        query = query + ` ${document.getElementById('tv-select').value}`
    }
    socket.emit('searchTorrent', {query: query})
    socket.on('searchTorrentResults', (data) => {
        document.getElementById('poster').classList.add('tiny-img')
        document.getElementById('search-btn').style.display = 'none'
        document.getElementById(`results`).style.display = 'block'
        i=0
        res.forEach(rs => {
            if (!data[rs]) {
                document.getElementById(`results`).innerHTML += `
                <tr>
                    <th>${rs}</th>
                    <th>-</th>
                    <th>-</th>
                    <th>-</th>
                    <th></th>
                </tr>
                `
            } else {
                document.getElementById(`results`).innerHTML += `
                <tr>
                    <th>${rs}</th>
                    <th>${data[rs].seeds}</th>
                    <th>${data[rs].peers}</th>
                    <th>${data[rs].size}</th>
                    <th><button onclick=download('${data[rs].magnet}')>Download</button></th>
                </tr>
                `
                // <th><button onclick=dl(${i},'${data[rs].magnet}')>Download</button></th>
                i++
            }
        })
    })
}

document.getElementById('search-btn').addEventListener('click', (e) => {
    e.target.textContent = '...'
    e.target.disabled = true
    searchTorrent(contentData.name)
})

function download(magnet) {
    document.getElementById(`results`).style.display = 'none'
    document.getElementById('poster').classList.remove('tiny-img')
    document.getElementById('download-status').style.display = 'initial'
    socket.emit('downloadTorrent', {magnet: magnet, media_type: contentData.media_type})
    socket.on('downloadTorrentSuccess', (data) => {
        document.getElementById('download-status').textContent = 'Download Finished!'
    })
}