import * as crypto from 'crypto';


export default async function verify_password(inputPassword: string, hashedPassword: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, originalHash] = hashedPassword.split(':');

    crypto.pbkdf2(inputPassword, salt, 10000, 64, 'sha512', (err, derivedKey) => {
        if (err) {
            reject(err);
        } else {
            const inputHash = derivedKey.toString('hex');
            const passwordsMatch = inputHash === originalHash;
            resolve(passwordsMatch);
        };
    });
  });
}