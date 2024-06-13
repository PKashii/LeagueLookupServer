const axios = require("axios");
const path = require("path");
const config = require(path.resolve(__dirname, "utils", "config.json"));

async function getGames(region, PUUIDarray) {
  const API_KEY = config.API_KEY;
  const API_SERVER = region;
  let matches = [];
  const gamecount = 5;

  const servers = {
    europe: ["euw1", "eun1"],
    americas: ["na1", "br1"],
    asia: ["kr"],
  };

  let puuidsFromRegion = [];

  for (const player in PUUIDarray) {
    if (servers[region].includes(PUUIDarray[player].server)) {
      puuidsFromRegion.push(PUUIDarray[player]);
    }
  }

  console.log("Retrieving games from " + region);

  for (let i = 0; i < puuidsFromRegion.length; i++) {
    const API_ADDRESS = `https://${API_SERVER}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuidsFromRegion[i].puuid}/ids?start=0&count=${gamecount}&api_key=${API_KEY}`;
    try {
      const response = await axios.get(API_ADDRESS, {
        headers: { "Content-Type": "application/json" },
      });
      matches.push(...response.data);
    } catch (error) {
      console.log(
        `Error fetching matches for PUUID ${PUUIDarray[i].puuid}: ${error.message}`
      );
    }
    await new Promise((resolve) => setTimeout(resolve, 1300));
  }

  const uniqueMatchesArray = [...new Set(matches)];
  const games_object = uniqueMatchesArray.map((matchId) => ({
    matchId,
    region,
  }));

  console.log(`Retrieving matches done!`);
  return games_object;
}

module.exports = getGames;
