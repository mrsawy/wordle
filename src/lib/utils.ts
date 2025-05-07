

import { LetterCheck } from "@/app/types/word.type";
import useGeneralStore from "@/store/generalSore";
import axios from "axios";
import { clsx, type ClassValue } from "clsx"
import { toast } from "react-toastify";
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


export function checkIsWon(guesses: string[], solution: string = rightWord) {
  let isWon = false;
  for (const guess of guesses) {
    const checkResult = checkWordleGuess(guess, solution);
    console.log({ checkResult })
    const guessedRight = checkIsRightGuess(checkResult)
    console.log({ guessedRight })

    if (guessedRight) {


      isWon = true;
      break
    }
  }
  return isWon

}

export const handleKeyUp = async (e: KeyboardEvent | string) => {

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

    // console.log({ useGeneralStore })


    if (useGeneralStore.getState().currWord.length < 5) {
      console.log("not enough letters")
      useGeneralStore.getState().setShouldShake(true)
      toast.warning("يجب أن تحتوي الكلمة على 5 حروف")
      return
    }

    const toBeAdded = useGeneralStore.getState().currWord;


    const validArWord = (await fetch("/api/words/dictionary/ar/" + toBeAdded)).ok

    if (!validArWord) {
      useGeneralStore.getState().setShouldShake(true)
      toast.warning("هذة الكلمة ليست في قائمة الكلمات")
      return
    }

    const newTriedWords = [...useGeneralStore.getState().triedWords, useGeneralStore.getState().currWord];
    useGeneralStore.getState().setTriedWords(newTriedWords)


    useGeneralStore.getState().setCurrWord("")
    return
  }

  if ((!isEnglishChar(key) && !isArabicChar(key)) || useGeneralStore.getState().currWord.length > 5) return

  useGeneralStore.getState().addChar(key)

}




export const testValidAr = async (arabicWord: string) => {
  try {
    const arabicRegex = /^[\u0600-\u06FF\s]+$/; // Arabic characters and spaces only
    if (!arabicRegex.test(arabicWord)) throw new Error("Invalid Arabic word")

    const response = await axios.get((process.env.AR_API as string) + arabicWord)

    console.log({ response })

    if (response.status !== 200) throw new Error("Invalid Arabic word");

    return true
  } catch (error: unknown) {
    console.error(error)
    return false
  }
};

// export const fireError = (message: string) => {
//   useGeneralStore.getState().setErrorMessage(message)
//   useGeneralStore.getState().setIsErrorModalOpen(true)
// }