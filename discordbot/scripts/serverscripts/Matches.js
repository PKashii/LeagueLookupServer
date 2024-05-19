const axios = require("axios");
const path = require("path");
const config = require(path.resolve(__dirname, "utils", "config.json"));

async function getGames(region, PUUIDarray) {
  const API_KEY = config.API_KEY;
  const API_SERVER = region;
  let matches = [];
  const gamecount = 1;
  return new Promise((resolve) => {
    console.log("Retrieving games from " + `${region}`);
    async function loop(i) {
      if (i < /*PUUIDarray.length*/ 5) {
        const API_ADDRESS = `https://${API_SERVER}.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUIDarray[i].puuid}/ids?start=0&count=${gamecount}&api_key=${API_KEY}`;
        try {
          const response = await axios.get(API_ADDRESS, {
            headers: { "Content-Type": "application/json" },
          });
          matches[i] = response.data;
          setTimeout(loop, 1300, i + 1);
        } catch (error) {
          console.log(error);
          setTimeout(loop, 1300, i + 1);
        }
      } else {
        const matchesArray = matches.flat();
        const uniqueMatchesArray = matchesArray.filter(
          (value, index) => matchesArray.indexOf(value) === index
        );
        const games_object = uniqueMatchesArray.map((matchId) => ({
          matchId,
          region,
        }));
        console.log(`Retrieving matches done!`);
        console.log(games_object);
        resolve(games_object);
      }
    }
    loop(0);
  });
}

module.exports = getGames;
