import React, { Component } from 'react';
import GroupBox from"./group_box";
import CONSTANTS from "./constants"
import ModalCreateGroup from "./modal_create_group"
//import './App.css';

export default class GroupList extends Component {

    constructor(props){
        super(props);
        this.state = {
            groups: [],
            showCreateGroupModal: false,
        }
        
        this.onHandleOpenGroup = this.onHandleOpenGroup.bind(this);
        this.openCreateGroupModal = this.openCreateGroupModal.bind(this);
        this.closeCreateGroupModal = this.closeCreateGroupModal.bind(this);
        this.createGroup = this.createGroup.bind(this);
    }
    componentDidMount(){
        
        var data = {
            username: sessionStorage.getItem("username")
        }
        fetch(CONSTANTS.GET_GROUPS,{
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res =>
            {
                return res.json()
            }).then(res => {
                console.log(res)

                this.setState({
                    groups: res
                })
            }).catch(e => {
                alert("Error Loading Groups!")
                console.log(e.message)
            })
    }
    onHandleOpenGroup(data){
        console.log(data);
        this.props.handleOpenGroup(data);
    }
    openCreateGroupModal(){
        
        this.setState({
            showCreateGroupModal: true
        })
    }
    closeCreateGroupModal(){
        this.setState({
            showCreateGroupModal: false
        })
    }
    createGroup(group){
        console.log(group);
        var groups = this.state.groups;
        groups.push(group)
        this.setState({
            groups: groups
        })
        this.closeCreateGroupModal();
    }
    render() {
        const onHandleOpenGroup = this.onHandleOpenGroup;
       
        const groupList = this.state.groups.map(function(data, index){
            return (
                <div className="" key={index}>
                    <GroupBox data={data} handleOpenGroup={onHandleOpenGroup}/>
                </div>
            )
        });
        
        
        if(this.state.showCreateGroupModal == true){
            return (
                <div className="d-flex flex-column card" id="group_list">
                    <div ><h5>Create Group</h5></div>
                    {groupList}
                    <ModalCreateGroup closeCreateGroupModal={this.closeCreateGroupModal} createGroup={this.createGroup}/>
                </div>
            );
        }
        else{
            return (
                <div className="d-flex flex-column card" id="group_list">
                    <div ><h5 onClick={this.openCreateGroupModal}>Create Group</h5></div>
                    {groupList}
                </div>
            );
        }
        
    }
}

