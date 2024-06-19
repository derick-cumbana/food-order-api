import express from "express";
import mongoose from "mongoose";

import {AdminRoute, VendorRoute} from './routes';
import bodyParser from "body-parser";
import { MONGO_URI } from "./config";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoute);

mongoose.connect(MONGO_URI, {
   
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.listen(8000, () => {
    console.log("App is listneing to port 8000")
})