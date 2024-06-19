import express, {Request, Response, NextFunction} from 'express';
import { GetVendorProfile, VendorLogin } from '../controllers';
import { Authenticate } from '../middlewares';

const router = express.Router();

router.post('/login', VendorLogin);

router.use(Authenticate);
router.get('/profile', GetVendorProfile);

export {router as VendorRoute};