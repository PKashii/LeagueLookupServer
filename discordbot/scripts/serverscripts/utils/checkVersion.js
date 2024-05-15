const getVersion = require("./getClientVersion");
const path = require("path");
const version = require(path.resolve(__dirname, "currentVersion.json"));

async function checkforNewerVersion() {
  const currentVersion = version.VERSION.trim();
  const latestVersion = (await getVersion()).trim();

  return currentVersion !== latestVersion;
}
module.exports = checkforNewerVersion;
