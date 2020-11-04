const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// set up express

const app = express();

//set up middleware

app.use(express.json());
app.use(cors());

//port

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//set up mongoose, which will connect to mongoDB

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (err) => {
    if (err) throw err;
    console.log("MongoBD connection established")
});

//set routes

app.use("/users", require("./routes/userRouter"));