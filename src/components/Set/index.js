import _ from 'lodash'
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Chip from 'material-ui/Chip'
import {
  white,
  blueGrey400,
  blueGrey500,
  blueGrey600,
  blueGrey700,
  blueGrey800,
  blueGrey900
} from 'material-ui/styles/colors'

import './index.css'

const plateColors = [
  blueGrey900,
  blueGrey800,
  blueGrey700,
  blueGrey600,
  blueGrey500,
  blueGrey400,
]

function calculateBarbellWeights(weight, barWeight = 45) {
  let remainingWeight = (weight - barWeight) / 2;
  const plates = [45, 35, 25, 10, 5, 2.5]
    .map((w, i) => ({
      weight: w,
      count: 0,
      color: plateColors[i],
    }))

  let c = 0;
  const plateIsSmallerThanRemaining = plate => remainingWeight >= plate.weight

  while (remainingWeight > 0 && c < 100) {
    const plate = plates.find(plateIsSmallerThanRemaining);
    if (plate) {
      remainingWeight -= plate.weight;
      plate.count++;
    }
    c++;
  }

  return plates.filter(p => p.count > 0);
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
          calculateBarbellWeights(weight).map(plate => (
            <Chip
              className="Set--plate"
              key={`${weight}_${plate.weight}`}
              backgroundColor={plate.color}
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
