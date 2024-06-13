function analyzeData(matchData, threshold = 0) {
  const itemSetCounts = {};
  const championData = {};

  for (const game in matchData) {
    if (matchData[game].usable === true) {
      const gameframes = matchData[game].frames;
      const analyzedChampions = new Set();

      const championItems = {};

      for (const frame of gameframes) {
        if (frame !== undefined) {
          const [championName, itemId, order] = frame;

          if (!championItems[championName]) {
            championItems[championName] = [];
          }

          championItems[championName].push({ itemId, order });

          if (!analyzedChampions.has(championName)) {
            if (!championData[championName]) {
              championData[championName] = {
                gamesAnalyzed: 0,
              };
            }
            championData[championName].gamesAnalyzed++;
            analyzedChampions.add(championName);
          }
        }
      }

      for (const championName in championItems) {
        const items = championItems[championName];
        items.sort((a, b) => a.order - b.order);
        const firstThreeItems = items.slice(0, 3).map((item) => item.itemId);

        if (firstThreeItems.length === 3) {
          if (!itemSetCounts[championName]) {
            itemSetCounts[championName] = [];
          }

          let found = false;
          for (const set of itemSetCounts[championName]) {
            if (JSON.stringify(set.items) === JSON.stringify(firstThreeItems)) {
              set.count++;
              found = true;
              break;
            }
          }

          if (!found) {
            itemSetCounts[championName].push({
              items: firstThreeItems,
              count: 1,
            });
          }
        }
      }
    }
  }
  const builds = [];
  for (const championName in itemSetCounts) {
    let maxCount = 0;
    let mostPopularSet = null;
    for (const set of itemSetCounts[championName]) {
      if (set.count > maxCount) {
        maxCount = set.count;
        mostPopularSet = set.items;
      }
    }
    if (mostPopularSet && maxCount >= threshold) {
      builds.push({
        name: championName,
        items: mostPopularSet,
        gamesAnalyzed: championData[championName].gamesAnalyzed,
      });
    }
  }

  return builds;
}

module.exports = analyzeData;
