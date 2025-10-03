require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET,
  xumm: {
    apiKey: process.env.XUMM_API_KEY,
    apiSecret: process.env.XUMM_API_SECRET
  }
};
