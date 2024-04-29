const axios = require("axios");
const config = require("/home/kashii/Documents/VSCode/Inzynieria Oprogramowania/LeagueLookupServer/config.json");
const items = require("./utils/items");

async function getGamesInfo(matchesArray) {
  return new Promise((resolve) => {
    const API_KEY = config.API_KEY;
    const API_CALL = "/lol/match/v5/matches/";
    let API_SERVER_ROUTE;
    let API_MATCH_INFO;
    let gameinfo = [];
    let itemIds = [];

    items(itemIds);

    async function getInfo(i) {
      if (i < 20) {
        let API_SERVER = matchesArray[i].region;
        API_SERVER_ROUTE = `https://${API_SERVER}.api.riotgames.com`;
        const API_ADDRESS =
          API_SERVER_ROUTE +
          API_CALL +
          matchesArray[i].matchId +
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
        console.log(`Retrieving game data done!`);
        resolve(gameinfo);
      }
    }

    getInfo(0);
  });
}

module.exports = getGamesInfo;
