import express from 'express';
import path from 'path';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import create_database from './src/functions/database';

import password from './src/page/password';
import account from './src/page/account';
import home from './src/page/home'


// Config express server
const app: express.Express = express();
const port: number = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public/static')));

// Create sqlite database file
const db: sqlite3.Database = create_database("users");

// Create HTML page
password(app, db);
account(app, db);
home(app);

// Listen Port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}).on("close", db.close);
