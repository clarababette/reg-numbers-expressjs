/* eslint-disable require-jsdoc */
'use strict';
import express from 'express';
import exphbs from 'express-handlebars';
import flash from 'express-flash';
import session from 'express-session';
import pg from 'pg';
import registrationService from './registration-services.js';
import registrationRoutes from './registration_numbers.js';

const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5433/registration_database';

const pool = (() => {
  if (process.env.NODE_ENV !== 'production') {
    return new Pool({
      connectionString: connectionString,
      ssl: false,
    });
  } else {
    return new Pool({
      connectionString: connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }
})();

pool.connect();

const app = express();
const service = registrationService(pool);
const routes = registrationRoutes(service);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static('public'));
app.use(
    session({
      secret: 'I just want four walls and adobe slats',
      resave: false,
      saveUninitialized: true,
    }),
);

app.use(flash());

app.get('/', routes.landing);
app.post('/add', routes.addRoute);
app.post('/filter', routes.filterRoute);
app.post('/reset-filter', (req, res) => {
  res.redirect('/');
});
app.post('/clearData', routes.clearData);
app.get('/map', (req, res) => {
  res.render('map');
});
app.get('/reg_numbers', (req, res) => {
  res.redirect('/');
});
app.get('/reg_numbers/:reg_num', routes.thisRegNum);
app.post('/add/:add_num', routes.addRoute);

const PORT = process.env.PORT || 3013;
app.listen(PORT, () => {
  console.log(`App starting on port ${PORT}`);
});

