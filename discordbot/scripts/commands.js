const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
const config = require("/home/kashii/Documents/VSCode/Inzynieria Oprogramowania/LeagueLookupServer/config.json");

const commands = [
  {
    name: "getdata",
    description: "gathers Challenger players' game data from a specific server",
    options: [
      {
        name: "server",
        description: "API server",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "euw1",
            value: "euw1",
          },
          {
            name: "eun1",
            value: "euw1",
          },
          {
            name: "na1",
            value: "na1",
          },
          {
            name: "kr",
            value: "kr",
          },
          {
            name: "br1",
            value: "br1",
          },
        ],
        required: true,
      },
    ],
  },
  {
    name: "getalldata",
    description:
      "gathers Challenger players' game data from ALL handled servers",
  },
  {
    name: "getassets",
    description: "gathers/updates specific type of assets for the app",
    options: [
      {
        name: "type",
        description: "type of assets requested",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "items",
            value: "items",
          },
          {
            name: "champions",
            value: "champions",
          },
        ],
        required: true,
      },
    ],
  },
  {
    name: "getallassets",
    description: "gathers/updates ALL assets for the app",
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
