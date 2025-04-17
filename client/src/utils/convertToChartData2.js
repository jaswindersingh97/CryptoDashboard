const convertToChartData = (raw, days = 1) => {
  // Determine period length in milliseconds
  let periodMs;
  if (days <= 1) periodMs = 60 * 60 * 1000; // 1 hour
  else if (days <= 7) periodMs = 4 * 60 * 60 * 1000; // 4 hours
  else if (days <= 14) periodMs = 6 * 60 * 60 * 1000; // 6 hours
  else if (days <= 30) periodMs = 12 * 60 * 60 * 1000; // 12 hours
  else periodMs = 24 * 60 * 60 * 1000; // 1 day

  const grouped = {};

  raw.prices.forEach(([timestamp, price], i) => {
    const periodKey = Math.floor(timestamp / periodMs) * periodMs;

    if (!grouped[periodKey]) {
      grouped[periodKey] = {
        timestamp: periodKey,
        prices: [],
        marketCaps: [],
        volumes: [],
      };
    }

    grouped[periodKey].prices.push(price);
    grouped[periodKey].marketCaps.push(raw.market_caps[i]?.[1] ?? null);
    grouped[periodKey].volumes.push(raw.total_volumes[i]?.[1] ?? null);
  });

  return Object.entries(grouped).map(([_, group]) => {
    const prices = group.prices;
    return {
      date: new Date(group.timestamp).toISOString(),
      open: prices[0],
      high: Math.max(...prices),
      low: Math.min(...prices),
      close: prices[prices.length - 1],
      marketCap:
        group.marketCaps.reduce((acc, val) => acc + (val || 0), 0) /
        group.marketCaps.length,
      volume:
        group.volumes.reduce((acc, val) => acc + (val || 0), 0) /
        group.volumes.length,
    };
  });
};

export { convertToChartData };
