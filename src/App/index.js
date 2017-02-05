import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import './index.css';
import * as api from '../services/api';
import Routine from '../components/Routine';

class App extends Component {
  componentDidMount() {
    this.props.initialize();
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Gym Buddy</h2>
        </div>
        <section>
          {
            currentUser
              ? <Routine />
              : <LoginForm />
          }
        </section>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    currentUser: _.get(state, ['currentUser', 'data'])
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initialize: () => {
      api.boot(dispatch);
    }
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
