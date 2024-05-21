const analyzeData = require("./serverscripts/AnalyzeData");
const getChallengerPUUIDs = require("./serverscripts/ChallengerPUUIDs");
const getChallengerSummonerIds = require("./serverscripts/ChallengerSummonerIDs");
const getGamesInfo = require("./serverscripts/MatchInfo");
const getGames = require("./serverscripts/Matches");
const { getItems, getChampions } = require("./serverscripts/getAssets");
const fetchData = require("./serverscripts/utils/FetchData");
const { insertMany } = require("./serverscripts/utils/InsertData");

async function updatePlayers(riotServer) {
  console.log("Updating players from:" + riotServer + " ...");
  try {
    const summonerids = await getChallengerSummonerIds(riotServer);
    const puuids = await getChallengerPUUIDs(riotServer, summonerids);
    await insertMany("players", puuids);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Updating players done!");
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
    const games_data = await fetchData("matches");
    const builds = await analyzeData(games_data);
    console.log(builds);
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
