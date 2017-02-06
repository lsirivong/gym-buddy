import { schema } from 'normalizr'
import exercise from '../exercise'

export default new schema.Entity('routines', {
  exercises: [ exercise ]
})

