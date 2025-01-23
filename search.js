const apiKey = "7871b2a1";
const searchInput = document.getElementById("search-bar");
const searchResults = document.getElementById("search-results");
const loadMoreButton = document.getElementById("load-more");

let currentQuery = "";
let currentPage = 1;

function fetchSearchResults(query, page = 1) {
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        displaySearchResults(data.Search);
      } 
    })
    .catch((error) => console.error("Erreur lors de la recherche :", error));
}

function displaySearchResults(movies) {
  movies.forEach((movie) => {
    const resultElement = document.createElement("div");
    resultElement.classList.add("result");

    resultElement.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'default-poster.jpg'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <a href="movie.html?id=${movie.imdbID}">En savoir plus</a>
    `;
    searchResults.appendChild(resultElement);
  });
}

searchInput.addEventListener("input", (e) => {
  currentQuery = e.target.value;
  currentPage = 1;
  searchResults.innerHTML = ""; 
  if (currentQuery.trim() !== "") {
    fetchSearchResults(currentQuery, currentPage);
  }
});


loadMoreButton.addEventListener("click", () => {
  currentPage++;
  fetchSearchResults(currentQuery, currentPage);
});