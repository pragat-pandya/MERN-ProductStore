import express from 'express';

// Initialze the server express
const app = express();

app.listen(5001, () => {
    console.log("Server Started at http://localhost:5001");
});

