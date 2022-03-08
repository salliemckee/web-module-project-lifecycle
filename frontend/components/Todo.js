import React from "react";

export default class Todo extends React.Component {
  handleClick = () => {
    this.props.handleToggle(this.props.todo.id);
  };
  render() {
    return (
      <li onClick={this.handleClick} key={this.props.todo.id}>
        {this.props.todo.task}{" "}
        {this.props.todo.completed ? <span> ✔️ </span> : <span></span>}
      </li>
    );
  }
}
