import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';

import { http_code, http_type } from '../functions/error';
import verify_tocken from '../functions/tocken/tocken.verify';
import update_password from '../functions/password/password.update';
import reset_tocken from '../functions/tocken/tocken.reset';
import send_tocken_at_email from '../functions/tocken/tocken.email';


// HTML files
const publicPath: string = path.join(__dirname, '../../public/html');

export default function password(app: express.Express, db: sqlite3.Database): void {
    let email: string = "";

    app.route('/password')
        .get((req, res) => {
            res.sendFile(path.join(publicPath, 'password.email.html'));
        })

        .post((req, res) => {
            const form = req.body;
            const cookies = req.cookies;

            // Get email page
            if ('email' in form) {
                email = cookies.email;
                send_tocken_at_email(db, email)
                    .then((response) => {
                        const result: http_type = JSON.parse(response);
                        if (result.status === http_code.OK) {
                            res.sendFile(path.join(publicPath, 'password.tocken.html'));
                        } else {
                            res.sendFile(path.join(publicPath, 'password.email.html'));
                        }
                    }).catch((err) => {
                        res.send(err);
                    });
            
            // Get tocken page
            } else if ('tocken' in form) {
                const tocken: string = form.tocken;
                verify_tocken(db, email, tocken)
                    .then((response) => {
                        const result: http_type = JSON.parse(response);
                        if (result.status === http_code.OK) {
                            reset_tocken(db, email);
                            res.sendFile(path.join(publicPath, 'password.update.html'));
                        } else {
                            res.sendFile(path.join(publicPath, 'password.tocken.html'));
                        }
                    }).catch((err) => {
                        res.send(err)
                    });
            
            // Set new password page
            } else if ('password' in form) {
                const password: string = form.password;
                update_password(db, email, password)
                    .then((response) => {
                        const result: http_type = JSON.parse(response);
                        if (result.status === http_code.OK) {
                            res.redirect("/account");
                        } else {
                            res.sendFile(path.join(publicPath, 'password.password.html'));
                        }
                    }).catch((err) => {
                        res.send(err);
                    })
            };
        })
};
