import React, { Component } from 'react';
import Header from './components/header';
import GroupList from './components/group_list';
import ChatRoom from './components/chatroom';

import './App.css';

export default class Messenger extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            openChatRoomData: undefined
            
        }

        this.onHandleOpenGroup = this.onHandleOpenGroup.bind(this);
        this.openActiveChatroom = this.openActiveChatroom.bind(this);
    }
    componentWillMount(){
        if(sessionStorage.getItem("username") == null){
            this.props.history.push("/login");
        }
        /*this.setState({
            openChatRoomData: {
                messages: [],
                group_name: "",
                users: [],
                _id: 0
            }
        })*/
    }
    onHandleOpenGroup(data){
        console.log(data);
        this.setState({
            openChatRoomData: data
        })
        
    }
    openActiveChatroom(data){

    }
    render() {
        if (this.state.openChatRoomData != undefined){
            return (
                <div className="w-100 h-100" id="messenger">
                <Header history={this.props.history}/>
                    <div className="d-flex flex-row h-75">
                        <GroupList handleOpenGroup={this.onHandleOpenGroup} />
                        <ChatRoom key={this.state.openChatRoomData._id} data={this.state.openChatRoomData}/>
                        
                    </div>
                </div>
            );
        }
        
        return (
            <div className="w-100 h-100" id="messenger">
            <Header history={this.props.history}/>
                <div className="d-flex flex-row h-75">
                    <GroupList handleOpenGroup={this.onHandleOpenGroup} />
                    <ChatRoom  data={this.state.openChatRoomData}/>
                    
                </div>
            </div>
        )
            
    }
}

