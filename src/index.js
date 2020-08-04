require('dotenv').config();
const express = require('express');
const app = express();
require('./db/mongoose');
const userRouter = require("./routers/userRouter"); //relative path instead of absolute path
const taskRouter = require("./routers/taskRouter");
const port = process.env.PORT;



app.use(express.json()); //configure all the json data coming from client and converts to an object
app.use(userRouter);
app.use(taskRouter);

app.get('', (req, res)=>{
   res.send("Working!!!");
})

app.listen(port, ()=>{
    console.log("Server is listening on port "+ port);
})