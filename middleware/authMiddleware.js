"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJWT = void 0;
const auth_1 = require("./auth");
const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const authUser = (0, auth_1.verifyToken)(token);
            req.user = authUser;
            next();
        }
        catch (error) {
            return res.sendStatus(403).json({ message: 'Forbidden' });
        }
    }
    else {
        res.sendStatus(401).json({ message: 'Unauthorized' });
    }
};
exports.authJWT = authJWT;
