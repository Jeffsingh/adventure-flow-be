const fs = require('fs');
const crypto = require('crypto');

const init = () => {
    generateKeyPair();
}


const generateKeyPair = () => {
    const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    fs.writeFileSync('private.key', privateKey);
    fs.writeFileSync('public.pem', publicKey);
    console.log('Keys generated and saved!');
};

module.exports = {
    init
};