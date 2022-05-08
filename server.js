const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');


const app = express();
const PORT = process.env.PORT || 3999;
// middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// set up express handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// set code to use express-session and sequelize.store
// This code sets up an Express.js session and connects the session to our Sequelize database
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();
const sess = {
  secret: process.env.SS_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// use sessions 
app.use(session(sess));

// turn on routes ( if this wont be called in server.js, then when you try to test your routes, your will get a 404 bad request error)
app.use(routes);

// turn on connection to db and server // and force to true means that This allows the table to be overwritten and re-created 
//if there is any changes
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});