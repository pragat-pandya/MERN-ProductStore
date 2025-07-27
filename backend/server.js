import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import Product from './models/product.model.js';


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


// Server listening on localhost 5001 port
app.listen(5001, () => {
    connectDB();
    console.log("Server Started at http://localhost:5001");
});
