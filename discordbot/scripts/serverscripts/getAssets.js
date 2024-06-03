const axios = require("axios");
const clearData = require("./utils/ClearData");
const version = require("./utils/currentVersion");
const { insertMany } = require("./utils/DatabaseFunctions");

async function getItems() {
  await clearData("itemAssets");
  let itemInfo = [];

  const API_ADDRESS = `https://ddragon.leagueoflegends.com/cdn/${version.VERSION}/data/en_US/item.json`;
  try {
    const response = await axios.get(API_ADDRESS, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data.data;

    for (const item in data) {
      if (data[item].depth === 3) {
        itemInfo.push({
          id: item,
          name: data[item].name,
          url: `https://ddragon.leagueoflegends.com/cdn/${version.VERSION}/img/item/${item}.png`,
        });
      }
    }
  } catch (error) {
    console.log("error has occured while fetching.");
  }
  await insertMany("itemAssets", itemInfo);
}

async function getChampions() {
  await clearData("championAssets");

  let championInfo = [];

  const API_ADDRESS = `https://ddragon.leagueoflegends.com/cdn/${version.VERSION}/data/en_US/champion.json`;
  try {
    const response = await axios.get(API_ADDRESS, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data.data;
    for (const champion in data) {
      championInfo.push({
        id: data[champion].id,
        name: data[champion].name,
        title: data[champion].title,
        url: `https://ddragon.leagueoflegends.com/cdn/${version.VERSION}/img/champion/${data[champion].id}.png`,
      });
    }
  } catch (error) {
    console.log(error);
  }
  await insertMany("championAssets", championInfo);
}
module.exports = { getItems, getChampions };
