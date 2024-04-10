const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
const config = require("/home/kashii/Documents/VSCode/Inzynieria Oprogramowania/LeagueLookupServer/config.json");

const commands = [
  {
    name: "getdata",
    description: "gathers data from challenger players' games",
    options: [
      {
        name: "region",
        description: "API region",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "server",
        description: "API server",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(config.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(config.CLIENT_ID, config.SERVER_ID),
      { body: commands }
    );
    console.log("commands registered!");
  } catch (e) {
    console.log(e);
  }
})();
