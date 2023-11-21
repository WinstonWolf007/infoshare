import sqlite3 from "sqlite3";

import { http_response, http_code } from "../error";
import hashPassword from "./password.hash";


export default function update_password(db: sqlite3.Database, email: string, password: string): Promise<string> {
    return new Promise((resolve, rejects) => {
        hashPassword(password)
            .then((hash_pass) => {
                db.run("UPDATE users SET password = ? WHERE email = ?", [hash_pass, email], (updateError) => {
                    if (updateError) {
                        rejects(http_response(http_code.INTERN_ERROR, ""));
                    } else {
                        resolve(http_response(http_code.OK, "password reset"));
                    }
                });
            }).catch((err) => {
                resolve(http_response(http_code.INTERN_ERROR, ""));
            });
    }) 
};
