const analyzeData = require("./serverscripts/AnalyzeData");
const getChallengerPUUIDs = require("./serverscripts/ChallengerPUUIDs");
const getChallengerSummonerIds = require("./serverscripts/ChallengerSummonerIDs");
const getGamesInfo = require("./serverscripts/MatchInfo");
const getGames = require("./serverscripts/Matches");
const { getItems, getChampions } = require("./serverscripts/getAssets");
const fetchData = require("./serverscripts/utils/FetchData");
const insertData = require("./serverscripts/utils/InsertData");
const constructBuildArray = require("./serverscripts/constructBuildsArray");
const clearData = require("./serverscripts/utils/ClearData");

async function updatePlayers(riotServer) {
  console.log("Updating players from:" + riotServer + "...");
  try {
    //clearData("players");
    const summonerids = await getChallengerSummonerIds(riotServer);
    const puuids = await getChallengerPUUIDs(riotServer, summonerids);
    //await insertData("test", puuids);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Updating players done!");
  }
}

async function updateGames(riotRegion) {
  console.log("Updating games from:" + riotRegion + "...");
  try {
    const player_data = await fetchData("players");
    const games = await getGames(riotRegion, player_data);
    const games_data = await getGamesInfo(games);
    const dataToInsert = games_data.map((data) => ({
      matchId: data.matchId,
      participants: data.participants,
    }));
    await insertData("test", dataToInsert);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Updating games from:" + riotRegion + " done!");
  }
}

async function updateBuilds() {
  console.log("Updating builds...");
  try {
    const games_data = await fetchData("matches");
    const games_info = await getGamesInfo(games_data);
    const arr = await constructBuildArray(games_info);
    const builds = await analyzeData(arr);
    //await clearData("matches");
    await insertData("test", builds);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Updating builds done!");
  }
}

async function updateDatabase(riotServer, riotRegion) {
  console.log(
    "Updating the database: Server: " + riotServer + " region: " + riotRegion
  );
  try {
    await updatePlayers(riotServer);
    await updateGames(riotRegion);
    await updateBuilds();
  } catch (error) {
    console.log(error);
  } finally {
    console.log(
      "Updating the database: Server: " +
        riotServer +
        " region: " +
        riotRegion +
        " has been completed."
    );
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
  updateDatabase,
  updateAssets,
};
