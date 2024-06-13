const { Client, GatewayIntentBits } = require("discord.js");
const path = require("path");
const config = require(path.resolve(
  __dirname,
  "scripts",
  "serverscripts",
  "utils",
  "config.json"
));
const {
  updatePlayers,
  updateGames,
  updateBuilds,
  updateAssets,
} = require("./scripts/server");
const updateVersion = require("./scripts/serverscripts/utils/updateVersion");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await updateVersion();
  const update = async () => {
    await updateAssets("items");
    await updateAssets("champions");
    await updatePlayers("eun1");
    await updatePlayers("na1");
    await updatePlayers("euw1");
    await updatePlayers("kr");
    await updatePlayers("br1");
    await updateGames("europe");
    await updateGames("americas");
    await updateGames("asia");
    await updateBuilds();
    await update();
  };
  //await update();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "updateplayers") {
    const server = interaction.options.get("server").value;

    if (server == "all") {
      await updatePlayers("eun1");
      await updatePlayers("na1");
      await updatePlayers("euw1");
      await updatePlayers("kr");
      await updatePlayers("br1");
    } else {
      await updatePlayers(server);
    }
  } else if (interaction.commandName === "updategames") {
    const region = interaction.options.get("region").value;
    if (region == "all") {
      await updateGames("europe");
      await updateGames("americas");
      await updateGames("asia");
    } else {
      updateGames(region);
    }
  } else if (interaction.commandName === "updatebuilds") {
    updateBuilds();
  } else if (interaction.commandName === "updateassets") {
    const type = interaction.options.get("type").value;
    updateAssets(type);
  } else if (interaction.commandName === "updatedatabase") {
    await updatePlayers("eun1");
    await updatePlayers("na1");
    await updatePlayers("euw1");
    await updatePlayers("kr");
    await updatePlayers("br1");
    await updateGames("europe");
    await updateGames("americas");
    await updateGames("asia");
    await updateAssets("items");
    await updateAssets("champions");
    await updateAssets("icons");
    await updateBuilds();
  }
});

client.login(config.TOKEN);
