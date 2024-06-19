import { Request, Response, NextFunction } from "express";
import { VendorLoginInputs } from "../dto";
import { FindVendor } from "./AdminController";
import { GenerateToken, ValidatePassword } from "../utility/PasswordUtility";


export const VendorLogin = async(req: Request, res:Response, next: NextFunction) =>{
    const {email, password} = <VendorLoginInputs>req.body;

    const existingVendor = await FindVendor('', email);

    if(existingVendor !== null){
        const validation = await ValidatePassword(password,existingVendor.password, existingVendor.salt);

        if(validation){

            const token =await GenerateToken({
                _id: existingVendor.id,
                email: existingVendor.email,
                foodType: existingVendor.foodType,
                name: existingVendor.name
            });

            console.log(token);

            return res.json(token);
        }else{
            return res.json({"message":"Password Incorrect"});
        }
    }else{
        return res.json({"message":"Credentials Invalid"});
    }
}

export const GetVendorProfile = async(req: Request, res: Response, next: NextFunction) =>{
    
    const user = req.user;
    console.log(user);

    if(user){
        const response = await FindVendor(user._id);
        console.log(response);
    
        return res.json(response);
    }
    return res.json({"message":"Not Found"});
    
    
}