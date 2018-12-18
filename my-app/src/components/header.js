import React, { Component } from 'react';

//import './App.css';

export default class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            
        }
        this.handleLogout = this.handleLogout.bind(this)
    }
    componentDidMount(){
       this.setState({
        username: sessionStorage.getItem("username"),
       })
    }
    handleLogout(){
        sessionStorage.removeItem("username")
        this.props.history.push("/login")
    }
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            
                <div className="navbar-brand" >Groups</div>
                <div className="collapse navbar-collapse" >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">Home</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/messenger">Messenger</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/friends">Friends</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/settings">Settings</a>
                        </li>
                        
                    </ul>
                    <span className="navbar-text">
                        <div><i className="material-icons">account_box</i>{this.state.username}</div>
                    </span>
                    <span className="navbar-text">
                        <a className="nav-link clickable"  onClick={this.handleLogout}>Logout</a>
                    </span>
                    
                </div>
                
                
                
            </nav>
        );
    }
}

