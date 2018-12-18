import React, { Component } from 'react';
import FormLogin from "./components/form_login"
import FormRegister from "./components/form_register"
//import Background from "http://www.cuded.com/wp-content/uploads/2014/04/39-Purple-Background.jpg"
//import './App.css';

export default class LoginPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
        }
       
        
    }
    
    render() {
        return (
            <div  className="d-flex justify-content-center" id="login_register_page">
                <div className="d-flex flex-column">
                    
                    <div className="d-flex flex-row " id="login_register_form_group">
                        
                        <div className="mr-4 form_login_register">
                            <FormLogin history={this.props.history}/>
                        </div>
                        <div className="ml-4 form_login_register">
                            <FormRegister/>
                        </div>
                        
                    </div>
                    
                </div> 
            </div>
        );
    }
}

