const axios = require("axios")
const asyncHandler = require('express-async-handler');
const {setCache} = require('./../middleware/cacheMiddleware');
const api_url = process.env.API_URL;
const api_key = process.env.API_KEY
const getMarketData = async(req,res)=>{
    const { vs_currency, order, per_page, page } = req.query;

    const response = await axios({
        URL:`${api_url}/markets?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}`,
        method:"get",
        headers:{
            "x-cg-demo-api-key":api_key
        } 
      });
    await setCache(res.locals.cacheKey, response.data);
    return res.json(response.data);  
}

const getCoinMarketChart = async(req,res)=>{
    const { id } = req.params;
    const { vs_currency, days } = req.query;

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
    const { vs_currency } = req.query;

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