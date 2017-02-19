import _ from 'lodash'
import React from 'react'
import Exercise from '../Exercise'

const Routine = ({ routine }) => <div>
  {_.get(routine, 'exercises', [])
    .map(e => <Exercise key={e.id} exercise={e} />)}
</div>

export default Routine

