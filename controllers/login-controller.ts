import {Request, Response} from 'express';
import {PrismaClient} from '../prisma/generated/client'
import logger, {safePrint} from "../utils/logger";
import {comparePassword, generateToken} from "../middleware/auth";

const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email e password são obrigatórios' });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Email ou password inválidos' });
        }

        const passwordValida = await comparePassword(password, user.password);

        if (!passwordValida) {
            return res.status(401).json({ error: 'Email ou password inválidos' });
        }

        const token = generateToken(user.id);
        res.json({ user, token });
    } catch (error) {
        logger.error('Erro ao fazer login do usuário: ', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


