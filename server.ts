import express from 'express';
import routes from './routes';
import {PrismaClient} from './prisma/generated/client'
import logger from "./utils/logger";

const app = express();
const port = process.env.PORT || 3000;

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
        process.exit(1);
    }
});
