const express = require("express");
const app = express();
const PORT = 5000;
const cors = require('cors')
const connectDB= require('./db/connection')
connectDB();
require('dotenv').config({ path: './Config/config.env' })
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

const RegisterRoute=require("./Routes/Authentication")
const LoginRoute=require("./Routes/Authentication")
const logout =require('./Routes/Authentication')


//PrivateController schema
const GetUser=require("./Routes/Private")

//Security
const {verifyToken}=require('./Security/Authorization')



app.use("/api",RegisterRoute)
app.use("/api",LoginRoute)
app.use("/api",verifyToken,logout)
app.use("/api",verifyToken,GetUser)
app.get('/', function (req, res) {
    res.send('<html><body><h1>Hello World</h1></body></html>');
});


app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
