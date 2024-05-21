const fs = require("fs").promises;
const path = require("path");
const getVersion = require("./getClientVersion");
const checkforNewerVersion = require("./checkVersion");

async function updateVersion() {
  const pathToJson = path.resolve(__dirname, "currentVersion.json");

  try {
    const newVersion = await getVersion();
    const check = await checkforNewerVersion();

    if (check) {
      let data = await fs.readFile(pathToJson, "utf8");
      const json = JSON.parse(data);
      json.VERSION = newVersion;
      const modifiedJson = JSON.stringify(json, null, 2);
      await fs.writeFile(pathToJson, modifiedJson, "utf8");
      console.log(
        `Updated the client version, current version: ${newVersion}. Builds may not be accurate, please wait a couple of days for players to upate the builds.`
      );
    } else {
      let data = await fs.readFile(pathToJson, "utf8");
      const json = JSON.parse(data);
      console.log(
        `Version of the client is up to date, current version: ${json.VERSION}`
      );
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

module.exports = updateVersion;
