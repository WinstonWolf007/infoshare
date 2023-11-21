import sqlite3 from "sqlite3";
import { v4 as uuidv4 } from 'uuid';

import { http_response, http_code } from "../error";
import hash_password from "../password/password.hash";
import Authentification, { data_struct } from "./authentification";


export default function registration(db: sqlite3.Database, data: data_struct): Promise<string> {
    return new Promise((resolve, rejects) => {
        new Authentification(db, {username: data.username, password: data.password, email: data.email})
            .analyse_name_email()
            .then((result) => {
                if (result === http_code.NO_FOUND.toString()) {
                    addNewClient({username: data.username, password: data.password, email: data.email}, db)
                        .then((result) => {
                            if (result === http_code.OK.toString()) {
                                resolve(http_response(http_code.OK, "Profile is created."))
                            } else if (result === http_code.INTERN_ERROR.toString()) {
                                rejects(http_response(http_code.INTERN_ERROR, "invalid parameters"))
                            }
                        }).catch((error) => {
                            rejects(http_response(Number(error), "Error..."));
                        });
                } else {
                    resolve(http_response(http_code.BAD_REQ_STATUS, "Profile is already exist"));
                }
            }).catch(() => {
                rejects(http_response(http_code.BAD_REQ_STATUS, "Missing args. to request"));
            });
    });
}


function addNewClient(data: data_struct, db: sqlite3.Database): Promise<string> {
    return new Promise((resolve, reject) => {
        if (data.password && data.email) {
            hash_password(data.password)
                .then((password) => {
                    const insertStatement = db.prepare('INSERT INTO users (username, password, email, tocken) VALUES (?, ?, ?, ?)');
                        insertStatement.run(data.username, password, data.email, uuidv4());
                        insertStatement.finalize();
                    resolve(http_code.OK.toString());
                }).catch(() => {
                    reject(http_code.INTERN_ERROR.toString());
                });
        } else {
            resolve(http_code.INTERN_ERROR.toString());
        }
    });
};