/*

Create database when server is started, if no exist:
    Id => INT
    Username => TXT
    Password => TXT
    Email => TXT
    
*/

import sqlite3 from "sqlite3";


export default function create_database(name: string): sqlite3.Database {
    const db = new sqlite3.Database(`${name}.db`);
    
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT, tocken TEXT)');
    });

    return db;
}
