const { MongoClient } = require("mongodb");
const config = require("/home/kashii/Documents/VSCode/Inzynieria Oprogramowania/LeagueLookupServer/config.json");

const uri = config.URI;
const client = new MongoClient(uri);

async function insertData(collectionName, Array) {
  try {
    await client.connect();
    const connection = client.db("league_lookup").collection(collectionName);
    await connection.insertMany(Array, (error) => {
      if (error) {
        console.log("Error occured while inserting");
      }
    });
  } finally {
    console.log("Inserting data done!");
    await client.close();
  }
}

module.exports = insertData;
