//"I'm Rick I'm cool ! STOP LOOKING ME  B I T C H !"

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
//定义高阶函数
const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());
//实现了一个app组件声明，可以在项目任何地方实例化instance , <APP />
class App extends Component {
  //render方法返回了该组件返回的元素, 这就是JSX，允许你在js中混入HTML
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);    
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);    
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }
  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }
  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updateList = this.state.result.hits.filter(isNotId);
    this.setState({
      result: {...this.state.result, ...{hits: updateList}}
    });
  }
  onSearchChange = (event) => {
    this.setState({searchTerm: event.target.value});
  }
  render() {
    const { searchTerm, result } = this.state;
    if (!result) { return null; }
    return (
      <div className="App">
        <div className="page">
          <div className="interactions">
            <Search value={searchTerm} onChange={ this.onSearchChange }>
              Search: 
            </Search>
          </div>
          {
            result
              &&
              <Table
                list={result.hits}
                pattern={searchTerm}
                onDismiss={this.onDismiss}
              />
          }

        </div>
      </div>
    );
  }
}
//定义 search组件
class Search extends Component {
  render(){
    const { value, onChange, children } = this.props;
    return (
      <form>
        {children}
        <input 
          type = "text"
          value = {value}
          onChange = {onChange}
        />
      </form>
    );
  }
}
//定义 table组件
class Table extends Component{
  render(){
    const { list, pattern, onDismiss} = this.props;
    const largeColumn = {
      width: '40%',
    };
    const midColumn = {
      width: '30%',
    };
    const smallColumn = {
      width: '10%',
    };
    return(
      <div className="table">
        {list.filter(isSearched(pattern)).map(item => 
          <div key={item.objectID} className="table-row">
            <span style={{ largeColumn }} ><a href={item.url}>{item.title}</a></span>
            <span style={{ midColumn }} >{item.author}</span>
            <span style={{ smallColumn }} >{item.num_comments}</span>
            <span style={{ smallColumn }} >{item.points}</span>
            <span style={{ smallColumn }}>
              <Button className="button-inline" onClick={()=>{
                onDismiss(item.objectID)
              }}
              >
              Dismiss
              </Button>
            </span>
          </div>
          )}
      </div>    
    )
  }
}

//定义 table组件
class Button extends Component {
  render() {
    const { onClick, className, children } = this.props;
    return (
      <button
        onClick = { onClick }
        className = { className }
        type = "button"
      >
      { children }
      </button>
    )
  }
}


export default App;
