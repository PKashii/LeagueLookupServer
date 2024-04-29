const { Client, Events, GatewayIntentBits } = require("discord.js");
const config = require("../config.json");
const {
  updatePlayers,
  updateGames,
  updateBuilds,
  updateAllBuilds,
  updateAssets,
} = require("./scripts/server");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "updateplayers") {
    const server = interaction.options.get("server").value;
    try {
      if (server === "all") {
        updatePlayers("euw1");
        updatePlayers("eun1");
        updatePlayers("na1");
        updatePlayers("kr");
        updatePlayers("br1");
      } else {
        updatePlayers(server);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("upateplayers command done!");
    }
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "updategames") {
    const region = interaction.options.get("region").value;
    try {
      if (region === "all") {
        updateGames("asia");
        updateGames("americas");
        updateGames("europe");
      } else {
        updateGames(region);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("upategames command done!");
    }
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "updatebuilds") {
    try {
      updateBuilds();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("upatebuilds command done!");
    }
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "updateallplayerdata") {
    const server = interaction.options.get("server").value;
    try {
      if (server === "all") {
        updateAllBuilds("euw1", "europe");
        updateAllBuilds("eun1", "europe");
        updateAllBuilds("na1", "americas");
        updateAllBuilds("kr", "asia");
        updateAllBuilds("br1", "americas");
      } else {
        switch (server) {
          case "euw1":
            updateAllBuilds(server, "europe");
            break;
          case "eun1":
            updateAllBuilds(server, "europe");
            break;
          case "na1":
            updateAllBuilds(server, "americas");
            break;
          case "kr":
            updateAllBuilds(server, "asia");
            break;
          case "br1":
            updateAllBuilds("br1", "americas");
            break;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("upateallplayerdata command done!");
    }
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "updateassets") {
    const server = interaction.options.get("type").value;
    try {
      updateAssets(type);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("upateassets command done!");
    }
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "updateall") {
    try {
      const players = async () => {
        updatePlayers("euw1");
        updatePlayers("eun1");
        updatePlayers("na1");
        updatePlayers("kr");
        updatePlayers("br1");
      };
      const games = async () => {
        updateGames("asia");
        updateGames("americas");
        updateGames("europe");
      };
      const builds = async () => {
        updateAllBuilds("euw1", "europe");
        updateAllBuilds("eun1", "europe");
        updateAllBuilds("na1", "americas");
        updateAllBuilds("kr", "asia");
        updateAllBuilds("br1", "americas");
      };
      (async () => await players())();
      (async () => await games())();
      (async () => await builds())();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally... upddating EVERYTHING done!");
    }
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  }
});
client.login(config.TOKEN);
