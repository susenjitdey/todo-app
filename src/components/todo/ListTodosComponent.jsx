import React, { Component } from "react";
import TododataService from "../../api/todo/TododataService.js";
import AuthenticationService from "./AuthenticationService.js";
import moment from 'moment'
class ListTodosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      message: null
    };
    this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    this.refreshTodos = this.refreshTodos.bind(this);
    this.updateTodoClicked = this.updateTodoClicked.bind(this);
    this.addTodoClicked = this.addTodoClicked.bind(this);
    
    
  }
  componentDidMount() {
    //Will render the data
    //Nee to pass the name so get it from the Authentication Service

    this.refreshTodos();
  }

  refreshTodos() {
    let username = AuthenticationService.retrieveLoggedInUser()
    TododataService.retrieveAllTodos(username)
      .then(response => {
        //console.log(response)
        this.setState({ todos: response.data });
      })
      .catch();
  }
  deleteTodoClicked(id) {
    let username = AuthenticationService.retrieveLoggedInUser()
    //let username = AuthenticationService.retrieveLoggedInUser;
    TododataService.deleteTodosById(username, id).then(response => {
      this.setState({ message: `Delete of ${id} Successful!` });
      this.refreshTodos();
    });
  }

  updateTodoClicked(id) {

    //console.log("hello" +id)

    this.props.history.push(`/todos/${id}`);
    //this.refreshTodos();
    ///todos/${id}
    // let username = AuthenticationService.retrieveLoggedInUser();
    // TododataService.deleteTodosById(username, id).then(response => {
    //   this.setState({ message: `Delete of ${id} Successful!` });
    //   this.refreshTodos();
    // });
  }

  addTodoClicked(){
    
    this.props.history.push(`/todos/-1`);
    //console.log("Add clicked")

  }

  render() {
    return (
      <div>
        <h1>List Todos</h1>
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Is Completed</th>
                <th>Target Date</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map(todo => (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.updateTodoClicked(todo.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.deleteTodoClicked(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <button className="btn btn-success" onClick= {this.addTodoClicked}>Add</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListTodosComponent;
