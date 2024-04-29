const analyzeData = require("./serverscripts/AnalyzeData");
const getChallengerPUUIDs = require("./serverscripts/ChallengerPUUIDs");
const getChallengerSummonerIds = require("./serverscripts/ChallengerSummonerIDs");
const getGamesInfo = require("./serverscripts/MatchInfo");
const getGames = require("./serverscripts/Matches");
const { getItems, getChampions } = require("./serverscripts/getAssets");
const clearData = require("./serverscripts/utils/ClearData");
const fetchData = require("./serverscripts/utils/FetchData");
const insertData = require("./serverscripts/utils/InsertData");

async function updatePlayers(riotServer) {
  try {
    const summonerids = await getChallengerSummonerIds(riotServer);
    const puuids = await getChallengerPUUIDs(riotServer, summonerids);
    await insertData("players", puuids);
  } catch (error) {
    console.log(error);
  }
}

async function updateGames(riotRegion) {
  try {
    const player_data = await fetchData("players");
    const games = await getGames(riotRegion, player_data);
    insertData("matches", games);
  } catch (error) {
    console.log(error);
  }
}

async function updateBuilds() {
  const fetchCollection = "matches";
  const insertCollection = "builds";
  console.log("starting to update...");
  try {
    const games_data = await fetchData(fetchCollection);
    const games_info = await getGamesInfo(games_data);
    const builds = await analyzeData(games_info);
    await clearData(insertCollection);
    await insertData(insertCollection, builds);
  } catch (error) {
    console.log(error);
  }
}

async function updateAllBuilds(riotServer, riotRegion) {
  try {
    await updatePlayers(riotServer);
    await updateGames(riotRegion);
    await updateBuilds();
  } catch (error) {
    console.log(error);
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
  }
}

module.exports = {
  updatePlayers,
  updateGames,
  updateBuilds,
  updateAllBuilds,
  updateAssets,
};
