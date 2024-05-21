const axios = require("axios");
const clearData = require("./utils/ClearData");
const insertData = require("./utils/InsertData");

async function getItems() {
  await clearData("itemAssets");
  let ids = [];
  let urls = [];
  let item_icons = [];

  let API_ADDRESS =
    "https://ddragon.leagueoflegends.com/cdn/14.7.1/data/en_US/item.json";

  let API = await axios
    .get(API_ADDRESS, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
  for (let id in API) {
    if (API[id].depth === 3) ids.push(id);
  }
  for (let url in ids) {
    urls.push(
      `https://ddragon.leagueoflegends.com/cdn/14.7.1/img/item/${ids[url]}.png`
    );
  }

  for (let i = 0; i < ids.length; i++) {
    item_icons.push({
      id: ids[i],
      url: urls[i],
    });
  }

  await insertData.insertMany("itemAssets", item_icons);
}

async function getChampions() {}
module.exports = { getItems, getChampions };
