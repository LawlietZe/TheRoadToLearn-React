//"I'm Rick I'm cool ! STOP LOOKING ME  B I T C H !"

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const DEFAULT_HPP = '20';
const PARAM_HPP = 'hitsPerPage=';
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
    this.onSearchSubmit = this.onSearchSubmit.bind(this);    
  }

  setSearchTopStories(result) {
    const { hits, page} = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updateHit = [...oldHits, ...hits]
    this.setState({ result: { hits: updateHit, page} });
  }
  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP }${DEFAULT_HPP }`)      
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
  onSearchSubmit(event){
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }
  render() {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0; 
    if (!result) { return null; }
    return (
      <div className="App">
        <div className="page">
          <div className="interactions">
            <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
              Search: 
            </Search>
          </div>
          {
            result
              &&
              <Table
                list={result.hits}
                onDismiss={this.onDismiss}
              />
          }
          <div className="interactions">
            <Button onClick = {()=>{this.fetchSearchTopStories(searchTerm, page+1 )}}>
              More
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
//定义 search组件
class Search extends Component {
  render(){
    const { value, onChange, children, onSubmit } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input 
          type = "text"
          value = {value}
          onChange = {onChange}
        />
        <button type="submit">{children}</button>
      </form>
    );
  }
}
//定义 table组件
class Table extends Component{
  render(){
    const { list, onDismiss} = this.props;
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
        {list.map(item => 
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
