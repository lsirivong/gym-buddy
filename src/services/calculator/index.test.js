import * as calculator from './';

it('should not have 35s', () => {
  const result = calculator.weights(45 + 2 * 35);
  expect(result[0].count).toEqual(1);
  expect(result[0].weight).toEqual(25);

  expect(result[1].count).toEqual(1);
  expect(result[1].weight).toEqual(10);
});

it('should calculate plates', () => {
  const result = calculator.weights(45 + 2 * ((45 * 2) + 25 + 10 + 5 + 2.5));
  expect(result).toEqual([
    {
      weight: 45,
      count: 2
    },
    {
      weight: 25,
      count: 1
    },
    {
      weight: 10,
      count: 1
    },
    {
      weight: 5,
      count: 1
    },
    {
      weight: 2.5,
      count: 1
    }
  ]);
});
