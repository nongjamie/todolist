import React, { Component } from 'react';
import './App.css';
import Header from './containers/Header';
import Content from './containers/Content';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      // todos: [{text: 'test'}, {test: 'test'}]
      todos: JSON.parse(localStorage.getItem('todos')) || []
    }
  }
  onInputText = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  addTodo = () => {
    const todo = {
      text: this.state.text
    }
    const todos = [...this.state.todos, todo];
    this.setState({
      todos: [...this.state.todos, todo],
      text: ''
    })
    localStorage.setItem('todos' , JSON.stringify(todos) );
  }
  removeTodo = (index) => () => {
    this.setState({
      todos: [
        ...this.state.todos.slice(0, index),
        ...this.state.todos.slice(index + 1),
      ]
    })
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Content 
          onInputText={this.onInputText}
          text={this.state.text}
          addTodo={this.addTodo}
        />
        {
          this.state.todos.map((todo, index) => (
            <div className="todo-wrapper">
              <div className="todo">{todo.text}</div>
                <button 
                className="remove-btn"
                onClick={this.removeTodo(index)}
                >
                x
                </button>
            </div>
          ))
        }
      </div>
    );
  }
}

export default App;
