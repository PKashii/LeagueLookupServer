const FetchData = require("./FetchData");

async function items() {
  const data = await FetchData("itemAssets");
  const itemIds = data.map((item) => parseInt(item.id));
  return itemIds;
}

module.exports = items;
