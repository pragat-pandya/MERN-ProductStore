import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
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
};

export const deleteProduct = async(req, res) => {
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
};

export const getProducts = async (req, res) => {
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
};

export const updateProduct = async (req, res) => {
    
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
};