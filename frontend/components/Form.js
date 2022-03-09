import React from "react";

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(this.state.input);
    this.props.handleAdd(this.state.input);
  };

  handleChange = (evt) => {
    console.log(this.state.input);
    this.setState({ ...this.state, input: evt.target.value });
  };
  render() {
    return (
      <div>
        <form>
          <input
            value={this.state.input}
            type="text"
            placeholder="Type todo"
            id="textInput"
            onChange={this.handleChange}
          ></input>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}
