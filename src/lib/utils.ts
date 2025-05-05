

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
export function isEnglishChar(char: string) {
  return /^[a-zA-Z]?$/.test(char)
}
const rightWord = useGeneralStore.getState().rightWord

export function checkWordleGuess(
  guess: string,
  solution: string = rightWord
): LetterCheck[] {
  const result: LetterCheck[] = [];
  const solutionLetters = solution.split("");
  const taken = Array(solution.length).fill(false);
  // First pass – exact matches
  for (let i = 0; i < guess.length; i++) {
    const guessedChar = guess[i];
    if (guessedChar === solution[i]) {
      result.push({ letter: guessedChar, status: "correct" });
      taken[i] = true;
    } else {
      result.push({ letter: guessedChar, status: "absent" });
    }
  }

  // Second pass – present (wrong position)
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

export function checkIsRightGuess(checkResult: LetterCheck[]) {
  let guessedRight: boolean = false;

  for (const element of checkResult) {
    if (element.status == "correct") { guessedRight = true }
    else { guessedRight = false; break }
  }
  return guessedRight
}


export function checkIsWon(guesses: string[]) {
  let isWon = false;
  for (const guess of guesses) {
    const checkResult = checkWordleGuess(guess);
    const guessedRight = checkIsRightGuess(checkResult)
    if (guessedRight) {
      isWon = true;
      break
    }
  }
  return isWon

}

export const handleKeyUp = (e: KeyboardEvent | string) => {

  if (useGeneralStore.getState().isGameOver) return

  let key: string;
  if (typeof e == "string") { key = e }
  else { key = e?.key ?? "" }


  console.log({ key })
  console.log(`after check`, { key })

  if (key.toLowerCase() === "Backspace".toLowerCase()) {
    useGeneralStore.getState().backSpace()
    return
  }
  if (key.toLowerCase() === "Enter".toLowerCase()) {
    if (useGeneralStore.getState().currWord.length < 5) return
    const newTriedWords = [...useGeneralStore.getState().triedWords, useGeneralStore.getState().currWord];
    useGeneralStore.getState().setTriedWords(newTriedWords)


    const isWon = checkIsWon(newTriedWords);

    if (isWon) {
      useGeneralStore.getState().setIsWon(isWon);
      useGeneralStore.getState().setIsLost(!isWon);
      useGeneralStore.getState().setIsGameOver(true);
      useGeneralStore.getState().setIsSettingsModalOpen(true)
      useGeneralStore.getState().setCurrWord("")
      return
    }

    if (newTriedWords.length == useGeneralStore.getState().numberOfTries) {
      useGeneralStore.getState().setIsGameOver(true);
      useGeneralStore.getState().setIsLost(true);
      useGeneralStore.getState().setIsWon(false);
      useGeneralStore.getState().setIsSettingsModalOpen(true)
      useGeneralStore.getState().setCurrWord("")

      return
    }
    useGeneralStore.getState().setCurrWord("")
    return
  }

  if ((!isEnglishChar(key) && !isArabicChar(key)) || useGeneralStore.getState().currWord.length > 5) return

  useGeneralStore.getState().addChar(key)

}