import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";


class LoginComponent extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: "in28minutes",
        password: "",
        hasLoginFailed: false,
        showSuccessMessage: false
      };
      // this.handelUsernameChange = this.handelUsernameChange.bind(this)
      // this.handelPasswordChange = this.handelPasswordChange.bind(this)
  
      this.handelChange = this.handelChange.bind(this);
      this.loggedin = this.loggedin.bind(this);
    }
  
    handelChange(event) {
      //console.log(event.target.name);
      //console.log(this.state);
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
    loggedin() {
      if (this.state.username === "in28minutes" && this.state.password === "dummy") {
        AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);
        this.props.history.push(`/welcome/${this.state.username}`); // Get the details on the history package on google
        this.setState({ showSuccessMessage: true });
        this.setState({ hasLoginFailed: false });
        console.log("Successful");
      } else {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
        console.log("Failed");
      }
    }
    // handelPasswordChange(event){
    //     console.log(event.target.value);
    //     this.setState(
    //         {
    //             password : event.target.value
    //         }
    //     )
    // }
  
    render() {
      return (
        
        <div>
          <h1>Login</h1>
          <div className="container">
          {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} /> */}
          {this.state.hasLoginFailed && <div className="alert alert-warning"> Invalid Credentials </div>}
          {this.state.showSuccessMessage && <div> Login Successful </div>}
          {/* <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/> */}
          UserName :{" "}
          <input
            type="test"
            name="username"
            value={this.state.username}
            onChange={this.handelChange}
          ></input>
          Password :{" "}
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handelChange}
          ></input>
          <button className="btn btn-success" onClick={this.loggedin}>Login</button>
          </div>
        </div>
      );
    }
  }

  export default LoginComponent