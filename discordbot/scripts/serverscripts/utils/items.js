const FetchData = require("./FetchData");

async function items(arr) {
  const data = await FetchData("itemAssets");
  for (const item of data) {
    arr.push(parseInt(item.id));
  }
}

module.exports = items;
