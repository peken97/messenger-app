import React, { Component } from 'react';

//import './App.css';

export default class GroupBox extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            
        }
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        //const data = this.props.data;
        
        this.props.handleOpenGroup(this.props.data);
    }
    
    render() {
        return (
            <div className="p-2 group_box d-flex flex-row" onClick={this.handleClick}>
                <h4>{this.props.data.group_name}</h4>
                
            </div>
        );
    }
}

