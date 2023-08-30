// const path = require('path');
// const express = require('express');
// const session = require('express-session');
// const exphbs = require('express-handlebars');
// const routes = require('./controllers');
// const helpers = require('./utils/helpers');

// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Set up Handlebars.js engine with custom helpers
// const hbs = exphbs.create({ helpers });

// const sess = {
//   secret: 'Super secret secret',
//   cookie: {
//     maxAge: 300000,
//     httpOnly: true,
//     secure: false,
//     sameSite: 'strict',
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sess));

// // Inform Express.js on which template engine to use
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(routes);

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });


// Import dependencies from both projects
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');  // From Meal-Planner
const dotenv = require('dotenv').config();
const cors = require('cors');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');

// Create the server
const app = express();
const PORT = process.env.PORT || 3001;  // You can choose to keep this or set another port

// Configure CORS and body parser from Meal-Metrics
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure session from Meal-Planner
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Setup Handlebars.js engine from Meal-Planner
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Serve static files from Meal-Planner
app.use(express.static(path.join(__dirname, 'public')));

// Add routes from both projects
app.use(routes);  // Routes from Meal-Planner
app.use('/openai', require('./router'));  // Routes from Meal-Metrics

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
});
