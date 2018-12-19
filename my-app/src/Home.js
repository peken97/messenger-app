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
    componentWillMount(){
        
        if(sessionStorage.getItem("username") == null){
            this.props.history.push("/login");
        }
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

