const items = require("./utils/items");

async function constructFramesArray(array) {
  let frames = [];
  let itemIds = await items();
  let characters = [];
  let info = [];
  return new Promise((resolve) => {
    const gameframes = array.frames;
    for (let i in gameframes) {
      frames.push(gameframes[i].events);
    }
    for (const game of frames) {
      for (const event of game) {
        if (event.type == "CHAMPION_KILL") {
          for (const e in event.victimDamageReceived) {
            const id = event.victimDamageReceived[e].participantId;
            const name = event.victimDamageReceived[e].name;

            if (id >= 1 && id <= 10 && !characters.includes(name)) {
              characters[id] = name;
            }
          }
        }
      }

      for (const event of game) {
        if (event.type === "ITEM_PURCHASED" && itemIds.includes(event.itemId)) {
          info.push([
            characters[event.participantId],
            event.itemId,
            event.timestamp,
          ]);
        }
      }
    }
    resolve(info);
  });
}

module.exports = constructFramesArray;
