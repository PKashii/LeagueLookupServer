const axios = require("axios");
const config = require("../config.json");

async function getGamesInfo(region, matchesArray) {
  return new Promise((resolve) => {
    const API_KEY = config.API_KEY;
    const API_CALL = "/lol/match/v5/matches/";
    const API_SERVER = region;
    const API_SERVER_ROUTE = `https://${API_SERVER}.api.riotgames.com`;
    let API_GAME_INFO;
    let gameinfo = [];

    async function getInfo(i) {
      if (i < Object.keys(matchesArray).length) {
        const API_ADDRESS =
          API_SERVER_ROUTE + API_CALL + matchesArray[i] + "?api_key=" + API_KEY;

        API_GAME_INFO = await axios
          .get(API_ADDRESS, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.info.gameMode === "CLASSIC")
              for (let index = 0; index < 10; index++) {
                gameinfo.push({
                  matchId: `${response.data.metadata.matchId}`,
                  championName: `${response.data.info.participants[index].championName}`,
                  item1: `${response.data.info.participants[index].item1}`,
                  item2: `${response.data.info.participants[index].item2}`,
                  item3: `${response.data.info.participants[index].item3}`,
                  item4: `${response.data.info.participants[index].item4}`,
                  item5: `${response.data.info.participants[index].item5}`,
                  item6: `${response.data.info.participants[index].item6}`,
                  kda: `${response.data.info.participants[index].challenges.kda}`,
                });
              }
          })
          .catch((error) => {
            console.log(error);
          });
        setTimeout(getInfo, 1300, i + 1);
      } else {
        console.log("retrieving game data done!");
        console.log(gameinfo);
        resolve(gameinfo);
      }
    }
    getInfo(0);
  });
}

module.exports = getGamesInfo;
