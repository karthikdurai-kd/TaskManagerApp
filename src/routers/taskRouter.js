const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/task");

//Adding task data to database
router.post("/tasks", auth ,async (req, res)=>{
    console.log(req.body);
//Performing without async and await
//    const task = new Task(req.body);
//    task.save().then(()=>{
//       res.status(201).send(task);
//    }).catch((e)=>{
//       res.status(400).send(e);
//    })

//Performing with async and await
 try{
    const task = new Task({
       ...req.body, // here ... denots the spread operator
       owner: req.user._id
    });
    await task.save();
    res.status(201).send(task);
 }
 catch(e){
    res.status(400).send(e);
 }
})



//Reading All Tasks from database
router.get('/fetchAllTasks', auth ,async (req, res)=>{
    //Performing without async and await
    // Task.find({}).then((tasks)=>{
    //      res.send(tasks);
    // }).catch((e)=>{
    //      res.status(500).send();
    // })

    //Performing with async and await
    try{
      //  const tasks = await Task.find({});
      const tasks = await Task.find({owner: req.user._id})
       res.send(tasks);
    }
    catch(e){
       res.status(500).send(e);
    }
 })

 //Reading Single Task from database
router.get("/fetchSingleTasks/:id", auth ,async (req, res)=>{
    const id = req.params.id;
    //Performing without async and await
    // Task.findById(id).then((task)=>{
    //   if(!task){
    //      return res.status(404).send();
    //   }
    //   res.send(task);
    // }).catch((e)=>{
    //     res.status(500).send();
    // })

    //Performing with async and await
    try{
      //const task = await Task.findById(id);
      const task = await Task.findOne({_id: id, owner: req.user._id})
      if(!task){
          return res.status(404).send();
      }
      res.send(task);
    }
    catch(e){
       res.status(500).send(e);
    }
 })

 //Updating Task in database using async and await
 router.patch("/updateTask/:id", auth ,async (req, res)=>{
    const updates = Object.keys(req.body);
    const id = req.params.id;
    try{
     // const task = await Task.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
   //   const task = await Task.findById(id);
        const task = await Task.findOne({_id: id, owner: req.user._id}) 
     updates.forEach((update)=>{
          task[update] = req.body[update];
     })
     await task.save();
     if(!task){
          return res.status(404).send();
      }
      res.send(task);
    }
    catch(e){
        res.status(400).send(e);
    }
 }) 

 //Deleting task from Database
 router.delete("/deleteTask/:id", auth,async (req, res)=>{
    const id = req.params.id;
    try{
     // const task = await Task.findByIdAndDelete(id);
     const task = await Task.findOneAndDelete({_id: id, owner: req.user._id});
      if(!task){
           return res.status(404).send();
      }
      res.send(task);
      console.log("Came");
    }
    catch(e){
       res.status(500).send(e);
    }
 })

 module.exports = router;