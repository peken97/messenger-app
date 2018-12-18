const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require("./models/model_login");
const Message = require("./models/model_message");
const Group = require("./models/model_group");

mongoose.connect("mongodb://pkenic:DJANI123@ds135704.mlab.com:35704/messenger")

const db = mongoose.connection;

const app = express();

const port = 3001;

function userExists(){
   
}

app.use(cors());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.json({value: "Hello"});
})
app.post("/login", function(req, res){
    console.log(req.body.username);
    
    User.find({username: req.body.username}).lean().then(function(result){
        console.log(result);
        try{
            var account = result[0];
            if(account.username == req.body.username && account.password == req.body.password){
                res.json({
                    response: true
                })
                return;
            }
            res.json({
                response: false
            })
            return;
        }
        catch(e){
            console.log(e);
            res.json({
                response: false
            })
        }
    }).catch(err => console.log(err));
        
    
})

app.post("/register", function(req, res){
    console.log("Trying to register")
    console.log(req.body);
    

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    })

    User.find({username: req.body.username}).then(function(result){
        console.log(result);
        if(result.length != 0){
            res.json({response: false})
            return;
        }
        else{
            user.save().then(response => {
                console.log(response);
                res.json({response: true})
            }).catch(e => {
                console.log(e.message);
                res.json({response: false})
            });
            
            return;
        }
    }).catch(err => console.log(err));
    
    
    
    
})

app.post("/search_friend", function(req, res){
    
    console.log(req.body);
    var data = {
        username: req.body.username
    }
    User.findOne(data).then(function(result){
        console.log(result);
        res.json(result)
    }).catch(err => console.log(err));
})

app.post("/add_friend", function(req, res){
    console.log(req.body);
    User.findOne({username: req.body.username}).then(response => {
        console.log(response)
        var friendsList = response.friends
        console.log(friendsList)
        if(friendsList.indexOf(req.body.friend_username) != -1){
            res.json({response: false})
            return;
        }
        friendsList.push(req.body.friend_username)
        User.update({username: req.body.username}, {friends: friendsList}).then(response => {
            
            res.json({response: true})
        }).catch(e => {
            console.log(e.message)
            res.json({response: false})
        })
    }).catch(e => {
        console.log(e.message);
        res.json({response: false})
    })
    
})

app.post("/get_friends", function(req, res){
    console.log(req.body)
    
    User.findOne({username: req.body.username}).then( response => {
        console.log(response)
        res.json(response.friends)
    }).catch(e => {
        console.log(e.message)
        res.json([])
    })
})
app.post("/make_group", function(req, res){

    
    var group = new Group({
        _id: new mongoose.Types.ObjectId(),
        group_name: req.body.group_name,
        messages: req.body.messages,
        users: req.body.users,
        admins: req.body.admins,
    })
    
    group.save().then(response=>{
        console.log("Saved");
        console.log(response);
        res.json({response: true})
    })

   

})
app.post("/get_groups", function(req, res){
    console.log("Get groups")
    console.log(req.body)
    let searchCriteria = {
        username: req.body.username
    }
    
    Group.find({users: searchCriteria}).then(response =>
        {
            console.log("Response:")
            console.log(response)
            res.json(response);
        }).catch(e => console.log(e.message))
    

    return;
    Group.find().then( response => {
        console.log(response)
        res.json(response.friends)
    }).catch(e => {
        console.log(e.message)
        res.json([])
    })
})
app.post("/send_message", function(req, res){
    console.log(req.body)

    Group.findById({_id: req.body.group_id}).then(response=>{

        let messages = response.messages
        messages.push(req.body)
        Group.findOneAndUpdate({_id: req.body.group_id}, {messages: messages}).then(response => res.json({response: true}))
        
    }).catch(e=> {
        console.log(e.message)
        res.json({response: false})
    })
})

app.post("get_messages", function(req, res){
    console.log(req.body)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))