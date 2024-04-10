const axios = require("axios");
const config = require("/home/kashii/Documents/VSCode/Inzynieria Oprogramowania/LeagueLookupServer/config.json");

async function getChallengerData(server) {
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
  for (let i = 0; i < Object.keys(API_SUMMID).length; i++) {
    summonerids[i] = API_SUMMID[i].summonerId;
  }
  if (API_SUMMID != undefined) {
    console.log("Retrieving Challenger data done!");
  }

  return summonerids;
}
module.exports = getChallengerData;
