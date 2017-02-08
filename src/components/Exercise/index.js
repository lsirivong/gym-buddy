import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
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

function roundDown(num, stepSize = 5, barWeight = 45) {
  return Math.max(
    barWeight,
    num - (num % stepSize)
  )
}

function findWeight(multiplier = 1, weight)  {
  return roundDown(multiplier * weight)
}

export class Exercise extends Component {
  constructor(props) {
    super(props)
    const { min, max } = computeMinMax(INITIAL_WEIGHT)
    this.state = {
      weight: INITIAL_WEIGHT,
      textWeight: INITIAL_WEIGHT,
      min,
      max,
      reps: {}
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

  handleRepChange = (i, { target }) => {
    const { value } = target
    this.setState(state => ({
      reps: {
        ...state.reps,
        [i]: parseInt(value, 10) || 0,
      }
    }))
  }

  handleWeightChange = (e, value) => {
    this.setWeight(value)
  }

  handleTextWeightBlur = ({ target }) => {
    const { value } = target
    this.setWeight(value, true)
  }

  handleSaveClick = () => {
    // compose persistence data
    const { exercise } = this.props
    const { id, steps } = exercise
    const { reps: overrideReps, weight } = this.state
    const suggestedReps = steps.reduce((acc, { multiplier, reps }, i) => (
      acc.concat({
        reps,
        weight: findWeight(multiplier, weight)
      })
    ), [])

    const reps = suggestedReps.map((set, i) => (
      {
        ...set,
        reps: _.get(overrideReps, i, set.reps)
      }
    ))

    const data = {
      timestamp: Date.now(),
      exerciseId: id,
      reps,
    }

    this.props.saveWorkout(data)
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
          {exercise.steps.map(({ reps, multiplier }, i) => (
            <Set
              key={i}
              reps={_.get(this.state.reps, i, reps)}
              weight={findWeight(multiplier, weight)}
              onRepChange={this.handleRepChange.bind(this, i)}
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
          <RaisedButton
            label="Save"
            onClick={this.handleSaveClick}
          />
        </CardText>
      </Card>
    )
  }
}


const mapDispatchToProps = (dispatch, props) => {
  return {
    saveWorkout: payload => {
      return dispatch({
        type: 'POST_EXERCISE_REQUEST',
        payload,
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(Exercise)
