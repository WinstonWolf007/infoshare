import sqlite3 from "sqlite3";

import { http_response, http_code } from "../error";
import create_tocken from "./tocken.create";
import send_email from "../email/email.send";


export default function send_tocken_at_email(db: sqlite3.Database, email: string): Promise<string> {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE email = ?", [email], (error, row) => {
            if (error) {
                reject(http_response(http_code.INTERN_ERROR, ""))
            } else if (row !== undefined && row !== null) {
                const tocken: string = create_tocken().toString();
                db.run("UPDATE users SET tocken = ? WHERE email = ?", [tocken, email], (updateError) => {
                    if (updateError) {
                        reject(http_response(http_code.INTERN_ERROR, ""));
                    } else {
                        send_email(tocken, email);
                        resolve(http_response(http_code.OK, "email found"));
                    }
                });
            } else {
                resolve(http_response(http_code.NO_FOUND, "email no found"));
            }
        })
    })
}