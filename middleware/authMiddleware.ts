import {Request, Response, NextFunction} from 'express';
import {verifyToken} from './auth';

interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            const authUser: any = verifyToken(token);
            req.user = authUser;
            next();
        } catch (error) {
            return res.sendStatus(403).json({message: 'Forbidden'});
        }
    } else {
        res.sendStatus(401).json({message: 'Unauthorized'});
    }
};
