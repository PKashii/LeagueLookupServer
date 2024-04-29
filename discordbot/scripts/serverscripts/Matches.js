const axios = require("axios");
const config = require("/home/kashii/Documents/VSCode/Inzynieria Oprogramowania/LeagueLookupServer/config.json");

async function getGames(region, PUUIDarray) {
  return new Promise((resolve) => {
    const API_KEY = config.API_KEY;
    const API_CALL = "/lol/match/v5/matches/by-puuid/";
    const API_SERVER = region;
    const API_SERVER_ROUTE = `https://${API_SERVER}.api.riotgames.com`;

    let matches = [];

    async function loop(i) {
      if (i < PUUIDarray.length) {
        const API_ADDRESS = `${
          API_SERVER_ROUTE + API_CALL + PUUIDarray[i].puuid
        }/ids?start=0&count=20&api_key=${API_KEY}`;

        let API_MATCHIDs = await axios
          .get(API_ADDRESS, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });

        matches[i] = API_MATCHIDs;
        setTimeout(loop, 1300, i + 1);
      } else {
        const matchesArray = matches.flat();
        const uniqueMatchesArray = matchesArray.filter(
          (value, index) => matchesArray.indexOf(value) === index
        );
        const games_object = [];
        for (let id in uniqueMatchesArray) {
          games_object.push({
            matchId: uniqueMatchesArray[id],
            region: region,
          });
        }
        console.log(`Retrieving matches done!`);
        resolve(games_object);
      }
    }
    loop(0);
  });
}
module.exports = getGames;
