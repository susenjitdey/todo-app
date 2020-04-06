import React, { Component } from "react";
//import FirstComponent from "./components/learning-examples/FirstComponent";
//import SecondComponent from "./components/learning-examples/SecondComponent";
//import ThirdComponent from "./components/learning-examples/ThirdComponent";
import TodoApp from "./components/todo/TodoApp";
//import Counter from "./components/counter/Counter";
import "./App.css";
import "./bootstrap.css";

// function App() {
//   return (
//     <div className="App">
//       My Hello World
//       <ThirdComponent/>
//     </div>
//   );
// }

class App extends Component {
  // This  <Counter/>  object will come one on UI as default property is set in the Counetr.jsx file
  render() {
    return (
      <div className="App">
        {/* <Counter/> */}
        <TodoApp/>
      </div>
    );
  }
}

/*class LearningComponents extends Component {
  render() {
    return (
      <div className="learningComponents">
        My Hello World
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />
      </div>
    );
  }
}*/

export default App;
