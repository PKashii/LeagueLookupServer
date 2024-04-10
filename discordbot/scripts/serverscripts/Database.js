const { MongoClient } = require("mongodb");
const config = require("/home/kashii/Documents/VSCode/Inzynieria Oprogramowania/LeagueLookupServer/config.json");

const uri = config.URI;
const client = new MongoClient(uri);

async function insertData(collectionName, Array) {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfuly");
    const connection = client.db("league_lookup").collection(collectionName);
    await connection.insertMany(Array, (error) => {
      if (error) {
        console.log("Error occured while inserting", error);
      }
    });
  } finally {
    console.log("Inserting data done!");
    await client.close();
  }
}

module.exports = insertData;
