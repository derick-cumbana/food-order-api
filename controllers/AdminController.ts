import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility/PasswordUtility";

export const FindVendor = async(id: string| undefined, email?:string) => {
    
    if(email){
        return await Vendor.findOne({ email: email});
    }else{
        return await Vendor.findById(id);
    }
}

export const CreateVendor = async(req: Request, res: Response, next: NextFunction) =>{
    
    const {name, address, pincode, foodType, email, password, ownerName, phone} = <CreateVendorInput>req.body;

    const existingVandor = await FindVendor('',email);

    if(existingVandor){
        return res.json({"message":"A vendor with that email already exists!"})
    }

    //Generate a Salt
    const salt = await GenerateSalt();

    //Encrypt a password using the salt
    const userPassword = await GeneratePassword(password,salt); 

    const CreateVendor = await Vendor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: userPassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: []
    }
    )

    return res.json(CreateVendor)

}


export const GetVendors = async(req: Request, res:Response, next: NextFunction) =>{

    const vandors = await Vendor.find();

    if(vandors !== null){
        return res.json(vandors);
    }
    return res.json({"message":"No vendors Found"})

}

export const GetVendorById = async(req: Request, res: Response, next: NextFunction) =>{

    const vendorId = req.params.id;

    const vendor = await Vendor.findById(vendorId);

    if(vendor !== null){
        return res.json(vendor);
    }

    return res.json({"message":"No vendor Found with the provided ID"})
    
}