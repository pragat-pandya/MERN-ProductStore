import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import Product from './models/product.model.js';
import mongoose, { mongo } from 'mongoose';


// Enables access to env vars.
dotenv.config();

// Initialze the server express
const app = express();
// Allows to accept json data in the request.body. |MIDDELWARE FROM expres|
app.use(express.json());



// route, controller function
app.get("/", (req, res) => {    
    res.send("Server is up and running!")
});

// Define products route
app.post('/api/products', async (req, res) => {
    // user sent data
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields"
        });
    } else {
        const newProduct = new Product(product);
        try {
            await newProduct.save();
            return res.status(201).json({
                success: true,
                message: "New product created successfully",
                data: newProduct
            });
        } catch (error) {
            console.error("Error in create product: ", error.message);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
});

app.delete('/api/products/:id', async(req, res) => {
    const { id } = req.params;
    console.log("ID:", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Proudct ID"
        });
    }
    try{
        await Product.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Product deleted!"
        });
    } catch(error) {
        console.log("Unable to delete the product: ", id);
        return res.status(500).json({
            success: false,
            message: "Server Error!"
        });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            message: "All products",
            data: products,
        });
    } catch (error) {
        console.log("Error in fetching products!");
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.put('/api/products/:id', async (req, res) => {
    
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Proudct ID"
        });
    }
    try{
        const updated = await Product.findByIdAndUpdate(id, product, {new:true});

        res.status(200).json({
            success:true,
            message: "Updated successfully!"
        });
        // By default old object is returned with new true the updated object is returned.
    } catch(error) {
        console.log("ERROR:", error.message);
        res.status(500).json({
            success: false,
            message: "SERVER ERROR!"
        });
    }
});

// Server listening on localhost 5001 port
app.listen(5001, () => {
    connectDB();
    console.log("Server Started at http://localhost:5001");
});
