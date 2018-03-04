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

//定义高阶函数
const isSearched = searchItem => item => 
  item.title.toLowerCase().includes(searchItem.toLowerCase());
//实现了一个app组件声明，可以在项目任何地方实例化instance , <APP />
class App extends Component {
  //render方法返回了该组件返回的元素, 这就是JSX，允许你在js中混入HTML
  constructor(props) {
    super(props);
    this.state = {
      list,
      speaker,
      searchItem: '',
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);    
  }
  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updateList = this.state.list.filter(isNotId);
    this.setState({ list: updateList });
    console.log(this.state.list)
  }
  printThis = () => {
    console.log(this);
    alert("action start");
  }
  onSearchChange = (event) => {
    this.setState({searchItem: event.target.value});
  }
  render() {
    const { searchItem, list } = this.state;
    return (
      <div className="App">
        <form>
          <input value={searchItem} type="text" onChange={ this.onSearchChange }/>
        </form>
        <p>{this.state.speaker}</p>
        {list.filter(isSearched(searchItem)).map(item => 
          <div key={item.objectID}>
            <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={()=>{
                  this.onDismiss(item.objectID)
                }}
                type="button"
              >
              Dismiss
              </button>
            </span>
          </div>
          )}
        <button onClick={this.printThis}>Print This1</button>
        <button onClick={()=>{this.printThis()}}>Print This2</button>
      </div>
    );
  }
}

export default App;
