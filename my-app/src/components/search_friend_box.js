import React, { Component } from 'react';
import CONSTANTS from "./constants"
//import './App.css';

export default class SearchFriendBox extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
        }
        
        this.addFriend = this.addFriend.bind(this)
    }
    addFriend(){

        var data = {
            friend_username: this.props.username,
            username: sessionStorage.getItem("username")
        }
        fetch(CONSTANTS.ADD_FRIEND, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.response == true){
                alert("Successfully added friend!")
                
            }
            else{
                alert("Failed to add friend!")
            }
            return;
        })
        .catch((e) => console.log("Error:" + e.message))
    }
    
        
        
    render() {
        console.log(this.props.data)
        if(this.props.data.added == false){
            return (
                <div className="d-flex flex-row card p-4 friend_box">
                    <div>{this.props.data.data.username}</div>
                    <i style={{backgroundColor: "#8e56ff", borderRadius: "10px"}} className="material-icons ml-2" onClick={this.addFriend}>add</i>
                </div>
            );
        }
        return (
            <div className="d-flex flex-row card p-4 friend_box">
                <div>{this.props.data.data.username}</div>
                <i style={{backgroundColor: "#99ffa4", borderRadius: "10px"}} className="material-icons ml-2">check</i>
            </div>
        );
        
    }
}

