const { default: axios } = require("axios");

async function getVersion() {
  const version = await axios
    .get("https://ddragon.leagueoflegends.com/api/versions.json")
    .then((response) => {
      return response.data[0];
    });
  return version;
}

module.exports = getVersion;
