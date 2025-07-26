import express from 'express';

// Initialze the server express
const app = express();



// route, controller function
app.get("/", (req, res) => {    
    res.send("Server is up and running!")
});




// Server listening on localhost 5001 port
app.listen(5001, () => {
    console.log("Server Started at http://localhost:5001");
});

