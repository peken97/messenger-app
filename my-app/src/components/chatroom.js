import React, { Component } from 'react';
import ChatRoomMessage from './chatroom_message';
import CONSTANTS from "./constants"
import ChatroomInfo from "./chatroom_info";
//import './App.css';
import io from "socket.io-client";
var socket = io("localhost:80")
socket = io("localhost:80")
function generateMessage(data){
    return {
        text: data.text,
        sender: data.sender,
    }
}

export default class ChatRoom extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            currentMessage: "",
            data: {
                messages: [],
                
            }
        }

        

        this.handleMessage = this.handleMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getMessage = this.getMessage.bind(this);
    }

    sendMessage(){
        console.log(this.state.data)
        if(this.state.currentMessage == ""){
            return;
        }
        
        let messageText = this.state.currentMessage;
        let data = this.state.data;
        let dataToPush = {
            text: messageText,
            sender: sessionStorage.getItem("username"),
            group_name: data.group_name,
            group_id: data._id,
        }
        data.messages.push(dataToPush)
        this.setState({
            data: data
        })
        
        fetch(CONSTANTS.SEND_MESSAGE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(dataToPush)
        }).then(res=>{
            return res.json()
        }).then(res => {
            let dataToSocket = {
                message: dataToPush,
                stateDetails: this.state.data
            }
            socket.emit('message', dataToPush)
            this.setState({
                currentMessage: ""
            })
            
        })

    }
    componentWillMount(){
        this.setState({
            data: this.props.data
        })
    }
    getMessage(){
        console.log(this.state.data)
    }
    componentWillUnmount(){
        socket.off('message')
    }
    componentDidMount(){
        this.scrollToBottom();  

        
        console.log(this.state.data)
        socket.on('message', socketData => { 
            console.log("Message Received");
            console.log(this.state.data)
            
            console.log(socketData)
            let data = this.state.data
            
           // data.messages.push(socketData.body)
           /* this.setState({
                data: data
            })*/
            //let messages = this.state.data.messages;
            //messages.push(message.)
        })
    }
    componentDidUpdate(){
        
        this.scrollToBottom();
        
    }
    handleMessage(e){
        this.setState({
            currentMessage: e.target.value
        })
    }
    scrollToBottom() {
        
        this.el.scrollIntoView({ behavior: 'smooth' });
      }
    render() {
        
        if(this.state.data == undefined){
            
            return (
                <div className="card w-100 d-flex flex-row h-100">
                    <div className="card w-100 d-flex flex-column h-100 chatroom">
                        <h5 ref={el => { this.el = el; }}>Please Select a room</h5>
                    </div>
                    <ChatroomInfo data={this.state.data}/>
                </div>
            );
        }
        var username = sessionStorage.getItem("username")
        const messages = this.state.data.messages.map(function(data, index){
            let message = generateMessage(data);
            if(message.sender == username){
                return (
                    <div key={index} className="m-2 d-flex flex-row-reverse">
                        <ChatRoomMessage message={message} /> <br></br>
                    </div>
                    )
            }
            else{
                return (
                    <div key={index} className="m-2">
                        <ChatRoomMessage message={message} /> <br></br>
                    </div>
                    )
            }
            
        })
        
        return (
            <div className="card w-100 d-flex flex-row h-100">
                <div className="card w-100 d-flex flex-column h-100 chatroom">
                    
                    <div className="message_area h-100" >
                        <ul className="h-100" >
                            {messages}
                            <div ref={el => { this.el = el; }}></div>
                        </ul>
                    </div>
                    <div className="d-flex flex-row">
                        <textarea id="textarea_send_message" className="w-100" onChange={this.handleMessage} value={this.state.currentMessage}></textarea>
                        <button className="btn btn-primary" onClick={this.sendMessage}>Send</button>
                    </div>
                </div>
                <ChatroomInfo data={this.state.data}/>
            </div>
        );
    }
}

