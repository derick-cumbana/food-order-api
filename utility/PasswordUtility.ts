import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { VendorPayload } from '../dto';
import { Request } from 'express';
import { APP_SECRET } from '../config';
import { AuthPayload } from '../dto/Auth.dto';

export const GenerateSalt = async (): Promise<string> => {
    return await bcrypt.genSalt();
}

export const GeneratePassword = async (password: string, salt: string): Promise<string> => {
    return await bcrypt.hash(password, salt);
}

export const ValidatePassword = async (inputPassword: string, savedPassword: string, salt: string): Promise<boolean> => {
    return await GeneratePassword(inputPassword, salt) === savedPassword;
}

export const GenerateToken = async (payload: VendorPayload): Promise<string> => {
    return jwt.sign(payload, APP_SECRET, { expiresIn: '1d' });
}


export const validateToken = async (req: Request): Promise<boolean> => {
    const authorization = req.get('Authorization');

    if (authorization) {
        try {
            const token = authorization.split(' ')[1];
            const payload = jwt.verify(token, APP_SECRET) as AuthPayload;
            console.log("bom dia")
            req.user = payload;
            console.log("Hello Derick")
           
            return true;
        } catch (err) {
            return false;
        }
    }

    return false;
};