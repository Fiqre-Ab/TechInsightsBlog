// TECH BLOG - CHECKED, SAME AS REFERENCE
// / TECH BLOG - CHECKED, SAME AS REFERENCE

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const crypto = require('crypto');
// Import your Sequelize configuration
const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Create an instance of Handlebars engine with custom helpers
const hbs = exphbs.create({ helpers });
// Generate a secure random key
const secretKey = crypto.randomBytes(64).toString('hex');
const sess = {
  secret: secretKey,
  cookie: {},//cookie
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


app.use(session(sess));
// Set the view engine to Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//routes
app.use(routes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
    // Sync the Sequelize models to the database
  sequelize.sync({ force: false });
});


