const crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} n - Length of the random string.
 */
const genRandomString = n => {
  return crypto.randomBytes(Math.ceil(n / 2)).toString('hex');
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - Password to hash
 * @param {string} salt - Salt used in password hash
 */
const sha512WithSalt = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  return hash.digest('hex');
};

/**
 * Generate a random salt, returning the salt and the salted and hashed password
 * @function
 * @param {string} password - Password to hash
 */
const saltHashPassword = password => {
  const salt = genRandomString(16); /** Gives us salt of length 16 */
  return ({
    salt,
    hashedPassword: sha512WithSalt(password, salt)
  });
};

module.exports = {
  genRandomString,
  sha512WithSalt,
  saltHashPassword
};
