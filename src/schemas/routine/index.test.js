import { normalize, denormalize } from 'normalizr'
import routineSchema from './index'

it('normalizes routine', () => {
  const routine = {
    id: 1,
    name: 'foo',
    exercises: [
      {
        id: 1,
        name: 'bar'
      },
      {
        id: 2,
        name: 'baz'
      }
    ]
  };

  const { result, entities } = normalize(routine, routineSchema)

  // normalizes exercises
  expect(
    entities.routines[1].exercises
  ).toEqual([1, 2]);

  expect(
    entities.exercises[1].name
  ).toEqual('bar');

  expect(
    entities.exercises[2].name
  ).toEqual('baz');

  // denormalize
  const denormalizedRoutine = denormalize(1, routineSchema, entities)
  expect(
    denormalizedRoutine.id
  ).toEqual(1);

  expect(
    denormalizedRoutine.name
  ).toEqual('foo');

  expect(
    denormalizedRoutine.exercises[0].name
  ).toEqual('bar');

  expect(
    denormalizedRoutine.exercises[1].name
  ).toEqual('baz');
});


