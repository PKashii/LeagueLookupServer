function analyzeData(matchData) {
  const championData = {};
  const builds = [];
  let framesArray = [];

  for (const game in matchData) {
    const gameframes = matchData[game].frames;
    for (const frame in gameframes) {
      framesArray.push(gameframes[frame]);
    }
  }

  for (const [championName, itemId, timestamp] of framesArray) {
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
    console.log(championName);
    for (const itemId in championData[championName]) {
      if (championData[championName][itemId].length >= 5) {
        const timestamps = championData[championName][itemId];
        const sum = timestamps.reduce((acc, curr) => acc + curr, 0);
        const average = Math.floor(sum / timestamps.length);
        console.log(itemId + ": " + average);
        itemAverages[itemId] = average;
      }
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
