import React, { Component } from "react";
import "./Counter.css";

class Counter extends Component {
  constructor() {
    super(); //Cannot use this, unless super is defined
    this.state = {
      counter: 0 //Tis is a javascript object
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }
  render() {
    //Below I am passing the referance of the increment method in the child component<CounterButton>
    //Next I need to access it in the increment method of the child component.
    return (
      <div className="counter">
        <CounterButton incrementMethod={this.increment}  decrementMethod={this.decrement} />
        <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement} />
        <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement} />
        <span className="count">{this.state.counter}</span>
        <div><button className="reset" onClick={this.reset}>Reset</button></div>
      </div>
    );
  }

  increment(by) {
    //console.log(`This is from parent : ${by}`)
    this.setState(
        (prevState) => {
            return {counter: prevState.counter + by}
        }
    );
  }

  decrement(by) {
    //console.log(`This is from parent : ${by}`)
    this.setState(
        (prevState) => {
            return {counter: prevState.counter - by}
        }
    );
  }

  reset(){
    this.setState({counter: 0});
    }
}

class CounterButton extends Component {
  // Define the initial state in a constructor (best practices)
  //state => counter 0

  constructor() {
    super(); //Cannot use this, unless super is defined
    this.state = {
      counter: 0 //Tis is a javascript object
    };

    // this.increment = this.increment.bind(this); // We need to bind the "this" to the increment function
    // // to able to change the state.
    // this.decrement = this.decrement.bind(this);
  }
  render() {
    return (
      <div className="thirdCcounteromponent">
        <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
        <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
      </div>
    );
  }

  //Note: increment is not a global method now, and hence referred as this. and keyword
  //function is removed function increment() --> increment

//   increment() {
//     //Update state  -  counter ++
//     //Here we cannot directly change the state by using ++
//     //Rather we use setState mentod of React.

//     this.setState(
//       //Agin I need to pass an object so need to have curly braces
//       {
//         counter: this.state.counter + this.props.by
//       }
//     );
//     this.props.incrementMethod(this.props.by);
//   }

//   decrement() {
//     //Update state  -  counter ++
//     //Here we cannot directly change the state by using ++
//     //Rather we use setState mentod of React.

//     this.setState(
//       //Agin I need to pass an object so need to have curly braces
//       {
//         counter: this.state.counter - this.props.by
//       }
//     );
    
//     this.props.decrementMethod(this.props.by);
//   }
}

CounterButton.defaultProps = {
  by: 1
};

export default Counter;
