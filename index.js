const apiKey = "7871b2a1";
const trendingContainer = document.getElementById("trending-movies");
const loadMoreButton = document.getElementById("load-more");

let currentPage = 1;

function fetchTrendingMovies(page = 1) {
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&y=2024&s=movie&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        alert("Aucun film trouvé !");
      }
    })
    .catch((error) => console.error("Erreur lors de la récupération des films :", error));
}

function displayMovies(movies) {
  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    movieElement.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'default-poster.jpg'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <a href="movie.html?id=${movie.imdbID}">Plus d'info</a>
    `;
    trendingContainer.appendChild(movieElement);
  });
}
fetchTrendingMovies();

loadMoreButton.addEventListener("click", () => {
  currentPage++;
  fetchTrendingMovies(currentPage);
});
