const Joi = require('joi');
const currency = [  
  "btc",
  "eth",
  "ltc",
  "bch",
  "bnb",
  "eos",
  "xrp",
  "xlm",
  "link",
  "dot",
  "yfi",
  "usd",
  "aed",
  "ars",
  "aud",
  "bdt",
  "bhd",
  "bmd",
  "brl",
  "cad",
  "chf",
  "clp",
  "cny",
  "czk",
  "dkk",
  "eur",
  "gbp",
  "gel",
  "hkd",
  "huf",
  "idr",
  "ils",
  "inr",
  "jpy",
  "krw",
  "kwd",
  "lkr",
  "mmk",
  "mxn",
  "myr",
  "ngn",
  "nok",
  "nzd",
  "php",
  "pkr",
  "pln",
  "rub",
  "sar",
  "sek",
  "sgd",
  "thb",
  "try",
  "twd",
  "uah",
  "vef",
  "vnd",
  "zar",
  "xdr",
  "xag",
  "xau",
  "bits",
  "sats"];
const schemas = {
  getMarketData: {
    query: Joi.object({
      vs_currency: Joi.string().valid(...currency).default("usd"),  
      order: Joi.string().valid("price_change_percentage_24h_asc", "price_change_percentage_24h_desc").default("price_change_percentage_24h"),
      per_page: Joi.number().default(1),
      page: Joi.number().default(1)
    })
  },
  getCoinMarketChart: {
    params: Joi.object({
      id: Joi.string().required()
    }),
    query: Joi.object({
      vs_currency: Joi.string().valid("usd").default("usd"),
      days: Joi.string().valid("1","7", "14", "30").default("7"),
    })
  },
  getCoinById:{
    params: Joi.object({
      id: Joi.string().required()
    }),
    query: Joi.object({
      vs_currency: Joi.string().valid("usd").default("usd"),
    })
  }

};

module.exports = schemas;
