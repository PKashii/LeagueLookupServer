const items = require("./utils/items");

async function constructFramesArray(array) {
  let frames = [];
  let itemIds = await items();
  let characters = [];
  let info = [];
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

          if (id >= 1 && id <= 10 && !characters[id]) {
            characters[id] = [name, 0];
          }
        }
      }
    }

    for (const event of game) {
      if (
        event.type == "ITEM_PURCHASED" &&
        itemIds.includes(event.itemId) &&
        characters[event.participantId]
      ) {
        characters[event.participantId][1]++;
        info.push([
          characters[event.participantId][0],
          event.itemId,
          characters[event.participantId][1],
        ]);
      }
    }
  }
  return info;
}

module.exports = constructFramesArray;
