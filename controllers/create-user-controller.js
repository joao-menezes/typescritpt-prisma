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
exports.createUser = void 0;
const client_1 = require("../prisma/generated/client");
const logger_1 = __importDefault(require("../utils/logger"));
const auth_1 = require("../middleware/auth");
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const criptoPass = yield (0, auth_1.cryptographyPass)(password);
        const newUser = yield prisma.user.create({
            data: { name, email, password: criptoPass },
        });
        const token = (0, auth_1.generateToken)(newUser.id);
        res.json({ newUser, token });
    }
    catch (error) {
        logger_1.default.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createUser = createUser;
