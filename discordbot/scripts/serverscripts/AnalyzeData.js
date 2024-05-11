async function analyzeData(array) {
  const championData = {};
  const builds = [];

  for (const [championName, itemId, timestamp] of array) {
    if (!championData[championName]) {
      championData[championName] = {};
    }

    if (!championData[championName][itemId]) {
      championData[championName][itemId] = [];
    }
    championData[championName][itemId].push(timestamp);
  }

  for (const championName in championData) {
    const itemAverages = {};
    for (const itemId in championData[championName]) {
      const timestamps = championData[championName][itemId];
      const sum = timestamps.reduce((acc, curr) => acc + curr, 0);
      const average = sum / timestamps.length;
      itemAverages[itemId] = Math.round(average);
    }
    const sortedEntries = Object.entries(itemAverages).sort(
      (a, b) => a[1] - b[1]
    );
    const first3Items = sortedEntries
      .slice(0, 3)
      .map((entry) => parseInt(entry[0]));

    builds.push({ name: championName, items: first3Items });
  }

  return builds;
}

module.exports = analyzeData;
