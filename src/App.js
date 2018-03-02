import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  }, {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];
let speaker = "I'm Rick I'm cool !"
//实现了一个app组件声明，可以在项目任何地方实例化instance , <APP />
class App extends Component {
  //render方法返回了该组件返回的元素, 这就是JSX，允许你在js中混入HTML
  constructor(props) {
    super(props);
    this.state = {
      list: list,
      speaker: speaker,
    };
  }
  render() {
    return (
      <div className="App">
        <p>{this.state.speaker}</p>
        {this.state.list.map(item => 
          <div key={item.objectID}>
            <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </div>
          )}
      </div>
    );
  }
}

export default App;
