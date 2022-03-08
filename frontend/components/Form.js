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
    this.props.handleAdd(this.state.input);
  };

  handleChange = (evt) => {
    this.setState({ ...this.state, input: evt.target.value });
  };
  render() {
    return (
      <div>
        <form>
          <input
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
