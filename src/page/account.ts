import express from 'express';
import path from 'path';
import sqlite3 from 'sqlite3';

import connection from '../functions/account/connection';
import { http_type, http_code } from '../functions/error';
import registration from '../functions/account/registration';


// HTML files
const publicPath: string = path.join(__dirname, '../../public/html');

export default function account(app: express.Express, db: sqlite3.Database): void {
    app.route('/account')
        .get((req, res) => {
            res.sendFile(path.join(publicPath, "account.html"));
        })
        .post((req, res) => {
            const form = req.body;

            // Registration page
            if ('email' in form) {
                registration(db, {username: form.username, password: form.password, email: form.email})
                    .then((response) => {
                        const result: http_type = JSON.parse(response);
                        if (result.status === http_code.OK) {
                            res.redirect("/home");
                        } else {
                            res.send("");
                        }
                    }).catch((err) => {
                        res.send(err)
                    });
            
            // Connection page
            } else {
                connection(db, form.username, form.password)
                    .then((response) => {
                        const result: http_type = JSON.parse(response);
                        if (result.status === http_code.OK) {
                            res.redirect("/home");
                        } else {
                            res.redirect("/account");
                        }
                    }).catch((err) => {
                        res.send(err);
                    });
            }
        });
};
