"use client";
import { isArabicChar } from "@/lib/utils";
import { useEffect, useRef, useState } from "react"
import Word from "../molecules/word";

export default function GameBoard() {
    const [currWord, setCurrWord] = useState("")
    const [numOfTries, setNumOfTries] = useState(6);
    const [triedWords, setTriedWords] = useState<string[]>([])

    useEffect(() => {
        const handleKeyUp = (e: KeyboardEvent) => {
            const key: string = e?.key ?? "";
            if (key === "Backspace") {
                setCurrWord((prev) => prev.slice(0, -1))
                return
            }
            if (key === "Enter") {
                if (currWord.length < 5) return
                setTriedWords((prev) => [...prev, currWord])
                setCurrWord("")
                return
            }

            // if (!isArabicChar(key)) return; 
            setCurrWord((prev) => {
                if (prev.length < 5) {
                    return prev + key
                }
                return prev
            })
        }
        window.addEventListener("keyup", handleKeyUp)
        return () => {
            window.removeEventListener("keyup", handleKeyUp)
        }

    }, [currWord])

    // useEffect(() => (console.log(triedWords)), [triedWords])

    return <div className="flex flex-col gap-7 items-center justify-center">
        {triedWords.map((triedWord, index) => <Word wordValue={triedWord} key={index} isDone={true} />)}
        {[...Array(numOfTries - triedWords.length)].map((_, index) => {


            return <Word key={index} wordValue={index == 0 ? currWord : ''} />
        })}
    </div>
}