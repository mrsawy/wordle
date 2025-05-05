"use client"

import { useEffect, useRef, useState } from "react"
import CharSquare from "../atoms/charSquare"
import { checkIsRightGuess, checkIsWon, checkWordleGuess, handleKeyUp, isArabicChar, isEnglishChar } from "@/lib/utils"
import { LetterCheck } from "@/app/types/word.type"
import useGeneralStore from "@/store/generalSore"

interface WordProps {
    forceFocus?: boolean
    isDone?: boolean
    currWorking?: boolean
    wordValue?: string
    tryNumber: number
}

export default function Word({ wordValue = "", currWorking = false, tryNumber }: WordProps) {

    const { isGameOver, setTriedWords, setIsGameOver, setIsWon, setIsLost, setIsSettingsModalOpen, numberOfTries, currWord, setCurrWord, backSpace, addChar, result, setResult } = useGeneralStore()

    useEffect(() => {
        console.log({ currWord })
    }, [currWord])

    useEffect(() => {
        if (currWorking ) {
            window.addEventListener("keyup", handleKeyUp)
            return () => {
                window.removeEventListener("keyup", handleKeyUp)
            }

        }
    }, [currWorking, currWord])

    return <>
        <div className="flex flex-row-reverse flex-nowrap gap-1">
            {[...Array(5)].map((_, index) => <CharSquare
                shouldReveal={!!result[tryNumber]}
                delay={(index * 300)}
                status={result[tryNumber]?.[index].status ?? "none"}
                value={wordValue ? wordValue[index] : currWorking ? currWord[index] : ""} key={index} />)}
        </div>
    </>
}