const env = require("dotenv");
env.config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes.js");

const connectDb = require("./config/db.js");
connectDb();

app.use(bodyParser.json());
app.use('/user', userRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server started at: " + PORT + "🚀");
})