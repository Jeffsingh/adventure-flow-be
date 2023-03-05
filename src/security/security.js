const fs = require('fs');
const crypto = require('crypto');

const init = () => {
    generateKeyPair('private.key', 'public.pem', 'myPassphrase');
}


const generateKeyPair = (privateKeyPath, publicKeyPath, passphrase = '') => {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
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

    // зберігаємо private key у файл
    fs.writeFileSync(privateKeyPath, privateKey);

    // зберігаємо public key у файл
    fs.writeFileSync(publicKeyPath, publicKey);

    console.log('Keys generated and saved!');
};

module.exports = {
    init
};