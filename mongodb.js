//CRUD Operations in MongoDB using node.js
const mongodb = require('mongodb');
const MongoClient  = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
// const id = new ObjectID();
// console.log(id.id);
// console.log(id.toHexString());
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client)=>{
    if(error){
        return console.log("Cannot connect to database!!!");
    }
    console.log("Connected Successfully!!!");
    const db = client.db(databaseName);
    /*
     // <--Code for Inserting Data-->
    //Code for inserting Single Document(row in layman terms) using inertOne
    // db.collection('users').insertOne({
    //     name: 'Karthik',
    //     age: 22
    // }, (error, result)=>{
    //       if(error){
    //           return console.log(error);
    //       }
    //       console.log(result.ops);
    // })

    //Code for inserting many Documents(rows in layman terms) using insertMany
    // db.collection('users').insertMany([
    //     {
    //         name: 'Karthik',
    //         age: 22
    //     },
    //     {
    //         name: 'Tharun',
    //         age: 16
    //     },
    //     {
    //         name: 'Vicky',
    //         age: 19
    //     }
    // ], (error, result)=>{
    //       if(error){
    //           return console.log(error);
    //       }
    //       console.log(result.ops);
    // })
    */

    /* 
     // <--Code for Reading Data-->
    //Reading Single Document(single row) using findOne
    db.collection('tasks').findOne({_id: new ObjectID('5f16779a3a1fe50c3c788cea')}, (error, task)=>{
           if(error){
               return console.log(error);
           }
           console.log(task);
    })
    
    //Reading Multiple Documents(Multiple rows) using find
    db.collection('tasks').find({completed: false}).toArray((error, tasks)=>{
        if(error){
            return console.log(error);
        }
        console.log(tasks);
    });*/
    
    /*
    // <--Code for Updating Data-->

    //Update operation on single document( single row) using updateOne
    // db.collection('users').updateOne({
    //     _id: new ObjectID('5f154f06e9f79c0778a7b30b')
    // },
    // {
    //     $set:{
    //         name: 'Karthik Durai'
    //     }
    // }
    // ).then((result)=>{
    //    console.log(result);
    // }).catch((error)=>{
    //    console.log(error);
    // })

    //Update Operation on multiple documents(multiple rows) using updateMany
    // db.collection('tasks').updateMany({
    //    completed: false
    // },
    // {
    //     $set:{
    //         completed: true,
    //         description: 'Modified to understand update'
    //     }
    // }).then((result)=>{
    //    console.log(result);
    // }).catch((error)=>{
    //    console.log(error);
    // })
    */

    // <--Code for Deleting Data-->
    // Deleting multiple documents(Multiple rows) using deleteMany
    // db.collection('users').deleteMany({
    //     age: 22
    // }).then((result)=>{
    //    console.log(result)
    // }).catch((error)=>{
    //    console.log(error);
    // })

    //Deleting single document(single row) using deleteOne
    db.collection('tasks').deleteOne({
        description: "Modified to understand update"
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })
})