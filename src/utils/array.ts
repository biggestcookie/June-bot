declare global {
  interface Array<T> {
    getRandomElement(): T;
  }
}

Array.prototype.getRandomElement = function<T>(this: T[]): T {
  return this[Math.floor(Math.random() * this.length)];
};

export {};
