import mongoose  from "mongoose";

const productSchema = mongoose.Schema({
    "name" : {
        type : String, 
        required : true
    },
    "price" : {
        type : Number,
        required : true
    },
    "image" : {
        type : String,
        required : true
    },
}, {
    timestamps: true    // Adds created_at and updated_at fields by default with each object created
});


// Creates a model called 'Product' with the defined schema.
const Product = mongoose.model('Product', productSchema);

// Make it available in the external files.
export default Product;