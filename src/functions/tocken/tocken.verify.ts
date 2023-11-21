import sqlite3 from "sqlite3";
import { http_response, http_code } from "../error";


export default function verify_tocken(db: sqlite3.Database, email: string, tocken: string): Promise<string> {
    return new Promise((resolve, rejects) => {
        db.get("SELECT * FROM users WHERE email = ? AND tocken = ?", [email, tocken], (error, row) => {
            if (error) {
                rejects(http_response(http_code.INTERN_ERROR, ""));
            } else if (row !== undefined && row !== null) {
                resolve(http_response(http_code.OK, "tocken found"));
            } else {
                resolve(http_response(http_code.NO_FOUND, "invalid tocken"));
            }
        })
    });
}