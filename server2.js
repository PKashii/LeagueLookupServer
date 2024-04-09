const getChallengerData = require("./serverscripts/ChallengerSummonerIDs.js");
const getChallengerPUUIDs = require("./serverscripts/ChallengerPUUIDs.js");
const getPlayersGames = require("./serverscripts/Matches.js");
const getGamesInfo = require("./serverscripts/MatchInfo.js");
const insertData = require("./serverscripts/Database.js");

const Regions = {
  europe: "europe",
  asia: "asia",
  sea: "sea",
  americas: "americas",
};
const Servers = {
  eun1: "eun1",
  euw1: "euw1",
  kr: "kr",
  na1: "na1",
  br1: "br1",
};

async function seq(riotServer, riotRegion) {
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
}

seq(Servers.eun1, Regions.europe);
