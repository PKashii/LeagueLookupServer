const { Client, Events, GatewayIntentBits } = require("discord.js");
const config = require("../config.json");
const { getApplicationData } = require("./scripts/server.js");
const {
  getItems,
  getChampions,
} = require("./scripts/serverscripts/getAssets.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "getdata") {
    const server = interaction.options.get("server").value;
    switch (server) {
      case "euw1":
        getApplicationData(server, "europe");
        break;
      case "na1":
        getApplicationData(server, "americas");
        break;
      case "eun1":
        getApplicationData(server, "europe");
        break;
      case "kr":
        getApplicationData(server, "asia");
        break;
      case "br1":
        getApplicationData(server, "americas");
    }
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "getalldata") {
    getApplicationData("euw1", "europe");
    getApplicationData("na1", "americas");
    getApplicationData("eun1", "europe");
    getApplicationData("kr", "asia");
    getApplicationData("br1", "americas");
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "getassets") {
    const type = interaction.options.get("type").value;
    if (type === "items") getItems();
    if (type === "champions") getChampions();
  }
});
client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "getallassets") {
    getItems();
    getChampions();
  }
});

client.login(config.TOKEN);
