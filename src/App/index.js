import _ from 'lodash'
import React, { Component } from 'react'
import LoginForm from '../containers/LoginForm'
import Routines from '../containers/Routines'
import AppBar from 'material-ui/AppBar'
import './index.css'

class App extends Component {
  static defaultProps = {
    initialize: _.noop
  }

  componentDidMount() {
    this.props.initialize()
  }

  render() {
    const { currentUser } = this.props

    return (
      <div className="App">
        <AppBar
          title="Gym Buddy"
          showMenuIconButton={false}
          zDepth={0}
        />
        <section>
          {
            currentUser
              ? <Routines routines={[0, 1]} />
              : <LoginForm />
          }
        </section>
      </div>
    )
  }
}

export default App
