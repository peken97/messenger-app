import React, { Component } from 'react';

import './App.css';

export default class Settings extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: "",
            currentPage: "groups"

            
        }

        this.onHandleOpenGroup = this.onHandleOpenGroup.bind(this);
    }

    onHandleOpenGroup(data){
        console.log(data);
        
    }
    
    render() {
        return(
            <div>
                
            </div>
        )
        
    }
}

