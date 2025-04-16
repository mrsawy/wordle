

import { LetterCheck } from "@/app/types/word.type";
import useGeneralStore from "@/store/generalSore";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isArabicChar(char: string) {
  return /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]$/.test(char);
}

const rightWord = useGeneralStore.getState().rightWord

export function checkWordleGuess(
  guess: string,
  solution: string = rightWord
): LetterCheck[] {
  console.log({ guess, solution })

  const result: LetterCheck[] = [];
  const solutionLetters = solution.split("");
  const taken = Array(solution.length).fill(false);

  // Step 1: Mark all correct letters first
  for (let i = 0; i < guess.length; i++) {
    const guessedChar = guess[i];
    if (guessedChar === solution[i]) {
      result[i] = { letter: guessedChar, status: "correct" };
      taken[i] = true;
    } else {
      result[i] = { letter: guessedChar, status: "absent" };
    }
  }

  // Step 2: Check for present (but misplaced) letters
  for (let i = 0; i < guess.length; i++) {
    if (result[i].status !== "absent") continue;

    for (let j = 0; j < solution.length; j++) {
      if (!taken[j] && guess[i] === solution[j]) {
        result[i].status = "present";
        taken[j] = true;
        break;
      }
    }
  }

  return result;
}