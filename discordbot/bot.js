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
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "updateplayers") {
    const server = interaction.options.get("server").value;

    if (server == "all") {
      updatePlayers("eun1");
      updatePlayers("na1");
      updatePlayers("euw1");
      updatePlayers("kr");
      updatePlayers("br1");
    } else {
      await updatePlayers(server);
    }
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  } else if (interaction.commandName === "updategames") {
    const region = interaction.options.get("region").value;
    if (region == "all") {
      await updateGames("europe");
      await updateGames("americas");
      await updateGames("asia");
    } else {
      updateGames(region);
    }
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  } else if (interaction.commandName === "updatebuilds") {
    updateBuilds();
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  } else if (interaction.commandName === "updateassets") {
    const type = interaction.options.get("type").value;
    updateAssets(type);
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  } else if (interaction.commandName === "updatedatabase") {
    await updateGames("europe");
    await updateGames("americas");
    await updateGames("asia");
    await updateAssets("items");
    await updateAssets("champions");
    await updateBuilds();
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  }
});

client.login(config.TOKEN);
