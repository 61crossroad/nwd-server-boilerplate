import bcrypt from 'bcrypt';

const SALT_ROUND = 10;

export const encryptCredential = async (password: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const SALT = bcrypt.genSaltSync(SALT_ROUND);

    bcrypt.hash(password, SALT, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
