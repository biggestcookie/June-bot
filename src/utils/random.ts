export function randomElement<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomNumBetweenRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}
