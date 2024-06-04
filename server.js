"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const client_1 = require("./prisma/generated/client");
const logger_1 = __importDefault(require("./utils/logger"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient();
app.set('prisma', prisma);
app.use('/api', routes_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on http://localhost:${port}`);
    try {
        yield prisma.$connect();
        logger_1.default.info('Connected to database');
    }
    catch (error) {
        logger_1.default.error('Error connecting to database:', error);
        yield prisma.$disconnect();
        process.exit(1);
    }
}));
