const express = require("express");
const router = express.Router();
const {cache, clearAll} = require("./../middleware/cacheMiddleware");
const validationMiddleware = require("./../middleware/validationMiddleware");
const {getMarketData,getCoinMarketChart,getCoinById} = require('./../controllers/controller');

router.use(cache());

router.get("/",validationMiddleware("getMarketData"),getMarketData);
router.get("/:id/market-chart",validationMiddleware("getCoinMarketChart"),getCoinMarketChart);

router.get("/:id",validationMiddleware("getCoinById"),getCoinById);     //optional

module.exports = router