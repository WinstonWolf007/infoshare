import sqlite3 from 'sqlite3'
import { v4 as uuidv4 } from 'uuid';

import { http_response, http_code } from '../error';


export default function reset_tocken(db: sqlite3.Database, email: string): Promise<string> {
    return new Promise((resolve, rejects) => {
        db.run("UPDATE users SET tocken = ? WHERE email = ?", [uuidv4(), email], (updateError) => {
            if (updateError) {
                rejects(http_response(http_code.INTERN_ERROR, ""));
            } else {
                resolve(http_response(http_code.OK, ""));
            }
        });
    });
}
