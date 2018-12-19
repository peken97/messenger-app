import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import AddFriends from "./components/add_friends"
import MyFriends from "./components/my_friends"
import Header from "./components/header";

var CONST_FRIENDS = {
    ADD_FRIENDS: 0,
    MY_FRIENDS: 1,
}
export default class Friends extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: "",
            app_select: CONST_FRIENDS.ADD_FRIENDS,
                        
        }

        this.onHandleOpenGroup = this.onHandleOpenGroup.bind(this);
        this.openMyFriends = this.openMyFriends.bind(this);
        this.openAddFriends = this.openAddFriends.bind(this);
    }
    componentWillMount(){
        if(sessionStorage.getItem("username") == null){
            this.props.history.push("/login");
        }
    }
    onHandleOpenGroup(data){
        console.log(data);
        
    }
    openMyFriends(){
        this.setState({app_select: CONST_FRIENDS.MY_FRIENDS})
    }
    openAddFriends(){
        this.setState({app_select: CONST_FRIENDS.ADD_FRIENDS})
    }
    
    render() {
        if(this.state.app_select ==  CONST_FRIENDS.ADD_FRIENDS){
            return(
                <div className="h-50">
                    <Header history={this.props.history}/>
                    <div className="card tab tab-active p-2">
                        Add Friends
                    </div>
                    <div className="card tab p-2" onClick={this.openMyFriends}>
                        My Friends
                    </div>
                    <AddFriends/>
                </div>
            )
        }
        else if(this.state.app_select ==  CONST_FRIENDS.MY_FRIENDS){
            return(
                <div className="h-50">
                    <Header history={this.props.history}/>
                    <div className="card tab p-2" onClick={this.openAddFriends}>
                        Add Friends
                    </div>
                    <div className="card tab tab-active p-2">
                        My Friends
                    </div>
                    <MyFriends/>
                </div>
            )
        }
        else{
            return(
                <div>Error</div>
            )
        }
        
        
    }
}

