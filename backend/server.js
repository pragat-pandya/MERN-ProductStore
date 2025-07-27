import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";


// Enables access to env vars.
dotenv.config();

// Initialze the server express
const app = express();

// route, controller function
app.get("/", (req, res) => {    
    res.send("Server is up and running!")
});

// Define products route
app.get("/products", (req, res) => {
    res.send("products")
});


// Server listening on localhost 5001 port
app.listen(5001, () => {
    connectDB();
    console.log("Server Started at http://localhost:5001");
});
