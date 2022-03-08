import React from "react";
import Form from "./Form";
import TodoList from "./TodoList";

const URL = "http://localhost:9000/api/todos";

let index = 0;

const getIndex = () => ++index;
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [
        {
          id: getIndex(),
          task: "walk the dog",
          completed: false,
        },
        { id: getIndex(), task: "eat lunch", completed: false },
        { id: getIndex(), task: "work out", completed: false },
      ],
    };
  }
  handleAdd = (task) => {
    const newTodo = { id: getIndex(), task: task, completed: false };
    this.setState({
      ...this.state,
      todos: [...this.state.todos, newTodo],
    });
  };

  handleHide = () => {
    this.setState({
      ...this.state,
      todos: this.state.todos.filter((todo) => {
        return todo.completed === false;
      }),
    });
  };

  handleToggle = (clickedId) => {
    this.setState({
      ...this.state,
      todos: this.state.todos.map((todo) => {
        if (todo.id === clickedId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    });
  };

  render() {
    const { todos } = this.state;
    return (
      <div>
        <h2>To Dos:</h2>
        <TodoList todos={todos} handleToggle={this.handleToggle} />

        <Form handleAdd={this.handleAdd} />
        <button onClick={this.handleHide}>Hide Completed</button>
      </div>
    );
  }
}
