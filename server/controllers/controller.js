const asyncHandler = require('express-async-handler');
const {setCache} = require('./../middleware/cacheMiddleware');
const getMarketData = async(req,res)=>{
    const { vs_currency, order, per_page, page } = req.query;

    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency,
          order,
          per_page,
          page,
        },
      });
    await setCache(res.locals.cacheKey, response.data);
    return res.json(response.data);  
}

const getCoinMarketChart = async(req,res)=>{
    const { id } = req.params;
    const { vs_currency, days } = req.query;

    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
        params: {
          vs_currency,
          days,
        },
      });
      await setCache(res.locals.cacheKey, response.data);
      res.json(response.data);  
}

const getCoinById = async(req,res)=>{
    const { id } = req.params;
    const { vs_currency } = req.query;

    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, {
        params: {
          vs_currency,
        },
      });
      
      await setCache(res.locals.cacheKey, response.data);

      res.json(response.data);  // Send the response to the client
    
}

module.exports = {
    getMarketData:asyncHandler(getMarketData),
    getCoinMarketChart:asyncHandler(getCoinMarketChart),
    getCoinById:asyncHandler(getCoinById)
}