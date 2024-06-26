const axios = require("axios");
const path = require("path");
const { insertOne } = require("./utils/DatabaseFunctions");
const constructFramesArray = require("./constructEventsArray");
const config = require(path.resolve(__dirname, "utils", "config.json"));

async function getGamesInfo(matchesArray) {
  const API_KEY = config.API_KEY;
  console.log("fetching information about games...");

  for (let i = 0; i < matchesArray.length; i++) {
    const API_ADDRESS = `https://${matchesArray[i].region}.api.riotgames.com/lol/match/v5/matches/${matchesArray[i].matchId}/timeline?api_key=${API_KEY}`;
    try {
      const response = await axios.get(API_ADDRESS, {
        headers: { "Content-Type": "application/json" },
      });
      let frames = await constructFramesArray(response.data.info);
      const matchData = {
        matchId: response.data.metadata.matchId,
        region: matchesArray[i].region,
        participants: response.data.metadata.participants,
        frames: frames,
        usable: true,
      };
      if (matchData.participants.length == 10) {
        try {
          await insertOne("matches", matchData);
        } catch (error) {
          console.log(
            `Error was thrown while inserting ${matchData.matchId}. Error code: ${error.code}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    await new Promise((resolve) => setTimeout(resolve, 1300));
  }

  console.log(`Retrieving game data done!`);
}

module.exports = getGamesInfo;
