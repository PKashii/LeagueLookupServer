const { MongoClient } = require("mongodb");
const config = require("/home/kashii/Documents/VSCode/Inzynieria Oprogramowania/LeagueLookupServer/config.json");

async function fetchData(collectionName) {
  const uri = config.URI;
  const client = new MongoClient(uri);

  let data = [];
  await client.connect();
  const database = client.db("league_lookup");
  const coll = database.collection(collectionName);
  try {
    let cursor = await coll.find();
    await cursor.forEach((element) => {
      if (element != undefined) data.push(element);
    });
  } finally {
    await client.close();
  }
  return data;
}
module.exports = fetchData;
