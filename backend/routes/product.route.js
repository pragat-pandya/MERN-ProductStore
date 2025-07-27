import express from 'express';
import Product from '../models/product.model.js';
import {createProduct, deleteProduct, getProducts,  updateProduct} from "../controllers/product.controller.js"

const router = express.Router();


// CREATE
router.post('/', createProduct);

//DELETE
router.delete('/:id', deleteProduct);

// READ
router.get('/', getProducts);

// UPDATE
router.put('/:id', updateProduct);



export default router;