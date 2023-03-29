const apiKey = "2f3ded06e1msh5308b724a5d99e7p18c53bjsn3ee67d070dfa";

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
    gameCard.appendChild(gameImg);

    const gameTitle = document.createElement("h3");
    gameTitle.textContent = game.external;
    gameCard.appendChild(gameTitle);

    const gamePrice = document.createElement("p");
    gamePrice.textContent = `Precio: $${game.price} USD`;
    gameCard.appendChild(gamePrice);

    if (game.isOnSale === 1)
    {
      const gameDealPrice = document.createElement("p");
      gameDealPrice.textContent = `Precio en oferta: $${game.salePrice} USD`;
      gameCard.appendChild(gameDealPrice);

      const gameSavings = document.createElement("p");
      gameSavings.textContent = `Ahorro: ${game.savings.toFixed(2)}%`;
      gameCard.appendChild(gameSavings);

      const gameIsOnSale = document.createElement("a");
      gameIsOnSale.textContent = "Está en rebaja";
      gameCard.appendChild(gameIsOnSale);
    }
    
    if (game.isOnSale === 0)
    {
      const gameIsOnSale = document.createElement("a");
      gameIsOnSale.textContent = "No está en rebaja";
      gameCard.appendChild(gameIsOnSale);
    }
    

    gameGrid.appendChild(gameCard);
  });
}