import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';


class HeaderComponent extends Component {
    render() {
      const isUserLoggedIn =  AuthenticationService.isUserLoggedIn();
      console.log("isUserLoggedIn" + isUserLoggedIn)
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
          <div><a href="http://www.in28minutes.com" className="narbar-brand">in28Minutes</a></div>
        <ul className="nav" >
          {isUserLoggedIn && <li className="nav-item">
         
              <Link to="/welcome/in28minutes" className="nav-link">Home</Link>
            
          </li>}
          {isUserLoggedIn && <li className="nav-item">
            
            <Link to="/todos" className="nav-link">Todos</Link>
            
          </li>}
          </ul>
          <ul className="nav navbar-collapse justify-content-end" >
          {!isUserLoggedIn && <li className="nav-item">
            
            <Link to="/login" className="nav-link">Login</Link>
            
          </li>}
          {isUserLoggedIn && <li className="nav-item">
           
            <Link to="/logout" className="nav-link" onClick={AuthenticationService.logout}>Logout</Link>
           
          </li>}
          </ul>
        </nav>
      );
    }
  }

  export default withRouter(HeaderComponent);