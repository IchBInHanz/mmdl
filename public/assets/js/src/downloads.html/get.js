socket.emit('getDownloads')

socket.on('downloadsResults', (results) => {
    console.log(results)
    document.getElementById('downloads').innerHTML = ''
    for (const [key, value] of Object.entries(results)) {
        console.log(key, value)
        document.getElementById('downloads').innerHTML += `
        <div class="down-${value.status}">
            <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg">
            <h5>${value.title}</h5>
        </div>
        `
    }
})