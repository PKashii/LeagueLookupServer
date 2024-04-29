const { MongoClient } = require("mongodb");
const config = require("/home/kashii/Documents/VSCode/Inzynieria Oprogramowania/LeagueLookupServer/config.json");

const uri = config.URI;
const client = new MongoClient(uri);

async function clearData(collectionName) {
  try {
    await client.connect();
    const connection = client.db("league_lookup").collection(collectionName);
    await connection.deleteMany({}, (error) => {
      if (error) {
        console.log("Error occured while deleting");
      }
    });
  } finally {
    console.log("Clearing data done!");
    await client.close();
  }
}

module.exports = clearData;
