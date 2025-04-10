import { useState, useEffect, useCallback } from 'react';

export function useGenerateArrayCard(
  length: number,
  min: number = 1,
  max: number = 100
): number[] {
  const [numbers, setNumbers] = useState<number[]>([]);

  const generateNumbers = useCallback(() => {
    const uniqueNumbers = new Set<number>();

    while (uniqueNumbers.size < length) {
      const randomNumber = Math.floor(Math.random() * ( max - min + 1 )) + min;
      uniqueNumbers.add(randomNumber);
    }

    return Array.from(uniqueNumbers);
  }, [length, min, max]);

  useEffect(() => {
    setNumbers(generateNumbers());
  }, [generateNumbers]);

  return numbers;
}