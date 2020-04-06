import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { func } from "prop-types";
import HelloWorldService from "../../api/todo/HelloWorldService.js";

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
    this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
    this.handleError = this.handleError.bind(this);
    
    this.state = {
      welcomeMessage: ""
    };
  }

  render() {
    return (
      <>
        <div>
          <h1>Welcome!</h1>
          <div className="container">
            {this.props.match.params.name}. You can manage your todos{" "}
            <Link to="/todos">here</Link>.
          </div>

          <div className="container">
            Click here to get a customized welcome message.
            <button
              onClick={this.retrieveWelcomeMessage}
              className="btn btn-success"
            >
              Get Welcome Message
            </button>
          </div>

          <div className="container">{this.state.welcomeMessage}</div>
        </div>
      </>
    );
  }
  retrieveWelcomeMessage() {
    // HelloWorldService.executehelloWorldService().then(response =>
    //     this.handleSuccessfulResponse(response)

    // HelloWorldService.executehelloWorldBeanService().then(response =>
    //     this.handleSuccessfulResponse(response)

    HelloWorldService.executehelloWorldPathVariableService(
      this.props.match.params.name
    ).then(response => this.handleSuccessfulResponse(response))
    .catch(error => this.handleError(error))
  }

  handleSuccessfulResponse(response) {
    console.log("response.data" + response.data.message);
    this.setState({ welcomeMessage: response.data.message });
  }

  handleError(error) {
    console.log("error.data" + error.response);
    let errorMessage = '';
    if(errorMessage)
      errorMessage += error.message 
      
    if(error.response && error.response.data)  {
      errorMessage += error.response.data.message
    }

    this.setState({ welcomeMessage:  errorMessage})
  }
}

export default WelcomeComponent;
