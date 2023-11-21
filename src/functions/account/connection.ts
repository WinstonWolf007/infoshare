import sqlite3 from 'sqlite3';

import { http_response, http_code } from '../error';
import Authentification from './authentification';


export default function connection(db: sqlite3.Database, username: string, password: string): Promise<string> {
    return new Promise((resolve, rejects) => {
        new Authentification(db, {username: username, password: password})
                .analyse_name_password()
                    .then((result) => {
                        if (result === http_code.OK.toString()) {
                            resolve(http_response(http_code.OK, "User found"));
                        } else if (result === http_code.NO_FOUND.toString()) {
                            resolve(http_response(http_code.NO_FOUND, "User no found"));
                        }
                    }).catch((error) => {
                        rejects(http_response(http_code.INTERN_ERROR, error));
                    });
    });
}
