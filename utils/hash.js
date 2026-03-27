import crypto from 'crypto';

export const hash = (password, salt) => {
    const salted = salt + password + salt;

    const hashing = crypto.createHash('sha256');

    const hash = hashing.update(salted).digest('base64url');
    
    return hash;
};

export const getSalt = (size) => {
    return crypto.randomBytes(50*size).toString('base64url').substring(0, size)
};