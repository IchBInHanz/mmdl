API_KEY = '1fb5b92645f4baac6a8358fa56c98bdc'

finds = document.getElementById('find-container')

document.getElementById('search-submit').addEventListener('click', function(e) {
    query = document.getElementById('search-input').value
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`)
    .then((response) => response.json())
    .then((data) => {
        finds.innerHTML = ''
        if (data.total_results == 0) {
            finds.textContent = 'No results found.'
        } else {
            data.results.forEach(result => {
                finds.innerHTML += `${result.original_title}<br>`
            });
        }
    });
})