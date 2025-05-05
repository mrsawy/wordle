"use client"

import { useEffect } from "react"
import CharSquare from "../atoms/charSquare"
import { handleKeyUp } from "@/lib/utils"

import useGeneralStore from "@/store/generalSore"

interface WordProps {
    forceFocus?: boolean
    isDone?: boolean
    currWorking?: boolean
    wordValue?: string
    tryNumber: number
}

export default function Word({ wordValue = "", currWorking = false, tryNumber }: WordProps) {

    const { currWord, result, readyToGo } = useGeneralStore()

    console.log({ result })

    useEffect(() => {
        if (currWorking) {
            window.addEventListener("keyup", handleKeyUp)
            return () => {
                window.removeEventListener("keyup", handleKeyUp)
            }
        }
    }, [currWorking, currWord])

    return <>
        <div className="flex flex-row-reverse flex-nowrap gap-1">
            {[...Array(5)].map((_, index) => <CharSquare
                shouldReveal={readyToGo && !!result[tryNumber]}
                delay={(index * 300)}
                status={result[tryNumber]?.[index].status ?? "none"}
                value={wordValue ? wordValue[index] : currWorking ? currWord[index] : ""} key={index} />)}
        </div>
    </>
}