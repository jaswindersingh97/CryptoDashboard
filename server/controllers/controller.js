const asyncHandler = require('express-async-handler');

const getMarketData = async(req,res)=>{

}

const getCoinMarketChart = async(req,res)=>{

}

const getCoinById = async(req,res)=>{

}

module.exports = {
    getMarketData:asyncHandler(getMarketData),
    getCoinMarketChart:asyncHandler(getCoinMarketChart),
    getCoinById:asyncHandler(getCoinById)
}