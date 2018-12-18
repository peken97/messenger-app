import React, { Component } from 'react';

//import './App.css';

export default class ChatroomInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
        }
        //this.handlePasswordChange = this.handlePasswordChange.bind(this);
        
    }
    
    render() {
        if(this.props.data == undefined){
            return(
                <div></div>
            )
        }
        console.log(this.props.data.admins)
        const users = this.props.data.users.map(function(data, index){
            
            return(
                <div key={index}>{data.username}</div>
            )
        })
        /*const admins = this.props.data.admins.map(function(data, index){
            
            return(
                <div key={index}>{data.username}</div>
            )
        })*/
        return (
            <div className="card"> 
                <div className="d-flex flex-column">
                    <h3 className="d-flex flex-row">Chatroom Information</h3>
                    <div className="d-flex flex-row">
                        <label>Name:</label>
                        <strong className="ml-1">{this.props.data.group_name}</strong>
                    </div>
                    <div className="d-flex flex-row">
                        <label>Members:</label>
                        <ul>
                            {users}
                        </ul>
                    </div>
                    <div className="d-flex flex-row">
                        <label>Users with Admin Permission:</label>
                        <ul>
                            
                        </ul>
                    </div>
                    <div className="d-flex flex-row">
                        <h5>Actions</h5>
                        
                    </div>
                </div>
            </div>
        );
    }
}

