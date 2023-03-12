const jwt = require("jsonwebtoken");
const fs = require('fs');
let privateKey;
let publicKey;

const getPrivateKey = () => {
    if (!privateKey) {
        privateKey = fs.readFileSync('private.key', 'utf-8');
    }
    return privateKey;
}

const getPublicKey = () => {
    if (!publicKey) {
        publicKey = fs.readFileSync('public.pem', 'utf-8');
    }
    return publicKey;
}

const generateJwtToken = (user) => {
    privateKey = getPrivateKey();
    try {
        return jwt.sign({id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name}, privateKey, {
            algorithm: 'RS256', expiresIn: 86400 // 24 hours
        });
    } catch (err) {
        console.log(err);
    }
}

const verifyToken = (req, res, next) => {
    publicKey = getPublicKey();
    const authorization = req.headers.authorization;
    const token = authorization && authorization.split(' ')[1];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, publicKey, {algorithms: ['RS256']}, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        next();
    });
};

const verifyUserId = (req, res, next) => {
    const requestedUserId = req.params.userId;
    const authorization = req.headers.authorization;
    const token = authorization && authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);
    const authenticatedUserId = decodedToken.id;
    if (requestedUserId != authenticatedUserId) {
        return res.status(401).json({message: 'Unauthorized, access denied'});
    }
    next();
}


const authJwt = {
    verifyToken: verifyToken, verifyUserId: verifyUserId, generateJwtToken: generateJwtToken,  getPrivateKey:getPrivateKey
};
module.exports = authJwt;