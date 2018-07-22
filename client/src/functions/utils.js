exports.sortByRankCoins = arrayCoins => {
  return arrayCoins.sort((coin1, coin2) => {
    return parseInt(coin1.rank) > parseInt(coin2.rank);
  });
};

exports.formatNumber = coinValue => {
  const parsedCoinValue = parseFloat(coinValue);
  const numZeros =
    parsedCoinValue !== 0
      ? -Math.floor(Math.log(parsedCoinValue) / Math.log(10) + 1)
      : 0;
  return numZeros > 1
    ? parseFloat(parsedCoinValue)
        .toFixed(numZeros + 3)
        .toLocaleString()
    : parsedCoinValue.toLocaleString();
};
