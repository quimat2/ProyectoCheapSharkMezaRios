const apiKey = "2f3ded06e1msh5308b724a5d99e7p18c53bjsn3ee67d070dfa";
const METACRITIC_BASE_URL = 'https://www.metacritic.com'

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const gameGrid = document.getElementById("game-grid");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  getGames(searchTerm);
});

async function getGames(searchTerm) {
  const response = await fetch(
    `https://cheapshark-game-deals.p.rapidapi.com/games?title=${searchTerm}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "cheapshark-game-deals.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    }
  );

  const games = await response.json();
  displayGames(games);
}

function displayGames(games) {
  gameGrid.innerHTML = "";

  games.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    const gameImg = document.createElement("img");
    gameImg.src = game.thumb;
    gameImg.alt = game.external;
    gameCard.appendChild(gameImg);

    const gameTitle = document.createElement("h3");
    gameTitle.textContent = game.external;
    gameCard.appendChild(gameTitle);

    const gamePrice = document.createElement("p");
    gamePrice.textContent = `Precio más bajo: ${game.cheapest} USD`;
    gameCard.appendChild(gamePrice);

    const gameLink = document.createElement("a");
    gameLink.textContent = "Comprar al precio más barato";
    gameLink.href = `https://www.cheapshark.com/redirect?dealID=${game.cheapestDealID}`;
    gameCard.appendChild(gameLink);

    gameGrid.appendChild(gameCard);
  });
}