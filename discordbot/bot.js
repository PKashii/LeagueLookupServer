const { Client, Events, GatewayIntentBits } = require("discord.js");
const config = require("../config.json");
const getApplicationData = require("./scripts/server");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "getdata") {
    const region = interaction.options.get("region").value;
    const server = interaction.options.get("server").value;
    getApplicationData(server, region);
    interaction.reply(
      "Command executed sucessfuly, check server console for more information."
    );
  }
});

client.login(config.TOKEN);
