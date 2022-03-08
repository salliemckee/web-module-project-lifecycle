import React from "react";
import Form from "./Form";
import TodoList from "./TodoList";
import axios from "axios";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  state = { todos: [], error: "" };

  fetchAllTodos = () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data });
      })
      .catch((err) => {
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };

  componentDidMount() {
    this.fetchAllTodos();
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
    return;
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
        <div id="error">Error: {this.state.error}</div>
        <h2>To Dos:</h2>
        <TodoList todos={todos} handleToggle={this.handleToggle} />
        {/* {this.state.todos.map((td) => {
          return <div key={td.id}>{td.name}</div>;
        })} */}

        <Form handleAdd={this.handleAdd} />
        <button onClick={this.handleHide}>
          {this.state.completed ? "Show Completed" : "Hide Completed"}
        </button>
      </div>
    );
  }
}
