export const randomNumber = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const randomInteger = (min: number, max: number) =>
  Math.floor(randomNumber(min, max));

export const randomString = (length: number) =>
  Array(length)
    .fill(0)
    .map(() => Math.random().toString(36).charAt(2))
    .join('');
