export function getRandomBetweenRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomElement<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
