const DEFAULT_MIN_RANGE = 1;
const DEFAULT_MAX_RANGE = 88;

/**
 * Генерация массива уникальных рандомных чисел
 * @param length - длинна массива
 * @param min - нижняя граница рандомного числа
 * @param max - верхняя граница рандомного числа
 */
export const generateRandomUniqueNumbersArray = (
  length: number,
  min = DEFAULT_MIN_RANGE,
  max = DEFAULT_MAX_RANGE,
): number[] => {
  const numbers = new Set();

  while (numbers.size < length) {
    const randomNumber = Math.floor(Math.random() * ( max - min + 1 )) + min;
    numbers.add(randomNumber);
  }
  return Array.from(numbers) as number[];
}