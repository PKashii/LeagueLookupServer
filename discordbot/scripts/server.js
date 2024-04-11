const getChallengerData = require("./serverscripts/ChallengerSummonerIDs.js");
const getChallengerPUUIDs = require("./serverscripts/ChallengerPUUIDs.js");
const getPlayersGames = require("./serverscripts/Matches.js");
const getGamesInfo = require("./serverscripts/MatchInfo.js");
const insertData = require("./serverscripts/Database.js");
async function getApplicationData(riotServer, riotRegion) {
  async function get() {
    try {
      const summIDs = await getChallengerData(riotServer);
      const PUUIDs = await getChallengerPUUIDs(riotServer, summIDs);
      const games = await getPlayersGames(riotRegion, PUUIDs);
      const info = await getGamesInfo(riotRegion, games);
      // await insertData("players", PUUIDs);
      // await insertData("matches", info);
    } catch (e) {
      console.log(e);
    }
    // await get();
  }
  get();
}

module.exports = { getApplicationData };
