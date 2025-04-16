const Joi = require('joi');

const schemas = {
  getMarketData: {
    query: Joi.object({
      vs_currency: Joi.string().valid("usd").default("usd"),  
      order: Joi.string().valid("asc", "desc").default("desc"),
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
      days: Joi.string().valid("7", "14", "30").default("7"),
    })
  }
};

module.exports = schemas;
