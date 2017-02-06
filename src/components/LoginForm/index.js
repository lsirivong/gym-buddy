import React, { Component } from 'react'
import './index.css'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {}
  }

  handleSubmit = ev => {
    ev.preventDefault()
    this.props.logIn(this.state.email, this.state.password)
  }

  render() {
    return (
      <form
        className="LoginForm"
        onSubmit={this.handleSubmit}
      >
        <Paper style={{ padding: '0 16px 16px' }}>
          <TextField
            type="email"
            floatingLabelText="Email"
            hintText="eg. arnold@example.com"
            fullWidth={true}
            required
            onChange={({ target }) => { this.setState({ email: target.value })}}
          />

          <br />
          <TextField
            type="password"
            floatingLabelText="Password"
            fullWidth={true}
            required
            onChange={({ target }) => { this.setState({ password: target.value })}}
          />

          <RaisedButton
            type="submit"
            label="Log In"
            primary={true}
            style={{
              marginTop: 24
            }}
          />
        </Paper>
      </form>
    );
  }
}

export default LoginForm
