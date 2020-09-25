export const requestTimeout = (ms: number) =>
  new Promise((_resolve, reject) => {
    const wait = setTimeout(() => {
      clearTimeout(wait);
      reject(new Error('Request Timeout'));
    }, ms);
  });

export const trimWords = (words: string) =>
  words
    .split(' ')
    .filter((word) => word.length)
    .map((word) => word.trim())
    .join(' ');
