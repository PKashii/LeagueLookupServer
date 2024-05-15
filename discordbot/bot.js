const { Client, GatewayIntentBits } = require("discord.js");
const config = require("../config.json");
const {
  updatePlayers,
  updateGames,
  updateBuilds,
  updateDatabase,
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
      updatePlayers("euw1");
      updatePlayers("na1");
      updatePlayers("kr");
      updatePlayers("br1");
    } else {
      updatePlayers(server);
    }
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  } else if (interaction.commandName === "updategames") {
    const region = interaction.options.get("region").value;
    if (region == "all") {
      updateGames("europe");
      updateGames("americas");
      updateGames("asia");
    }
    updateGames(region);
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  } else if (interaction.commandName === "updatebuilds") {
    updateBuilds();
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  } else if (interaction.commandName === "updatedatabase") {
    const server = interaction.options.get("server").value;
    if (server == "all") {
      updateDatabase("euw1", "europe");
      updateDatabase("eun1", "europe");
      updateDatabase("na1", "americas");
      updateDatabase("kr", "asia");
      updateDatabase("br1", "americas");
    } else if (server == "euw1") {
      updateDatabase(server, "europe");
    } else if (server == "eun1") {
      updateDatabase("eun1", "europe");
    } else if (server == "na1") {
      updateDatabase("na1", "americas");
    } else if (server == "kr") {
      updateDatabase("kr", "asia");
    } else if (server == "br1") {
      updateDatabase("br1", "americas");
    }
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  } else if (interaction.commandName === "updateassets") {
    const type = interaction.options.get("type").value;
    updateAssets(type);
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  } else if (interaction.commandName === "updateall") {
    updateDatabase("euw1", "europe");
    //updateDatabase("eun1", "europe");
    updateDatabase("na1", "americas");
    updateDatabase("kr", "asia");
    // updateDatabase("br1", "americas");
    updateAssets("items");
    //updateAssets("champions");
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  }
});

client.login(config.TOKEN);
