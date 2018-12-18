import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import CONSTANTS from "./constants";
import SearchFriendBox from "./search_friend_box"
//import './App.css';

export default class AddFriends extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: "",
            searched_friend: {
                data: [],
                added: false
            },
            friendsList: []
        }

        this.searchFriend = this.searchFriend.bind(this);
        this.handleSearchFriendChange = this.handleSearchFriendChange.bind(this);
    }
    componentDidMount(){
        var data = {
            username: sessionStorage.getItem("username")
        }
        fetch(CONSTANTS.GET_FRIENDS,{
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res =>
            {
                console.log(res)
                return res.json()
            }).then(res => {
                console.log(res)
                this.setState({
                    friendsList: res
                })
            }).catch(e => {
                alert("Error Loading Friends List!")
                console.log(e.message)
            })
    }
    searchFriend(){
        var data = {
            username: this.state.username
        }
        
        fetch(CONSTANTS.SEARCH_FRIEND, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            console.log(this.state.friendsList)
            console.log(res.username)
            if(this.state.friendsList.indexOf(res.username) != -1){
                console.log("damn")
                this.setState({
                    searched_friend: {
                        data: res,
                        added: true
                    }
                })
            }
            else{
                this.setState({
                    searched_friend: {
                        data: res,
                        added: false
                    }
                })
            }
            
            return;
        })
        .catch(() => console.log("Error"))
        return false;
    }
    handleSearchFriendChange(e){
        this.setState({
            username: e.target.value
        })
    }
    render() {
         
        if(this.state.searched_friend.data.length == 0){
            return(
                <div className="h-100">
                    <input type="text" placeholder="Search Friends" value={this.state.username} onChange={this.handleSearchFriendChange}/>
                    <button type="button" onClick={this.searchFriend} >Search</button>
                    <div className="d-flex flex-column card" id="friends_results">
                        <h5>Results:</h5>
                        <div className="d-flex flex-row justify-content-center">
                        </div>
                    </div>
                    
                </div>
            )
        }
        return(
            <div className="h-100">
                <input type="text" placeholder="Search Friends" value={this.state.username} onChange={this.handleSearchFriendChange}/>
                <button type="button" onClick={this.searchFriend} >Search</button>
                <div className="d-flex flex-column card" id="friends_results">
                    <h5>Results:</h5>
                    <div className="d-flex flex-row justify-content-center">
                        <SearchFriendBox data={this.state.searched_friend}/>
                    </div>
                </div>
                
            </div>
        )
        
    }
}

