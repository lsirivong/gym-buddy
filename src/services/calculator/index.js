const defaultPlates = [45, 25, 10, 5, 2.5];

export function weights(weight, barWeight = 45, _plates) {
  let remainingWeight = (weight - barWeight) / 2;
  const plates = (_plates || defaultPlates)
    .map((w, i) => ({
      weight: w,
      count: 0,
    }))

  const plateIsSmallerThanRemaining = plate => remainingWeight >= plate.weight

  while (remainingWeight > 0) {
    const plate = plates.find(plateIsSmallerThanRemaining);
    if (plate) {
      remainingWeight -= plate.weight;
      plate.count++;
    }
  }

  return plates.filter(p => p.count > 0);
}
