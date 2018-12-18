import React, { Component } from 'react';
import LoginPage from './LoginPage';
import Home from './Home';
import Messenger from './Messenger';
import Friends from './Friends';
import Settings from './Settings';
import Header from './components/header';
import {BrowserRouter, Route} from 'react-router-dom'
//import './App.css';

class App extends Component {



  constructor(props){
    super(props);
    this.state = {
      currentPage: "home"
    }

    this.handleLoginAttempt = this.handleLoginAttempt.bind(this);
  }


handleLoginAttempt(data){
  console.log(data);
  
}


  render() {
    return(
      <BrowserRouter>
      <div className="h-100">
        
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/messenger' component={Messenger}/>
        <Route path='/home' component={Home}/>
        <Route path='/friends' component={Friends}/>
        
        <Route path='/settings' component={Settings}/>
      </div> 
      </BrowserRouter>
    )
    
  }
}

export default App;
