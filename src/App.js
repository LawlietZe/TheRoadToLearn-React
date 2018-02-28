import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//实现了一个app组件声明，可以在项目任何地方实例化instance , <APP />
class App extends Component {
  //render方法返回了该组件返回的元素, 这就是JSX，允许你在js中混入HTML
  render() {
    let myWords = "Welcome to React WHY !";
    const why = {
      name: "wang",
      age:  "24"
    }
    return (
      <div className="App">
        <h2>{myWords}</h2>
        <span>Hello: {why.name} ! </span>
        <span>this is your age :{why.age} ! </span>
      </div>
    );
  }
}

export default App;
