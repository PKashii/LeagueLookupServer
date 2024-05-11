const items = require("./utils/items");

async function constructBuildArray(array) {
  let frames = [];
  let itemIds = await items();
  let characters = [];
  let info = [];
  return new Promise((resolve) => {
    for (let i in array) {
      const gameframes = array[i].frames;
      for (let j in gameframes) {
        frames.push(gameframes[j].events);
      }
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

module.exports = constructBuildArray;
