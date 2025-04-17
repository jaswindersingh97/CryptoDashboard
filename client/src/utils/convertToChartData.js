
const convertToChartData = (raw) => {
    return raw.prices.map(([timestamp, price], i) => ({
      date: new Date(timestamp).toISOString(), // You can use toISOString() if needed
      price,
      marketCap: raw.market_caps[i]?.[1] ?? null,
      volume: raw.total_volumes[i]?.[1] ?? null
    }));
  };
  

  export {convertToChartData}