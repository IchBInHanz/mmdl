document.getElementById("search-results").innerHTML = "<h2>Trending</h2>";

fetch(
  `https://api.themoviedb.org/3/trending/all/day?api_key=${themoviedb_API_KEY}`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    data.results.forEach((p) => {
      pName = p.original_title;
      if (!p.original_title) {
        pName = p.name;
      }
      if (p.poster_path !== null) {
        document.getElementById("search-results").innerHTML += `
                <a href="./p?id=${p.id}&media_type=${p.media_type}">
                    <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${p.poster_path}" alt="Page Poster">
                    <h5>${pName}</h5>
                </a>`;
      }
    });
  });
