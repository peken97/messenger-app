import React, { Component } from 'react';
import Header from "./components/header";
import './App.css';

export default class Home extends Component {
    
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
                <Header history={this.props.history}/>
            </div>
        )
        
    }
}

