"use client"

import { useEffect, useRef, useState } from "react"
import CharSquare from "../atoms/charSquare"
import { checkWordleGuess } from "@/lib/utils"
import { LetterCheck } from "@/app/types/word.type"

interface WordProps {
    forceFocus?: boolean
    isDone?: boolean
    wordValue?: string
}

export default function Word({ wordValue = "", isDone = false }: WordProps) {

    const [result, setResult] = useState<LetterCheck[]>();
    useEffect(() => {

        if (
            isDone && wordValue.length === 5
        ) {
            const checkResult = checkWordleGuess(wordValue)
            setResult(checkResult)
            console.log({ checkResult })
        }
    }, [wordValue, isDone])

    // useEffect(() => {
    //     console.log({ result, wordValue })
    // }, [wordValue, result])
    return <>
        <div className="flex flex-row-reverse flex-nowrap gap-1">
            {result && result.map((ele, index) => <CharSquare value={ele.letter} key={index} status={ele.status} />)}
            {!result && !!wordValue && wordValue.split('').map((char, index) => <CharSquare isDone value={char} key={index}  />)}
            {[...Array((5 - wordValue.length) > 0 ? (5 - wordValue.length) : 0)].map((_, index) => <CharSquare key={index} />)}
        </div>
    </>
}