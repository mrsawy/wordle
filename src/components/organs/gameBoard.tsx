"use client";
import { checkIsWon, isArabicChar } from "@/lib/utils";
import { useEffect, useRef, useState } from "react"
import Word from "../molecules/word";
import useGeneralStore from "@/store/generalSore";
import useDailyReset from "@/hooks/use-daily-reset";
import { useDailyWord } from "@/lib/hooks/useWords";

export default function GameBoard() {
    const { triedWords, numberOfTries, setResult, rightWord, setRightWord, reset, setIsSettingsModalOpen, isHydrated } = useGeneralStore()
    const { data, isSuccess } = useDailyWord()
    useEffect(() => {
        if (isSuccess && data) {
            const word = data.word.toLowerCase();
            if (rightWord == word) {
                useGeneralStore.persist.rehydrate();
            } else {
                setRightWord(word);
                reset();
            }
        }
    }, [data, isSuccess])
    useEffect(() => {
        setResult();
    }, [triedWords])
    return <div className="flex flex-col gap-3 items-center justify-center">
        {[...Array(numberOfTries)].map((_, index) => {
            return <Word currWorking={triedWords.length == index} wordValue={triedWords[index]} key={index} tryNumber={index} />
        })}

    </div>
}