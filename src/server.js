const express = require('express');
const session = require('express-session');
const path = require('path');
const config = require('./config/app.config');
const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
}));

app.use('/', routes);

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(config.port, () => {
    console.log(`NFT Marketplace: http://localhost:${config.port}`);
  });
}

// Export for Vercel serverless
module.exports = app;
