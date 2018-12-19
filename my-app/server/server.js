const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: '*:*'});

const User = require("./models/model_login");
const Message = require("./models/model_message");
const Group = require("./models/model_group");

mongoose.connect("mongodb://pkenic:DJANI123@ds135704.mlab.com:35704/messenger")

const db = mongoose.connection;
io.set('origins', '*:*');
server.listen(80);

const port = 3001;

function userExists(){
   
}

app.use(cors());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

io.on('connection', function(socket){
    console.log("Someone Connected")
    socket.on('message', body => {
        console.log("Message detected")
        console.log(body)
        socket.broadcast.emit('message', {
            body: body,
            from: socket.id.slice(8)
        })
    })
})


app.get("/", function(req, res){
    res.json({value: "Hello"});
})
app.post("/login", function(req, res){
    
    
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
            console.log(e.message);
            res.json({
                response: false
            })
        }
    }).catch(err => console.log(err));
        
    
})

app.post("/register", function(req, res){
    
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    })

    User.find({username: req.body.username}).then(function(result){
        
        if(result.length != 0){
            res.json({response: false})
            return;
        }
        else{
            user.save().then(response => {
                
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
    
    
    var data = {
        username: req.body.username
    }
    User.findOne(data).then(function(result){
        
        res.json(result)
    }).catch(err => console.log(err));
})

app.post("/add_friend", function(req, res){
    
    User.findOne({username: req.body.username}).then(response => {
        
        var friendsList = response.friends
        
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
        
        res.json({response: true})
    })

   

})
app.post("/get_groups", function(req, res){
    
    let searchCriteria = {
        username: req.body.username
    }
    
    Group.find({users: searchCriteria}).then(response =>
        {
            
            res.json(response);
        }).catch(e => console.log(e.message))
    
})
app.post("/send_message", function(req, res){

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