const axios = require("axios");
const config = require("/home/kashii/Documents/VSCode/Inzynieria Oprogramowania/LeagueLookupServer/config.json");

async function getChallengerPUUIDs(server, summonerIdArray) {
  return new Promise((resolve) => {
    const API_KEY = config.API_KEY;
    const API_CALL = "/lol/summoner/v4/summoners/";
    const API_SERVER = server;
    const API_SERVER_ROUTE = `https://${API_SERVER}.api.riotgames.com`;

    let puuids = [];

    async function getpuuID(i) {
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
            return response.data.puuid;
          })
          .catch((error) => {
            console.log(error + "");
          });
        if (API_PUUID != undefined) {
          puuids[i] = { server: API_SERVER, puuid: API_PUUID };
        }
        setTimeout(getpuuID, 1300, i + 1);
      } else {
        console.log(`Retrieving PUUIDs from ${server} done!`);
        resolve(puuids);
      }
    }
    getpuuID(0);
  });
}

module.exports = getChallengerPUUIDs;
