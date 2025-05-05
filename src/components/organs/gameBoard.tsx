"use client";
import { useEffect } from "react"
import Word from "../molecules/word";
import useGeneralStore from "@/store/generalSore";
import { WithId } from "@/app/types/WithId";
import { WordSchemaType } from "@/lib/schema";

export default function GameBoard({ dailyWord }: { dailyWord: WithId<WordSchemaType> }) {
    const { triedWords, numberOfTries, setResult, rightWord, setRightWord, reset, hasHydrated, readyToGo, setReadyToGo } = useGeneralStore()
    useEffect(() => {
        setReadyToGo(false)

        if (!hasHydrated) return;

        const word = dailyWord.word.toLowerCase();
        console.log({ rightWord, word });

        if (rightWord !== word) {
            setRightWord(word);
            reset();
            setReadyToGo(true)
        } else {
            setReadyToGo(true)
        }
    }, [hasHydrated]);

    useEffect(() => {
        if (hasHydrated) setResult();
    }, [triedWords, hasHydrated]);

    return <div className="flex flex-col gap-3 items-center justify-center">
        {readyToGo && [...Array(numberOfTries)].map((_, index) => {
            return <Word currWorking={triedWords.length == index} wordValue={triedWords[index]} key={index} tryNumber={index} />
        })}

    </div>
}