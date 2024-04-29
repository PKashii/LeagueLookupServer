async function analyzeData(gamesArray) {
  return new Promise((resolve) => {
    const championData = {};

    for (const [championName, itemId, timestamp] of gamesArray) {
      if (!championData[championName]) {
        championData[championName] = {};
      }

      if (!championData[championName][itemId]) {
        championData[championName][itemId] = [];
      }
      championData[championName][itemId].push(timestamp);
    }
    for (const championName in championData) {
      for (const itemId in championData[championName]) {
        const timestamps = championData[championName][itemId];
        const sum = timestamps.reduce((acc, curr) => acc + curr, 0);
        const average = sum / timestamps.length;
        championData[championName][itemId] = Math.round(average);
      }
    }

    const builds = [];

    for (const champion in championData) {
      const entries = Object.entries(championData[champion]);
      const sortedEntries = entries.sort((a, b) => a[1] - b[1]);
      const First3Items = sortedEntries
        .slice(0, 3)
        .map((entry) => parseInt(entry[0]));

      builds.push({ name: champion, items: First3Items });
    }

    resolve(builds);
  });
}

module.exports = analyzeData;
