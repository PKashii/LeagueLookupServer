const axios = require("axios");
const config = require("/home/kashii/Documents/VSCode/Inzynieria Oprogramowania/LeagueLookupServer/config.json");
const FetchData = require("./FetchData");

async function getGamesInfo(region, matchesArray) {
  return new Promise((resolve) => {
    const API_KEY = config.API_KEY;
    const API_CALL = "/lol/match/v5/matches/";
    const API_SERVER = region;
    const API_SERVER_ROUTE = `https://${API_SERVER}.api.riotgames.com`;

    let API_MATCH_INFO;
    let gameinfo = [];

    async function items(arr) {
      const data = await FetchData("itemAssets");
      for (const item of data) {
        arr.push(parseInt(item.id));
      }
    }

    async function getInfo(i) {
      const itemIds = [];
      await items(itemIds);

      if (i < matchesArray.length) {
        const API_ADDRESS =
          API_SERVER_ROUTE +
          API_CALL +
          matchesArray[i] +
          "/timeline?api_key=" +
          API_KEY;

        API_MATCH_INFO = await axios
          .get(API_ADDRESS, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            const d = response.data.info;
            let characters = [];

            for (const frame of d.frames) {
              for (const event of frame.events) {
                if (event.type == "CHAMPION_KILL") {
                  for (e in event.victimDamageReceived) {
                    const id = event.victimDamageReceived[e].participantId;
                    const name = event.victimDamageReceived[e].name;

                    if (id >= 1 && id <= 10 && !characters.includes(name)) {
                      characters[id] = name;
                    }
                  }
                }
              }
            }

            for (const frame of d.frames) {
              for (const event of frame.events) {
                if (
                  event.type === "ITEM_PURCHASED" &&
                  itemIds.includes(event.itemId)
                ) {
                  gameinfo.push([
                    characters[event.participantId],
                    event.itemId,
                    frame.timestamp,
                  ]);
                }
              }
            }
          });
        setTimeout(getInfo, 1300, i + 1);
      } else {
        gameinfo.sort(function (a, b) {
          if (a[0] !== b[0]) {
            return a[0].localeCompare(b[0]);
          } else {
            return a[2] - b[2];
          }
        });
        let fullGameInfo;
        for (character in gameinfo) {
          fullGameInfo.push([
            {
              championName: gameinfo[character][0],
            },
          ]);
        }
        console.log(`Retrieving game data done!`);
        resolve(gameinfo);
      }
    }

    getInfo(0);
  });
}

module.exports = getGamesInfo;
