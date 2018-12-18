import React, { Component } from 'react';
import CONSTANTS from "./constants"
//import './App.css';

export default class MyFriends extends Component {

    constructor(props){
        super(props);
        this.state = {
            friendsList: []
        }
        //this.handlePasswordChange = this.handlePasswordChange.bind(this);
        
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
    render() {
        const friendsList = this.state.friendsList.map(function(data, index){
            return(
                <tr key={index}>
                    <td>{data}</td>
                
                </tr>
            )
        })
        return (
            <div className="card">
                <table className="table" id="table_friends_list"> 
                    <thead>
                        <tr>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>{friendsList}</tbody>
                </table>
            </div>
        );
    }
}

