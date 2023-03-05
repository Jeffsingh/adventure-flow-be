const jwt = require("jsonwebtoken");
const fs = require('fs');
let publicKey;

function getPublicKey(){
    if(!publicKey){
        publicKey = fs.readFileSync('public.pem', 'utf8');
    }
    return publicKey;
}

verifyToken = (req, res, next) => {
    publicKey = getPublicKey();
    const authorization = req.headers.authorization;
    const token = authorization && authorization.split(' ')[1];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        next();
    });
};

verifyUserId = (req, res, next) => {
    const requestedUserId = req.params.userId;
    const authorization = req.headers.authorization;
    const token = authorization && authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);
    const authenticatedUserId = decodedToken.id;
    if(requestedUserId != authenticatedUserId){
        return res.status(401).json({ message: 'Unauthorized, access denied' });
    }
    next();
}


const authJwt = {
    verifyToken: verifyToken,
    verifyUserId: verifyUserId
};
module.exports = authJwt;