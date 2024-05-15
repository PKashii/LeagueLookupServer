const getVersion = require("./getClientVersion");
const version = require("/home/kashii/Documents/VSCode/Inzynieria Oprogramowania/LeagueLookupServer/currentVersion.json");

async function checkforNewerVersion() {
  const currentVersion = version.VERSION.trim();
  const latestVersion = (await getVersion()).trim();

  return currentVersion !== latestVersion;
}
module.exports = checkforNewerVersion;
