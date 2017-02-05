import _ from 'lodash'
import React, { Component } from 'react'
import { Tab, Tabs } from 'material-ui/Tabs'
import Routine from '../Routine'

class RoutineSelector extends Component {
  defaultProps = {
    onChange: _.noop
  }

  handleChange = value => {
    const { onChange } = this.props

    onChange(value)
  }

  render () {
    const { selectedRoutineID, routines } = this.props
    return <Tabs
      onChange={this.handleChange}
      value={selectedRoutineID}
    >
      { routines.map(routine => {
        const { name, id } = routine;
        return <Tab
          label={name}
          value={id}
          key={id}
        >
          <Routine routine={routine} />
        </Tab>
      }) }
    </Tabs>
  }
}

export default RoutineSelector
