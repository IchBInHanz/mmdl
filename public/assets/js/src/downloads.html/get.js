socket.emit('getDownloads')

socket.on('downloadsResults', (results) => {
    console.log(results)
    document.getElementById('downloads').innerHTML = ''
    for (const [key, value] of Object.entries(results)) {
        console.log(key, value)
        document.getElementById('downloads').innerHTML += `
        <div class="down-${value.status}">
            <img src="${value.media_image}">
            <h5>${value.title}</h5>
        </div>
        `
    }
})