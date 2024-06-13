const analyzeData = require("./serverscripts/AnalyzeData");
const getChallengerPUUIDs = require("./serverscripts/ChallengerPUUIDs");
const getChallengerSummonerIds = require("./serverscripts/ChallengerSummonerIDs");
const getGamesInfo = require("./serverscripts/MatchInfo");
const getGames = require("./serverscripts/Matches");
const {
  getItems,
  getChampions,
  getIcons,
} = require("./serverscripts/getAssets");
const clearData = require("./serverscripts/utils/ClearData");
const fetchData = require("./serverscripts/utils/FetchData");
const { insertMany } = require("./serverscripts/utils/DatabaseFunctions");

async function updatePlayers(riotServer) {
  console.log("Updating players from: " + riotServer + "...");
  try {
    const summonerids = await getChallengerSummonerIds(riotServer);
    await getChallengerPUUIDs(riotServer, summonerids);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Updating challengers list from: " + riotServer + " done!");
  }
}

async function updateGames(riotRegion) {
  console.log("Updating games from: " + riotRegion + "...");
  try {
    const player_data = await fetchData("players");
    const games = await getGames(riotRegion, player_data);
    await getGamesInfo(games);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Updating games from: " + riotRegion + " done!");
  }
}

async function updateBuilds() {
  console.log("Updating builds...");
  try {
    clearData("builds");
    const games_data = await fetchData("matches");
    const builds = await analyzeData(games_data);
    await insertMany("builds", builds);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Updating builds done!");
  }
}

async function updateAssets(type) {
  try {
    if (type === "items") {
      await getItems();
    } else if (type === "icons") {
      await getIcons();
    } else {
      await getChampions();
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log("updating " + type + " done!");
  }
}

module.exports = {
  updatePlayers,
  updateGames,
  updateBuilds,
  updateAssets,
};
