API_KEY = '1fb5b92645f4baac6a8358fa56c98bdc'

finds = document.getElementById('find-container')
film = document.getElementById('film-container')


const searchParams = new URLSearchParams(window.location.search);

if (searchParams.has('query')) {
    search(searchParams.get('query'))
}

document.getElementById('search-submit').addEventListener('click', function(e) {
    query = document.getElementById('search-input').value
    search(query)
})

document.getElementById('search-input').addEventListener('keydown', function(e) {
    if (e.code == 'Enter') {
        search(e.target.value)
    }
})


function search(query) {
    window.history.pushState("object or string", "Title", `?query=${query}`);
    document.getElementById('search-container').style.paddingTop = '2vh'
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        finds.innerHTML = ''
        if (data.total_results == 0) {
            finds.textContent = 'No results found.'
        } else {
            data.results.forEach(result => {
                if (result.backdrop_path !== null) {
                    finds.innerHTML += `
                    <div onclick=find('${result.id}')>
                        <img src="https://www.themoviedb.org/t/p/original${result.poster_path}" alt="Title Img">
                        <h5>${result.original_title}</h5>
                    </div>`
                }
            });
        }
    });
}

function find(id) {
    window.scrollTo(0, 0);
    film.classList.add('film-slide')
    document.getElementById('film-results').innerHTML = `
    <div id="film-result-4k"></div>
    <div id="film-result-2k"></div>
    <div id="film-result-1080"></div>
    <div id="film-result-720"></div>`
    document.getElementById('film-action-search').style.display = 'block'
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
    // document.getElementById('film-banner-img').src = ``
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        // document.getElementById('film-banner-img').src = `https://www.themoviedb.org/t/p/original${data.backdrop_path}`
        document.getElementById('film-image-img').src = `https://www.themoviedb.org/t/p/original${data.poster_path}`
        document.getElementById('film-title-text').textContent = data.original_title
        document.getElementById('film-date-text').textContent = data.release_date.split('-')[0]
        document.getElementById('film-description-text').textContent = data.overview
    })
}

document.getElementById('film-close').addEventListener('click', () => {
    document.getElementsByTagName('body')[0].style.overflowY = 'initial'
    film.classList.remove('film-slide')
})

document.getElementById('film-action-search').addEventListener('click', () => {
    socket.emit('findTorrent', {query: document.getElementById('film-title-text').textContent})
})

res = [
    "4k",
    "2k",
    "1080",
    "720"
]

socket.on('searchResults', (data) => {
    document.getElementById('film-action-search').style.display = 'none'
    res.forEach(rs => {
        if (!data[rs]) {
            document.getElementById(`film-result-${rs}`).innerHTML += `${rs}: Unavailable.`
        } else {
            document.getElementById(`film-result-${rs}`).innerHTML += `
            <span>${rs}: </span>
            <span>Seeds: ${data[rs].seeds}</span>
            <span>Peers: ${data[rs].peers}</span>
            <span>Size: ${data[rs].size}</span>
            <button onclick=dl("${data[rs].magnet}")>Download</button>
            `
        }
    })
})

function dl(magnetUrl) {
    socket.emit('dlTorrent', magnetUrl)
}
socket.on('dlTorrentSuccess', () => {
    alert('Download Finished!')
})