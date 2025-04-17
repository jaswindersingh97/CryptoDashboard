const redisClient = require('../config/redisClient');

const keyGenerator = (req) => {
  const { vs_currency, order, per_page, page,days } = req.query;
  let key = '';
    // For getMarketData (All, Top Gainer, Top Loser)
    if (req.path === "/") {
      key = `getMarketData_${vs_currency}_${order}_${per_page}_${page}`;
    }
  
    // For Coin Market Chart
    if (req.path.endsWith("/market-chart")) {
      key = `${req.params.id}_marketChart_${vs_currency}_${days}`;
    }
  
    // For Coin By ID
    if (req.params.id) {
      key = `coin_${req.params.id}_${vs_currency}`;
    }
  
    // Default case, use the original URL as fallback
    if (!key) {
      key = req.originalUrl;
    }
  
    return key;
};

const cache = () => async (req, res, next) => {
  const key = keyGenerator(req);
  const cachedData = await redisClient.get(key);
  if (cachedData){
    console.log("used cached data");   
    return res.json(JSON.parse(cachedData));}
  res.locals.cacheKey = key;
  next();
};

const setCache = async (key, data, expiration = 60) => {
  await redisClient.set(key, JSON.stringify(data),'EX', expiration);
};

const clearAll = async()=>{
  await redisClient.flushDb();    
}

module.exports = {cache,setCache,clearAll};
