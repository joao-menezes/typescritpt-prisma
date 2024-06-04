import express from 'express';
import routes from './routes';
import {PrismaClient} from './prisma/generated/client'
import logger from "./utils/logger";

import {config} from "dotenv";
config()

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const prisma = new PrismaClient();
app.set('prisma', prisma);

app.use('/api', routes);

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    try {
        await prisma.$connect();
        logger.info('Connected to database');
    } catch (error) {
        logger.error('Error connecting to database:', error);
        await prisma.$disconnect()
        process.exit(1);
    }
});
