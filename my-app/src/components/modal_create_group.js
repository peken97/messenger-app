import React, { Component } from 'react';
import CONSTANTS from "./constants"
//import './App.css';

export default class ModalCreateGroup extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            friendsList: [],
            group_name: "",
        }
        this.closeModal = this.closeModal.bind(this);
        this.createGroup = this.createGroup.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
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
                var friendsList = []
                for(let i = 0; i < res.length; i++){
                    let data = {
                        username: res[i],
                        toggled: false,
                    }
                    friendsList.push(data)
                }

                this.setState({
                    friendsList: friendsList
                })
            }).catch(e => {
                alert("Error Loading Friends List!")
                console.log(e.message)
            })
    }
    closeModal(){
        this.props.closeCreateGroupModal();
    }
    createGroup(){
        var friendsList = this.state.friendsList
        var selectedFriends = []
        for(let i = 0; i < friendsList.length; i++){
            if(friendsList[i].toggled == true){
                selectedFriends.push({
                    username: friendsList[i].username,
                })
            }
        }
        var admins = []
        admins.push(sessionStorage.getItem("username"))
        selectedFriends.push({
            username: sessionStorage.getItem("username"),
        })
        var group = {
            group_name: this.state.group_name,
            messages: [],
            users: selectedFriends,
            admins: admins
        }
        fetch(CONSTANTS.MAKE_GROUP, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(group)
        }).then(res => res.json()).then(res => {
            console.log(res);
            if(res.response == true){
                this.props.createGroup(group);
            }
            
        }).catch(e => {
            console.log(e.message)
        })
        
    }
    handleCheckboxChange(e){
        var friendsList = this.state.friendsList;
        
        for(let i = 0; i < friendsList.length; i++){
            if(friendsList[i].username == e.target.name){
                friendsList[i].toggled = !friendsList[i].toggled;
                this.setState({
                    friendsList: friendsList
                })
                
                return;
            }
        }
    }
    handleGroupNameChange(e){
        this.setState({
            group_name: e.target.value
        })
    }
    render() {
        const handleCheckboxChange = this.handleCheckboxChange
        const friendList = this.state.friendsList.map(function(data, index){
            return(
                <div key={index}>
                    {data.username}
                    <input className="ml-2" type="checkbox" name={data.username} onChange={handleCheckboxChange} value={data.toggled}/>
                </div>
            )
        })
        return (
            <div className="modal" >
                <div className="modal-content">
                    <form className="card p-5 ">
                        <h5>Create Group</h5>
                        <div className="form-inline">
                            <label>Enter Group Name</label>
                            <input className="form-control ml-2" type="text" placeholder="Enter Group Name" onChange={this.handleGroupNameChange} value={this.state.group_name}></input>
                        </div>
                        <div className="form-inline mt-2">
                            <label>Search Friend</label>
                            <input className="form-control ml-2" type="text" placeholder="Enter Username" value={this.state.username}></input>
                        </div>
                        
                        <div className="card mt-3" id="create_group_search_results">
                            {friendList}
                        </div>
                        <div className="form-group mt-3">
                            <button type="button" className="btn btn-primary mr-2" onClick={this.createGroup}>Create</button>
                            <button type="button" className="btn btn-light" onClick={this.closeModal}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

