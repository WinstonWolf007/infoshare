import sqlite3 from "sqlite3";

import { http_code } from "../error";
import verify_password from "../password/password.verify";


export interface data_struct {
    username: string,
    password?: string,
    email?: string
}

export default class Authentification {
    constructor(private db: sqlite3.Database, private data: data_struct) {}
    
    private db_row_struct(row: object): row is data_struct {
        return (
            'password' in row &&
            'username' in row &&
            'email' in row
        );
    }

    analyse_name_email(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.db.get("SELECT * FROM users WHERE username = ?", [this.data.username], (error, row) => {
                if (error) {
                    reject(error);
                } else if (row !== null && row !== undefined) {
                    if (typeof(row) === 'object' && this.db_row_struct(row) && row?.email && this.data.email) {
                        if (row.email === this.data.email) {
                            resolve(http_code.OK.toString());
                        }
                    } else {
                        resolve(http_code.NO_FOUND.toString());
                    };
                } else {
                    resolve(http_code.NO_FOUND.toString());
                };
            });
        })
    }

    analyse_name_password(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.db.get("SELECT * FROM users WHERE username = ?", [this.data.username], (error, row) => {
                if (error) {
                    reject(error);
                } else if (row !== undefined && row !== null) {
                    if (typeof row === 'object' && this.db_row_struct(row) && this.data?.password && row?.password) {
                        verify_password(this.data.password, row.password)
                            .then((pass) => {
                                let result: number =  pass ? http_code.OK: http_code.NO_FOUND;
                                resolve(result.toString());
                            })
                            .catch(() => {
                                resolve(http_code.INTERN_ERROR.toString());
                            });
                    } else {
                        resolve(http_code.NO_FOUND.toString());
                    }
                } else {
                    resolve(http_code.NO_FOUND.toString());
                };
            });
        });
    };
};