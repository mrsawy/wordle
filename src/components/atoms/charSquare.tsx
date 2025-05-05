"use client"

import { LetterStatus } from "@/app/types/word.type"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

type CharSquareProps = {
    isDone?: boolean
    value?: string
    className?: string
    status?: LetterStatus
    delay?: number
    shouldReveal?: boolean
}

export default function CharSquare({
    isDone = false,
    value = "",
    className = "",
    status = "none",
    delay = 0,
    shouldReveal = false,
}: CharSquareProps) {
    const [flipped, setFlipped] = useState(false)

    useEffect(() => {
        if (shouldReveal) {
            setTimeout(() => {
                setFlipped(true)
            }, delay)
        }
    }, [shouldReveal, delay])

    return (
        <div className={cn(
            "flip-wrapper",
            flipped && "spin-x",
            className,
            "flex justify-center items-center size-12 lg:size-16 text-center uppercase p-0 font-medium caret-transparent focus:outline-none focus:ring-2 "
        )}>
            <div className="flip-inner border border-zinc-500 rounded">
                <div className="front border border-zinc-500">{value}</div>
                <div className={cn("back border border-zinc-500", status)}>{value}</div>
            </div>
        </div>
    )
}