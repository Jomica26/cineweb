const apiKey = "7871b2a1";
const movieDetailsContainer = document.getElementById("movie-details");

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

function fetchMovieDetails(id) {
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        displayMovieDetails(data);
      } else {
        alert("Détails du film introuvables !");
      }
    })
    .catch((error) => console.error("Erreur lors de la récupération des détails :", error));
}

function displayMovieDetails(movie) {
  movieDetailsContainer.innerHTML = `
    <h1>${movie.Title}</h1>
    <img src="${movie.Poster !== "N/A" ? movie.Poster : 'default-poster.jpg'}" alt="${movie.Title}">
    <p><strong>Résumé :</strong> ${movie.Plot}</p>
    <p><strong>Genre :</strong> ${movie.Genre}</p>
    <p><strong>Acteurs :</strong> ${movie.Actors}</p>
    <p><strong>Notes :</strong> ${movie.imdbRating}</p>
    <p><strong>Date de sortie DVD :</strong> ${
      movie.DVD ? new Date(movie.DVD).toLocaleDateString("fr-FR") : "Non disponible"
    }</p>
  `;
}

fetchMovieDetails(movieId);