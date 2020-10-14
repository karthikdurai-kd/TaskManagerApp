require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors');
require('./db/mongoose');
const userRouter = require("./routers/userRouter"); //relative path instead of absolute path
const taskRouter = require("./routers/taskRouter");
const port = process.env.PORT;
//Cors Removing Errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
  
    next();
  });

app.use(express.json()); //configure all the json data coming from client and converts to an object
app.use(userRouter);
app.use(taskRouter);
app.use(cors());
app.get('', (req, res)=>{
   res.send(JSON.stringify("Working!!!"));
})

app.listen(port, ()=>{
    console.log("Server is listening on port "+ port);
})