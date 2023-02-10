const crypto = require("crypto");

const hash = (string) => crypto.createHash('sha256').update(string).digest('base64');

const hash_compare = (first_item, second_item) => Object.is(first_item, second_item);


module.exports = {
    hash,
    hash_compare
};

