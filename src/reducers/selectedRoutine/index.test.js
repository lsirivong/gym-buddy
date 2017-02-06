import selectedRoutine from './'

it('should set the routine ID', () => {
  expect(
    selectedRoutine(null, { type: 'SELECT_ROUTINE', id: 3 })
  ).toEqual(3)
});
