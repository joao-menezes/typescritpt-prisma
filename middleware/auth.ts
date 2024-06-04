import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {config} from "dotenv";
config()

const JWT_SECRET = process.env.JWT_SECRET || 'tabom';
const JWT_EXPIRATION = '1h';

export const generateToken = (userId: String) => {
    return jwt.sign({userId}, JWT_SECRET, {expiresIn: JWT_EXPIRATION});
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};

export const cryptographyPass = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, criptoPassword: string) => {
    return bcrypt.compare(password, criptoPassword);
};
