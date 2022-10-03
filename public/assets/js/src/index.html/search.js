function search(query, options) {
    document.getElementById('search-results').innerHTML = ''
    window.history.pushState("", "", `?query=${query}`);
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${themoviedb_API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`)
    .then((response) => response.json())
    .then((data) => {
        data.results.forEach((p) => {
            pName = p.original_title
            if (!p.original_title) {pName = p.name}
            if (p.poster_path !== null) {
                document.getElementById('search-results').innerHTML += `
                <a href="./p?id=${p.id}&from_query=${query}">
                    <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${p.poster_path}" alt="Page Poster">
                    <h5>${pName}</h5>
                </a>`
            }
        })
    });
}

document.getElementById('search-submit').addEventListener('click', (e) => {
    search(document.getElementById('search-input').value);
})

document.getElementById('search-input').addEventListener('keydown', function(e) {
    if (e.code == 'Enter') {
        search(e.target.value)
    }
})


const searchParams = new URLSearchParams(window.location.search);

if (searchParams.has('query')) {
    document.getElementById('search-input').value = searchParams.get('query')
    search(searchParams.get('query'))
}