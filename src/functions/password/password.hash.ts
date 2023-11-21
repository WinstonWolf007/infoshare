import * as crypto from 'crypto'


export default async function hash_password(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex');
  
      crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          const hashedPassword = `${salt}:${derivedKey.toString('hex')}`;
          resolve(hashedPassword);
        };
      });
    });
}