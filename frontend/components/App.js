import React from "react";
import Form from "./Form";
import TodoList from "./TodoList";
import axios from "axios";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  state = { todos: [], error: "", input: "" };

  fetchAllTodos = () => {
    axios
      .get(URL)
      .then((res) => {
        console.log(res);
        this.setState({ ...this.state, todos: res.data.data });
      })
      .catch((err) => {
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };

  componentDidMount() {
    this.fetchAllTodos();
  }

  handleAdd = (input) => {
    console.log(input);
    // const newTodo = { id: getIndex(), task: task, completed: false };
    // this.setState({
    //   ...this.state,
    //   todos: [...this.state.todos, newTodo],
    // });
    axios
      .post(URL, { name: input })
      .then(() => {
        this.fetchAllTodos();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.Response);
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };

  // postNewTodo = () => {
  //   axios
  //     .post(URL, { name: this.state.input })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

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

        <Form handleAdd={this.handleAdd} input={this.state.input} />
        <button onClick={this.handleHide}>
          {this.state.completed ? "Show Completed" : "Hide Completed"}
        </button>
      </div>
    );
  }
}
