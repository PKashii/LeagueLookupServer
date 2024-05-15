const axios = require("axios");
const path = require("path");
const config = require(path.resolve(__dirname, "utils", "config.json"));

async function getChallengerPUUIDs(server, summonerIdArray) {
  const API_KEY = config.API_KEY;
  const API_CALL = "/lol/summoner/v4/summoners/";
  const API_SERVER = server;
  const API_SERVER_ROUTE = `https://${API_SERVER}.api.riotgames.com`;
  let puuids = [];
  try {
    return new Promise((resolve) => {
      async function loop(i) {
        if (i < summonerIdArray.length) {
          const API_ADDRESS = `${
            API_SERVER_ROUTE + API_CALL + summonerIdArray[i]
          }?api_key=${API_KEY}`;
          let API_PUUID = await axios
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
          if (API_PUUID != undefined) {
            puuids[i] = { server: API_SERVER, puuid: API_PUUID.puuid };
          }
          setTimeout(loop, 1300, i + 1);
        } else {
          console.log(`Retrieving PUUIDs from ${server} done!`);
          resolve(puuids);
        }
      }
      loop(0);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = getChallengerPUUIDs;
