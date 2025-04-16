const axios = require("axios")
const asyncHandler = require('express-async-handler');
const {setCache} = require('./../middleware/cacheMiddleware');
const api_url = process.env.API_URL;
const api_key = process.env.API_KEY
const getMarketData = async(req,res)=>{
    const { vs_currency="usd", order="price_change_percentage_24h_desc", per_page=1, page=1 } = req.query;
    console.log(`${api_url}/markets?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}`,'x-cg-demo-api-key',api_key);

    const response = await axios({
        url:`${api_url}/markets?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}`,
        method:"get",
        headers:{
            'x-cg-demo-api-key':api_key
        } 
      });
    await setCache(res.locals.cacheKey, response.data);

    return res.json(response.data);  
}

const getCoinMarketChart = async(req,res)=>{
    const { id } = req.params;
    const { vs_currency="usd", days="7" } = req.query;

    const response = await axios({
        url: `${api_url}/${id}/market_chart?vs_currency=${vs_currency}&days=${days}`,
        method: "get",
        headers: {
          "x-cg-demo-api-key": api_key
        }
      });
      await setCache(res.locals.cacheKey, response.data);
      res.json(response.data);  
}

const getCoinById = async(req,res)=>{
    const { id } = req.params;
    const { vs_currency="usd" } = req.query;

    const response = await axios({
        url: `${api_url}/${id}?vs_currency=${vs_currency}`,
        method: "get",
        headers: {
          "x-cg-demo-api-key": api_key
        }
      });
    
      await setCache(res.locals.cacheKey, response.data);

      res.json(response.data);  // Send the response to the client
    
}

module.exports = {
    getMarketData:asyncHandler(getMarketData),
    getCoinMarketChart:asyncHandler(getCoinMarketChart),
    getCoinById:asyncHandler(getCoinById)
}