let contentData

fetch(`https://api.themoviedb.org/3/${searchParams.get('media_type')}/${searchParams.get('id')}?api_key=${themoviedb_API_KEY}&language=en-US`)
.then((response) => response.json())
.then((data) => {
    console.log(data)
    document.getElementById('poster').src = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`
    if (searchParams.get('media_type') == 'movie') { data.name = data.original_title }
    document.getElementById('title').textContent = data.name
    contentData = data

    if (searchParams.get('media_type') == 'tv' && data.seasons && data.seasons.length > 0) {
        document.getElementById('tv-select').style.display = 'initial'
        document.getElementById('tv-select').innerHTML = ``
        sN = 1
        data.seasons.forEach(season => {
            if (season.name !== 'Specials') {
                for (let i = 0; i < season.episode_count; i++) {
                    episodeN = i+1
                    if (episodeN.toString().length == 1) { episodeN = '0'+episodeN }
                    seasonN = sN
                    if (seasonN.toString().length == 1) { seasonN = '0'+seasonN }
                    document.getElementById('tv-select').innerHTML += `<option value="S${seasonN}E${episodeN}">S${seasonN} E${episodeN} (${season.name})</option>`
                }
                sN++
            }
        })
    }
});