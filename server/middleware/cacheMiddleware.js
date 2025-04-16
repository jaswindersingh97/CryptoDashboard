const redisClient = require('../config/redisClient');

const keyGenerator = (req) => {
  if (req.path === "/all") return "allCoins";
  if (req.path === "/top-gainer") return "topGainer";
  if (req.path === "/top-loser") return "topLoser";
  if (req.path.endsWith("/market-chart")) return `${req.params.id}_marketChart`;
  if (req.params.id) return `coin_${req.params.id}`;
  return req.originalUrl;
};

const cache = () => async (req, res, next) => {
  const key = keyGenerator(req);
  const cachedData = await redisClient.get(key);
  if (cachedData) return res.json(JSON.parse(cachedData));
  res.locals.cacheKey = key;
  next();
};

const setCache = async (key, data, expiration = 60) => {
  await redisClient.setex(key, expiration, JSON.stringify(data));
};



module.exports = {cache,setCache};
