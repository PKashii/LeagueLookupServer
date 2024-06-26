const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
const path = require("path");
const config = require(path.resolve(
  __dirname,
  "serverscripts",
  "utils",
  "config.json"
));

const commands = [
  {
    name: "updateplayers",
    description: "updates the database to include more best players",
    options: [
      {
        name: "server",
        description:
          "specify the server you want to gether data from. If 'all', then update data from ALL servers",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "euw1",
            value: "euw1",
          },
          {
            name: "eun1",
            value: "eun1",
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
          {
            name: "ALL",
            value: "all",
          },
        ],
        required: true,
      },
    ],
  },
  {
    name: "updategames",
    description: "updates the database to include more/more updated games",
    options: [
      {
        name: "region",
        description:
          "specify the server you want to gether data from. If 'all', then update data from ALL regions",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "Europe",
            value: "europe",
          },
          {
            name: "Asia",
            value: "asia",
          },
          {
            name: "America",
            value: "americas",
          },
          {
            name: "ALL",
            value: "all",
          },
        ],
      },
    ],
    required: true,
  },
  {
    name: "updatebuilds",
    description: "updates the database to include most recent builds",
  },
  {
    name: "updateassets",
    description: "updates the specified assets",
    options: [
      {
        name: "type",
        description: "specify the type of data to update",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "Items",
            value: "items",
          },
          {
            name: "Champions",
            value: "champions",
          },
          {
            name: "Icons",
            value: "icons",
          },
        ],
      },
    ],
    required: true,
  },
  {
    name: "updatedatabase",
    description: "updates aeverything in the database",
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
