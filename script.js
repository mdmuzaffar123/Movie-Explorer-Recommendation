const API_KEY = "a66286cd";
let moviesData = [];

// Search Movie
async function searchMovie() {
  const query = document.getElementById("searchInput").value.trim();

  if (!query) {
    alert("Please enter a movie name");
    return;
  }

  const res = await fetch(
    `https://www.omdbapi.com/?s=${query}&apikey=a66286cd`
  );
  const data = await res.json();

  if (data.Response === "False") {
    document.getElementById("heroResults").innerHTML =
      "<h2 style='color: white; grid-column: 1/-1;'>Movie Not Found</h2>";
    document.getElementById("heroResults").style.display = "block";
    document.getElementById("heroContent").style.display = "none";
    return;
  }

  moviesData = data.Search;
  displayMoviesInHero(moviesData);
}

// Display Movies in Hero Section
async function displayMoviesInHero(movies) {
  const heroResults = document.getElementById("heroResults");
  const heroContent = document.getElementById("heroContent");
  const backButtonContainer = document.getElementById("backButtonContainer");
  
  heroResults.innerHTML = "";

  for (let movie of movies) {
    const detailRes = await fetch(
      `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=a66286cd`
    );
    const detail = await detailRes.json();

    const card = document.createElement("div");
    card.className = "hero-movie-card";
    card.innerHTML = `
      <img src="${detail.Poster}" alt="${detail.Title}" />
      <h4>${detail.Title}</h4>
      <p><b>Year:</b> ${detail.Year}</p>
      <p><b>Rating:</b> ⭐ ${detail.imdbRating}</p>
    `;
    heroResults.appendChild(card);
  }

  heroContent.style.display = "none";
  heroResults.style.display = "grid";
  backButtonContainer.style.display = "block";
}

// Go Back to Search
function goBack() {
  const heroResults = document.getElementById("heroResults");
  const heroContent = document.getElementById("heroContent");
  const backButtonContainer = document.getElementById("backButtonContainer");
  
  heroResults.style.display = "none";
  heroContent.style.display = "block";
  backButtonContainer.style.display = "none";
  document.getElementById("searchInput").value = "";
}

// Sorting
function sortMovies() {
  const type = document.getElementById("sortSelect").value;

  if (type === "year") {
    moviesData.sort((a, b) => b.Year - a.Year);
  } else if (type === "rating") {
    moviesData.sort((a, b) => b.imdbRating - a.imdbRating);
  }

  displayMoviesInHero(moviesData);
}

// HAMBURGER MENU
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const horizontalMenu = document.getElementById("horizontalMenu");
  
  sidebar.classList.toggle("active");
  horizontalMenu.classList.toggle("active");
}

document.getElementById("horizontalMenu").onclick = function() {
  toggleSidebar();
};
document.getElementById("loginButton").onclick = () =>
  (document.getElementById("loginModal").style.display = "inline-block");

document.getElementById("registerButton").onclick = () =>
  (document.getElementById("registerModal").style.display = "block");

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
// USER PROFILE DROPDOWN
document.getElementById("userProfileCircle").onclick = function(e) {
  e.stopPropagation();
  const dropdown = document.getElementById("userDropdown");
  dropdown.classList.toggle("active");
};

document.addEventListener("click", function(e) {
  const dropdown = document.getElementById("userDropdown");
  const profileCircle = document.getElementById("userProfileCircle");
  
  if (!e.target.closest(".user-profile-container")) {
    dropdown.classList.remove("active");
  }
});

document.querySelector(".logout-btn").onclick = function() {
  alert("Logged out!");
  document.getElementById("userDropdown").classList.remove("active");
};