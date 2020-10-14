const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const Task = require("../models/task");

//Adding User data to database
router.post('/users', async (req, res)=>{
    console.log(req.body);
    const user = new User(req.body);
    //Performing without async and await
    // user.save().then(()=>{
    //      res.status(201).send(user);
    // }).catch((e)=>{
    //    res.status(400).send(e);
    // })

    //Performing with async and await
    try{
       await user.save();
       const token = await user.generateAuthToken();
       res.status(201).send({
         user: user,
         token: token
       });
    }
    catch(e){
       res.status(400).send(e);
    }
})

//Logging in User
router.post("/user/login", async (req, res)=>{
    try{
      const user = await User.findByCredentials(req.body.email, req.body.password);
      const token = await user.generateAuthToken();
      res.send({
        user: user,
        token: token
      });
    }
    catch(e){
      res.status(400).send();
    }
})

//Logging Out User from the device they are using currently
router.post("/user/logout", auth, async (req, res)=>{
     try{
       req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
       })
       await req.user.save();
       res.send(JSON.stringify("Logout Success"));
     }
     catch(e){
       res.status(500).send();
     }
})


//Logging Out User from all devices they logged in
router.post("/user/logoutAll", auth, async (req, res)=>{
   try{
     req.user.tokens = [];
     await req.user.save();
     res.send();
   }
   catch(e){
     res.status(500).send();
   }
})

//Reading All User Data from database
router.get("/fetchUser/me", auth, async (req, res)=>{
    //Performing without async and await
    // User.find({}).then((users)=>{
    //     res.send(users);
    // }).catch((e)=>{
    //     res.status(500).send();
    // })

    //Performing using async and await
   res.send(req.user);
})


//Updating User Data in Database using async and await
router.patch("/updateUser/me", auth ,async (req, res)=>{
    const id = req.user._id;
    const updates= Object.keys(req.body);
    console.log(updates);
    try{
     //const user = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
      
      updates.forEach((update)=>{
         req.user[update] =  req.body[update];
      })
      await req.user.save();
     if(!req.user){
         return res.status(404).send();
     } 
        res.send(req.user);
    }
    catch(e){
       res.status(400).send(e);
    }
})

//Deleting User from Database
router.delete("/deleteUser/me", auth, async (req, res)=>{
    const id = req.user._id
    try{
      const user = await User.findByIdAndDelete(id);
      await Task.deleteMany({owner: user._id});
      if(!user){
          return res.status(404).send();
      }
      res.send(user);   
    }
    catch(e){
      res.status(500).send(e);
    }
 })

 module.exports = router;