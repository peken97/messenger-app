import React, { Component } from 'react';
import ChatRoomMessage from './chatroom_message';
import CONSTANTS from "./constants"
import ChatroomInfo from "./chatroom_info";
//import './App.css';

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
    }

    sendMessage(){
        if(this.state.currentMessage == ""){
            return;
        }
        console.log(this.state.data);
        console.log(this.state.currentMessage)
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
        console.log(data);
        fetch(CONSTANTS.SEND_MESSAGE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(dataToPush)
        }).then(res=>{
            return res.json()
        }).then(res => {
            console.log(res)
            this.setState({
                currentMessage: ""
            })
        })

    }
    componentWillMount(){
        
        console.log(this.props.data);
        
        this.setState({
            data: this.props.data
        })
        
        
    }
    componentDidMount(){
        
        this.scrollToBottom();
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
        console.log(this.state.data)
        if(this.state.data == undefined){
            alert()
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

