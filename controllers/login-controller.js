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
exports.loginUser = void 0;
const client_1 = require("../prisma/generated/client");
const logger_1 = __importDefault(require("../utils/logger"));
const auth_1 = require("../middleware/auth");
const prisma = new client_1.PrismaClient();
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e password são obrigatórios' });
        }
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Email ou password inválidos' });
        }
        const passwordValida = yield (0, auth_1.comparePassword)(password, user.password);
        if (!passwordValida) {
            return res.status(401).json({ error: 'Email ou password inválidos' });
        }
        const token = (0, auth_1.generateToken)(user.id);
        res.json({ user, token });
    }
    catch (error) {
        logger_1.default.error('Erro ao fazer login do usuário: ', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
exports.loginUser = loginUser;
