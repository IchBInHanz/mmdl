socket.emit('getDownloads')

socket.on('downloadsResults', (results) => {
    console.log(results)
    document.getElementById('downloads').innerHTML = ''
    for (const [key, value] of Object.entries(results)) {
        console.log(key, value)
        document.getElementById('downloads').innerHTML += `
        <tr>
            <td>${value.title}</td>
            <td>${value.file_data.file_size}</td>
            <td>${value.file_data.seeds}</td>
            <td>${value.status}</td>
        </tr>
        `
        console.log(`${key}: ${value}`);
    }
})