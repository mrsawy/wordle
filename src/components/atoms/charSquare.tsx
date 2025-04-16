"use client"

import { LetterStatus } from "@/app/types/word.type"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"




export default function CharSquare({ isDone, value = "", className = "", status = "absent" }: { isDone: boolean, value?: string, className?: string, status?: LetterStatus }) {

    return <div
        className={cn(
            "size-12 lg:size-24 text-center text-xl lg:text-6xl leading-[2] md:leading-[1.4] uppercase p-0 font-medium caret-transparent focus:outline-none focus:ring-2 border-2 border-zinc-500 rounded-md bg-zinc-900 text-zinc-200 ",
            status === "correct" ? "bg-green-500 text-zinc-900" : status === "present" ? "bg-yellow-500 text-zinc-900" : status === "absent" && !isDone ? "bg-zinc-700 text-zinc-900" : "bg-zinc-900 text-zinc-900"
            , className
        )}
    >
        {value}
    </div>
}