const axios = require("axios");
const path = require("path");
const config = require(path.resolve(__dirname, "utils", "config.json"));

async function getChallengerSummonerIds(server) {
  let summonerids = [];
  const API_KEY = config.API_KEY;
  const API_CALL = "/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5";
  const API_SERVER = server;
  const API_SERVER_ROUTE = `https://${API_SERVER}.api.riotgames.com`;

  const API_ADDRESS = API_SERVER_ROUTE + API_CALL + "?api_key=" + API_KEY;

  let API_SUMMID = await axios
    .get(API_ADDRESS, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data.entries;
    })
    .catch((error) => {
      console.log(error);
    });
  for (let id in API_SUMMID) {
    summonerids[id] = API_SUMMID[id].summonerId;
  }
  if (API_SUMMID != undefined) {
    console.log(`Retrieving Challenger data from ${server} done!`);
  }
  return summonerids;
}

module.exports = getChallengerSummonerIds;
