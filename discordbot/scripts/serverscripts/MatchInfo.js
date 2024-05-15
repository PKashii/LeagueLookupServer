const axios = require("axios");
const path = require("path");
const config = require(path.resolve(__dirname, "utils", "config.json"));

async function getGamesInfo(matchesArray) {
  const API_KEY = config.API_KEY;
  const API_CALL = "/lol/match/v5/matches/";
  let API_SERVER_ROUTE;
  let API_MATCH_INFO;
  let gameinfo = [];
  try {
    return new Promise((resolve) => {
      async function loop(i) {
        if (i < matchesArray.length) {
          let API_SERVER = matchesArray[i].region;
          API_SERVER_ROUTE = `https://${API_SERVER}.api.riotgames.com`;
          const API_ADDRESS =
            API_SERVER_ROUTE +
            API_CALL +
            matchesArray[i].matchId +
            "/timeline?api_key=" +
            API_KEY;

          API_MATCH_INFO = await axios
            .get(API_ADDRESS, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              return response.data;
            })
            .then((data) => {
              gameinfo.push({
                matchId: data.metadata.matchId,
                participants: data.metadata.participants,
                frames: data.info.frames,
              });
            });
          setTimeout(loop, 1300, i + 1);
        } else {
          console.log(`Retrieving game data done!`);
          resolve(gameinfo);
        }
      }

      loop(0);
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = getGamesInfo;
