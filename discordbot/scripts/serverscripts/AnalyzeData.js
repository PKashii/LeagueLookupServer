function analyzeData(matchData, threshold = 5) {
  const championData = {};
  const itemSetCounts = {};

  for (const game in matchData) {
    if (matchData[game].usable === true) {
      const gameframes = matchData[game].frames;

      const analyzedChampions = new Set();

      for (const frame of gameframes) {
        if (frame !== undefined && frame.length >= 3) {
          const [championName, itemId, order] = frame;

          if (!championData[championName]) {
            championData[championName] = {
              counts: {},
              gamesAnalyzed: 0,
            };
          }
          if (!championData[championName].counts[order]) {
            championData[championName].counts[order] = {};
          }
          if (!championData[championName].counts[order][itemId]) {
            championData[championName].counts[order][itemId] = 0;
          }
          championData[championName].counts[order][itemId]++;

          const itemSet = frame.slice(3).join(",");
          if (!itemSetCounts[championName]) {
            itemSetCounts[championName] = {};
          }
          if (!itemSetCounts[championName][itemSet]) {
            itemSetCounts[championName][itemSet] = 0;
          }
          itemSetCounts[championName][itemSet]++;

          if (!analyzedChampions.has(championName)) {
            championData[championName].gamesAnalyzed++;
            analyzedChampions.add(championName);
          }
        }
      }
    }
  }

  const apheliosItemCounts = championData["Aphelios"]?.counts || {};
  console.log("Analyzed items for Aphelios:");
  for (const order in apheliosItemCounts) {
    for (const itemId in apheliosItemCounts[order]) {
      console.log(
        `Item ID: ${itemId}, Order: ${order}, Count: ${apheliosItemCounts[order][itemId]}`
      );
    }
  }

  const builds = [];
  for (const championName in itemSetCounts) {
    let maxCount = 0;
    let mostPopularSet = null;
    for (const itemSet in itemSetCounts[championName]) {
      if (itemSetCounts[championName][itemSet] > maxCount) {
        maxCount = itemSetCounts[championName][itemSet];
        mostPopularSet = itemSet;
      }
    }
    if (mostPopularSet && maxCount >= threshold) {
      builds.push({
        name: championName,
        items: mostPopularSet.split(",").map(Number),
        gamesAnalyzed: championData[championName].gamesAnalyzed,
        appearances: Object.keys(championData[championName].counts[1]).reduce(
          (acc, itemId) => acc + championData[championName].counts[1][itemId],
          0
        ),
      });
    } else {
      builds.push({
        name: championName,
        items: [null, null, null],
        gamesAnalyzed: championData[championName].gamesAnalyzed,
        appearances: Object.keys(championData[championName].counts[1]).reduce(
          (acc, itemId) => acc + championData[championName].counts[1][itemId],
          0
        ),
      });
    }
  }

  for (const build of builds) {
    for (let i = 0; i < 3; i++) {
      if (build.items[i] === null) {
        const mostFrequentItem = { id: null, count: 0 };
        for (const order in championData[build.name].counts) {
          for (const itemId in championData[build.name].counts[order]) {
            if (
              parseInt(order) === i + 1 &&
              championData[build.name].counts[order][itemId] >
                mostFrequentItem.count &&
              !build.items.includes(parseInt(itemId))
            ) {
              mostFrequentItem.id = parseInt(itemId);
              mostFrequentItem.count =
                championData[build.name].counts[order][itemId];
            }
          }
        }
        build.items[i] = mostFrequentItem.id;
      }
    }
  }

  return builds;
}

module.exports = analyzeData;
