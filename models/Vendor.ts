import mongoose, {Schema, Model, Document} from "mongoose";

interface VendorDoc extends Document{
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: string;
    coverImages: [string];
    rating: number;
    //foods: any;
}

const VendorSchema = new Schema({
    name: {type: String, required: true},
    ownerName: {type: String, required: true},
    foodType: {type:[String]},
    pincode:{type: String, required: true},
    address: {type: String},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    serviceAvailable: {type: String, required: true},
    coverImages: {type:[String]},
    rating: {type: Number},
    //foods: [{
      //  type: mongoose.SchemaTypes.ObjectId,
        //ref: 'food'
    //}]
},{
    toJSON:{
        transform(doc, ret){
            delete ret.password,
            delete ret.salt
        }
    },
    timestamps: true 
});


const Vendor = mongoose.model<VendorDoc>('Vendor', VendorSchema);

export {Vendor}