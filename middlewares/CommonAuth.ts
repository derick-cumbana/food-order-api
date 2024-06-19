import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utility/PasswordUtility';
import { AuthPayload } from '../dto/Auth.dto'; 

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await validateToken(req);

    if (validate) {
        console.log("Authentication Valid")
        next();
    } else {
        return res.json({ "message": "User unauthorized" });
    }
};
