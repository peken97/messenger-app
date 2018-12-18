import React, { Component } from 'react';

//import './App.css';

export default class ChatRoomMessage extends Component {

    constructor(props){
        super(props);
        
        
    }
    
    render() {
        var username = sessionStorage.getItem("username")
        console.log(this.props.message.sender)
        if(this.props.message.sender == username){
            return (
                <div>
                    <div className="chatroom_message_me">
                        {this.props.message.text} 
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="chatroom_message">
                    <label>{this.props.message.sender}:</label>
                    <div className="chatroom_message_friend ml-2">
                        {this.props.message.text}
                    </div>
                </div>
            );
        }
        
    }
}

