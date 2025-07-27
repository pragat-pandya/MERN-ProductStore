import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"

// Enables access to env vars.
dotenv.config();

// Initialze the server express
const app = express();
// Allows to accept json data in the request.body. |MIDDELWARE FROM expres|
app.use(express.json());

app.use("/api/products", productRoutes);


// BASE INDEX ROUTE
// app.get("/", (req, res) => {    
//     res.send("Server is up and running!")
// });

// Server listening on localhost 5001 port
app.listen(5001, () => {
    connectDB();
    console.log("Server Started at http://localhost:5001");
});
