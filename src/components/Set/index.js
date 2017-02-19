import _ from 'lodash'
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Chip from 'material-ui/Chip'
import {
  white,
  blueGrey500,
  blueGrey600,
  blueGrey700,
  blueGrey800,
  blueGrey900
} from 'material-ui/styles/colors'
import * as weightCalculator from '../../services/calculator'

import './index.css'

const getPlateColor = weight => {
  switch (weight) {
    case 2.5:
      return blueGrey500

    case 5:
      return blueGrey600

    case 10:
      return blueGrey700

    case 25:
      return blueGrey800

    case 45:
    default:
      return blueGrey900
  }
}

class Set extends Component {
  render() {
    const { reps, weight, onRepChange = _.noop } = this.props

    return <div className="Set">
      <div
        className="Set--weight"
      >
        {weight}
      </div>
      <div
        className="Set--plates"
      >
        {
          weightCalculator.weight(weight).map(plate => (
            <Chip
              className="Set--plate"
              key={`${weight}_${plate.weight}`}
              backgroundColor={getPlateColor(plate.weight)}
              labelColor={white}
            >
              <div className="Set--plate--value">
                {plate.count > 1 && `${plate.count} x`} {plate.weight}
              </div>
            </Chip>
          ))
        }
      </div>
      <div
        className="Set--reps"
      >
        <TextField
          name="set_reps"
          value={reps}
          fullWidth={true}
          onChange={onRepChange}
        />
      </div>
      <div
        className="Set--complete"
      >
        <Checkbox
          iconStyle={{
            marginRight: 0,
          }}
        />
      </div>
    </div>
  }
}

export default Set
