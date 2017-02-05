import React from 'react'
import Exercise from '../Exercise'

const Routine = ({ routine }) => <div>
  {routine.exercises.map(e => <Exercise key={e.id} exercise={e} />)}
</div>

export default Routine

