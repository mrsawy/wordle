"use client"

import useGeneralStore from "@/store/generalSore"
import { useEffect, useState } from "react"

const useDailyReset = () => {
    const [isLastPlayedToday, setIsLastPlayedToday] = useState(false)
    const {
        lastPlayedDate,
        setLastPlayedDate,
        setTriedWords,
        setIsGameOver,
        setIsWon,
        setIsLost,
        setCurrWord,
        setResult,
    } = useGeneralStore()

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]
        console.log({
            lastPlayedDate,
            today
        })
        if (lastPlayedDate !== today) {
            setTriedWords([])
            setIsGameOver(false)
            setIsWon(false)
            setIsLost(false)
            setCurrWord("")
            setResult()
            setLastPlayedDate(today)
        } else {
            setIsLastPlayedToday(true)
        }
    }, [lastPlayedDate])

    return isLastPlayedToday
}

export default useDailyReset;