import React, { Component } from 'react';
import CONSTANTS from "./constants"
//import './App.css';

export default class FormRegister extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            confirm_password: "",
            errorMessage: ""
        }
        this.handleRegisterAttempt = this.handleRegisterAttempt.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.registerError = this.registerError.bind(this);
        this.attemptRegister = this.attemptRegister.bind(this);
        this.validateInput = this.validateInput.bind(this);
        
    }
    handleEmailChange(e){
        this.setState({
            email: e.target.value
        })
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
    handleConfirmPasswordChange(e){
        this.setState({
            confirm_password: e.target.value
        })
    }
    registerError(error){
        this.setState({
            errorMessage: error
        })
    }
    validateInput(username, email, password, confirm_password){
        
        if(email == ""){
            this.registerError("Email is blank!");
            return false;
        }
        if(username.length < 5){
            this.registerError("Username must be more than 5 characters!");
            return false;
        }
        if(password.length < 6){
            this.registerError("Passwords must be more than 6 characters!");
            return false;
        }
        if(password != confirm_password){
            this.registerError("Passwords don't match!");
            return false;
        }
    }
    handleRegisterAttempt(){
        let username = this.state.username;
        let password = this.state.password;
        let email = this.state.email;
        let confirm_password = this.state.confirm_password;

        if(this.validateInput(username, email, password, confirm_password) == false){
            return;
        }

        

        let registerInformation = {
            username: username,
            password: password,
            email: email,
            confirm_password: confirm_password,
        }
        
        this.attemptRegister(registerInformation)
    }
    attemptRegister(registerInformation){
        console.log(registerInformation);
        fetch(CONSTANTS.ATTEMPT_REGISTER, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(registerInformation)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.response == true){
                alert("successfully registered!")
                
            }
            else{
                alert("Failed registration!")
            }
            return;
        })
        .catch((e) => console.log("Error:" + e.message))
    }
    render() {
        return (
            <form className="card  p-5">
                <h5>Register</h5>
                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" type="email" placeholder="Enter Email" onChange={this.handleEmailChange} value={this.state.email}></input>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input className="form-control" type="text" placeholder="Enter Username" onChange={this.handleUsernameChange} value={this.state.username}></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input className="form-control" type="password" placeholder="Enter Password" onChange={this.handlePasswordChange} value={this.state.pa2ssword}></input>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input className="form-control" type="password" placeholder="Re-enter Password" onChange={this.handleConfirmPasswordChange} value={this.state.confirm_password}></input>
                </div>
                <div className="form-group">
                    <button type="button" onClick={this.handleRegisterAttempt} className="btn btn-primary">Register</button>
                    <p className="error_message">{this.state.errorMessage}</p>
                </div>
                
            </form>
        );
    }
}

