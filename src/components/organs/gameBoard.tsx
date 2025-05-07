"use client";
import { useEffect } from "react"
import Word from "../molecules/word";
import useGeneralStore from "@/store/generalSore";
import { WithId } from "@/app/types/WithId";
import { WordSchemaType } from "@/lib/schema";
import { checkIsWon } from "@/lib/utils";

export default function GameBoard({ dailyWord }: { dailyWord: WithId<WordSchemaType> | string }) {
    dailyWord = (typeof dailyWord === "string" ? JSON.parse(dailyWord) : dailyWord) as WithId<WordSchemaType>;
    const { triedWords, numberOfTries, setResult, rightWord, setRightWord, reset, hasHydrated, setReadyToGo, setTriedWords,
        setIsWon,
        setIsLost,
        setIsGameOver,
        setIsSettingsModalOpen,
        setCurrWord,
    } = useGeneralStore()


    useEffect(() => {
        setReadyToGo(false)

        const word = dailyWord.word.toLowerCase();
        console.log({ rightWord, word });

        if (!hasHydrated) {
            // setRightWord(word);
            return;
        }

        if (rightWord !== word) {
            reset();
            setTriedWords([]);
            setRightWord(word);
            setReadyToGo(true)
        } else {
            setReadyToGo(true)
        }
    }, [hasHydrated]);

    useEffect(() => {
        const result = setResult();


        const isWon = checkIsWon(triedWords, rightWord);
        console.log({ triedWords, rightWord, result, isWon });

        if (isWon) {
            setIsWon(true);
            setIsLost(false);
            setIsGameOver(true);
            setIsSettingsModalOpen(true)
            setCurrWord("")
            return
        }

        if (triedWords.length == useGeneralStore.getState().numberOfTries) {
            setIsGameOver(true);
            setIsLost(true);
            setIsWon(false);
            setIsSettingsModalOpen(true)
            setCurrWord("")

            return
        }


    }, [triedWords, hasHydrated, rightWord]);

    useEffect(() => {


    }, []);

    return <div className="flex flex-col gap-3 items-center justify-center">
        {[...Array(numberOfTries)].map((_, index) => {
            return <Word currWorking={triedWords.length == index} wordValue={triedWords[index]} key={index} tryNumber={index} />
        })}

    </div>
}