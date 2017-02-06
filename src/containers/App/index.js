import _ from 'lodash'
import { connect } from 'react-redux'
import App from '../../App'
import * as api from '../../services/api'
import { denormalize } from 'normalizr'
import routineSchema from '../../schemas/routine';

const mapStateToProps = (state, props) => {
  // FIXME: hardcoded list of routines for now
  const routines = [1, 2]

  return {
    currentUser: _.get(state, ['currentUser', 'data']),
    routines: denormalize(routines, [ routineSchema ], state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initialize: () => {
      api.boot(dispatch)
    }
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp

