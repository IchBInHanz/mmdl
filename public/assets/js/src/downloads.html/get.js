socket.emit('getDownloads')

socket.on('downloadsResults', (results) => {
    console.log(results)
    document.getElementById('downloads').innerHTML = ''
    for (const [key, value] of Object.entries(results)) {
        console.log(key, value)
        document.getElementById('downloads').innerHTML += `
        <tr>
            <td>${value.title}</td>
            <td>-</td>
            <td>${value.status}</td>
        </tr>
        `
        console.log(`${key}: ${value}`);
    }
})