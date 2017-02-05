import _ from 'lodash'
import React, { Component } from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import TextField from 'material-ui/TextField'
import Set from '../Set'
import './index.css'

const INITIAL_WEIGHT = 100
const MIN_WEIGHT = 45
const MIN_WEIGHT_DIFF = 100
const MAX_WEIGHT_DIFF = 100
const STEP_SIZE = 5

const computeMinMax = value => ({
  min: Math.max(MIN_WEIGHT, value - MIN_WEIGHT_DIFF),
  max: value + MAX_WEIGHT_DIFF
})

class Exercise extends Component {
  constructor(props) {
    super(props)
    const { min, max } = computeMinMax(INITIAL_WEIGHT)
    this.state = {
      weight: INITIAL_WEIGHT,
      textWeight: INITIAL_WEIGHT,
      min,
      max,
    }
  }

  setWeight(value, updateMinMax = false) {
    const weight = parseInt(value, 10) || MIN_WEIGHT
    const newState = {}
    const newStateWithMinMax = {
      ...newState,
      ...(updateMinMax && computeMinMax(weight))
    }

    const { min, max } = {
      ...this.state,
      ...newStateWithMinMax
    }

    const clampedWeight = _.clamp(weight, min, max)
    const newStateWithClampedWeight = {
      ...newStateWithMinMax,
      weight: clampedWeight,
      textWeight: clampedWeight
    }

    this.setState(newStateWithClampedWeight)
  }

  handleDragStop = () => {
    const { weight } = this.state
    const { min, max } = computeMinMax(weight)
    this.setState({
      min,
      max
    });
  }

  handleTextWeightChange = (e, value) => {
    this.setState({
      textWeight: value
    })
  }

  handleWeightChange = (e, value) => {
    this.setWeight(value)
  }

  handleTextWeightBlur = ({ target }) => {
    const { value } = target
    this.setWeight(value, true)
  }

  render() {
    const { exercise } = this.props
    const { weight, min, max, textWeight } = this.state

    return (
      <Card
        style={{
          margin: '24px auto',
          maxWidth: 480,
          paddingBottom: 0,
        }}
        expandable={true}
        initiallyExpanded={true}
      >
        <CardHeader
          title={exercise.name}
          actAsExpander={true}
          showExpandableButton={true}
          className="Exercise--header"
          titleStyle={{
            fontWeight: 600,
            fontSize: 20
          }}
        />
        <CardText
          expandable={true}
          style={{
            paddingBottom: 8
          }}
        >
          {exercise.steps.map((set, i) => (
            <Set
              key={i}
              set={set}
              weight={weight}
              onChange={this.handleWeightChange}
            />
          ))}
          <div className="Exercise--slider-container">
            <Slider
              min={min}
              max={max}
              value={weight}
              onChange={this.handleWeightChange}
              onDragStop={this.handleDragStop}
              step={STEP_SIZE}
              className="Exercise--slider"
              sliderStyle={{
                marginBottom: 24
              }}
            />
            <TextField
              onBlur={this.handleTextWeightBlur}
              value={textWeight}
              onChange={this.handleTextWeightChange}
              name={`${exercise.name}_weight`}
              className="Exercise--input"
              style={{
                width: 'auto'
              }}
              inputStyle={{
                width: '100%',
                textAlign: 'center',
              }}
            />
          </div>
        </CardText>
      </Card>
    )
  }
}

export default Exercise

