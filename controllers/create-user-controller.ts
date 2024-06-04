import {Request, Response} from 'express';
import {PrismaClient} from '../prisma/generated/client'
import {User} from "../interfaces/User";
import logger from "../utils/logger";
import {cryptographyPass, generateToken} from "../middleware/auth";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body;

        const criptoPass = await cryptographyPass(password);
        const newUser: User = await prisma.user.create({
            data: {name, email, password: criptoPass},
        });

        const token = generateToken(newUser.id);
        res.json({newUser, token});
    } catch (error) {
        logger.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


