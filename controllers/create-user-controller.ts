import {Request, Response} from 'express';
import {PrismaClient} from '../prisma/generated/client'
import {User} from "../interfaces/User";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const newUser: User = await prisma.user.create({
            data: {name, email},
        });

        res.json(newUser);
    } catch (error) {
        logger.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


