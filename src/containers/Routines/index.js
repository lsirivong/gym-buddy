import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { denormalize } from 'normalizr'
import routineSchema from '../../schemas/routine'
import RoutineSelector from '../../components/RoutineSelector'

class RoutinesContainer extends Component {
  render() {
    const { routines, selectedRoutine, selectRoutine } = this.props

    return <div>
      <RoutineSelector
        selectedRoutineID={_.get(selectedRoutine, 'id')}
        routines={routines}
        onChange={selectRoutine}
      />
    </div>
  }
}

const mapStateToProps = (state, props) => {
  const { routines } = props
  const { selectedRoutine } = state
  const denormalizedRoutines = denormalize(routines, [ routineSchema ], state)
    .filter(_.negate(_.isEmpty))
  return {
    routines: denormalizedRoutines,
    selectedRoutine: denormalize(selectedRoutine, routineSchema, state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectRoutine: id => {
      dispatch({
        type: 'SELECT_ROUTINE',
        id
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutinesContainer)

