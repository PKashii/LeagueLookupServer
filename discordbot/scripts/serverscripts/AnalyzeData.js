const { MongoClient } = require("mongodb");
const config = require("/home/kashii/Documents/VSCode/Inzynieria Oprogramowania/LeagueLookupServer/config.json");

const uri = config.URI;
const client = new MongoClient(uri);

let data = [];

async function FetchData() {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Connected successfuly");
  const database = client.db("league_lookup");
  const coll = database.collection("matches");
  try {
    let cursor = await coll.find();
    await cursor.forEach((element) => {
      if (element != undefined) data.push(element);
    });
  } finally {
    await client.close();
  }
  console.log(data);
}

FetchData();
