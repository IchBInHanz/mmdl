fetch(`https://api.themoviedb.org/3/${searchParams.get('media_type')}/${searchParams.get('id')}?api_key=${themoviedb_API_KEY}&language=en-US`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        document.getElementById('poster').src = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`
        if (searchParams.get('media_type') == 'movie') { data.name = data.original_title }
        document.getElementById('title').textContent = data.name
    });