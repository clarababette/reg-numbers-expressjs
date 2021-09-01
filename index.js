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

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/registration_database';

const pool = new Pool({
  connectionString,
  ssl: process.env.DATABASE_URL ? true : false,
});

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
app.post('/add', routes.newRegistration);
app.post('/filter', routes.filter);


const PORT = process.env.PORT || 3013;
app.listen(PORT, () => {
  console.log(`App starting on port ${PORT}`);
});

// async function test(func) {
//   const result = await pool.query('SELECT * FROM registration_numbers');
//   console.log(result.rows);
//   console.log(await func);
// }
// test(service.getNumbers());
