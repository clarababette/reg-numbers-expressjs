'use strict';
import express from 'express';
import exphbs from 'express-handlebars';
import flash from 'express-flash';
import session from 'express-session';
import pg from 'pg';
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/registration_database';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
