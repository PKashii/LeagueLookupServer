const axios = require("axios");
const path = require("path");
const { insertOne } = require("./utils/DatabaseFunctions");
const config = require(path.resolve(__dirname, "utils", "config.json"));

async function getChallengerPUUIDs(server, summonerIdArray) {
  const API_KEY = config.API_KEY;
  const API_SERVER = server;

  async function loop(i) {
    if (i < summonerIdArray.length) {
      const API_ADDRESS = `https://${API_SERVER}.api.riotgames.com/lol/summoner/v4/summoners/${summonerIdArray[i]}?api_key=${API_KEY}`;
      try {
        const response = await axios.get(API_ADDRESS, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const puuid = { server: API_SERVER, puuid: response.data.puuid };
        try {
          await insertOne("players", puuid);
        } catch (error) {
          if (error.code != undefined) {
            console.log(
              `Error has occured while inserting ${puuid.puuid}. Error code: ${error.code}`
            );
          } else {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(`Error has occured while fetching: ${summonerIdArray[i]}`);
        setTimeout(loop, 1300, i + 1);
      }
      setTimeout(loop, 1300, i + 1);
    } else {
      console.log(`Gathering PUUIDs from ${server} done!`);
    }
  }

  loop(0);
}

module.exports = getChallengerPUUIDs;
