import React, { Component } from 'react';
import CONSTANTS from "./constants";

//import './App.css';

export default class FormLogin extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleLoginAttempt = this.handleLoginAttempt.bind(this);
        this.attemptLogin = this.attemptLogin.bind(this);
    }
    handleUsernameChange(e){
        this.setState({
            username: e.target.value
        })
    }
    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        })
    }
    handleLoginSuccess(){
        sessionStorage.setItem("username", this.state.username);
        this.props.history.push("/home");
    }
    attemptLogin(loginInformation){
        console.log(loginInformation);
        fetch(CONSTANTS.ATTEMPT_LOGIN, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(loginInformation)
        })
        .then(res => res.json())
        .then(res => {
            
            if(res.response == true){
                console.log(res);
                this.handleLoginSuccess();
            }
            else{
                alert("Login information is wrong!")
            }
            return;
        })
        .catch((e) => console.log("Error:" + e.message))
        
    }
    handleLoginAttempt(e){
        console.log("Username: " + this.state.username)
        console.log("Password: " + this.state.password)
        
        let username = this.state.username;
        let password = this.state.password;
        let loginInformation = {
            username: username,
            password: password
        }
        console.log(this.props.history)
        this.attemptLogin(loginInformation)
            
        
        
    }
    render() {
        return (
            <form className="card p-5">
                <h5>Login</h5>
                <div className="form-group">
                    <label>Username</label>
                    <input className="form-control" type="text" placeholder="Enter Username" onChange={this.handleUsernameChange} value={this.state.username}></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input className="form-control" type="password" placeholder="Enter Password" onChange={this.handlePasswordChange} value={this.state.password}></input>
                </div>
                <div className="form-group">
                    
                    <button type="button" onClick={this.handleLoginAttempt} className="btn btn-primary">Login</button>
                </div>
            </form>
        );
    }
}

