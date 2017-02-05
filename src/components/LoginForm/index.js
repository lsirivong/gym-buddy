import React, { Component } from 'react';
import './index.css';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleSubmit = ev => {
    ev.preventDefault();
    this.props.logIn(this.state.email, this.state.password);
  }

  render() {
    return (
      <form
        className="LoginForm"
        onSubmit={this.handleSubmit}
      >
        Please Log In
        <label>
          email
          <input
            type="email"
            placeholder="eg. arnold@example.com"
            required
            onChange={({ target }) => { this.setState({ email: target.value })}}
          />
        </label>

        <label>
          password
          <input
            type="password"
            placeholder="••••••••"
            required
            onChange={({ target }) => { this.setState({ password: target.value })}}
          />
        </label>

        <button
          type="submit"
        >
          Log In
        </button>
      </form>
    );
  }
}

export default LoginForm
