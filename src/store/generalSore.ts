import { LetterCheck } from "@/app/types/word.type"
import { checkWordleGuess } from "@/lib/utils"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type GeneralStore = {
    rightWord: string
    setRightWord: (word: string) => void
    triedWords: string[]
    setTriedWords: (words: string[]) => void
    isGameOver: boolean
    setIsGameOver: (isGameOver: boolean) => void
    isWon: boolean
    setIsWon: (isWin: boolean) => void
    isLost: boolean
    setIsLost: (isWin: boolean) => void
    isLoading: boolean
    setIsLoading: (isWin: boolean) => void
    isSettingsModalOpen: boolean
    setIsSettingsModalOpen: (isOpen: boolean) => void
    setIsHydrated: (isHydrated: boolean) => void
    isHydrated: boolean
    numberOfTries: number
    currWord: string
    setCurrWord: (word: string) => void
    backSpace: () => void
    addChar: (char: string) => void
    result: LetterCheck[][]
    setResult: () => void
    lastPlayedDate: string
    setLastPlayedDate: (date: string) => void
    reset: () => void
    hasHydrated: boolean
    setHasHydrated: (state: boolean) => void
    readyToGo: boolean
    setReadyToGo: (state: boolean) => void
    shouldShake: boolean
    setShouldShake: (state: boolean) => void
}
const useGeneralStore = create<GeneralStore>()(
    persist(
        (set, get) => ({
            rightWord: "",
            setRightWord: (word: string) => set(() => ({ rightWord: word })),
            triedWords: [],
            setTriedWords: (words: string[]) => set(() => ({ triedWords: words })),
            isGameOver: false,
            setIsGameOver: (isGameOver: boolean) => set(() => ({ isGameOver })),
            isWon: false,
            setIsWon: (isWin: boolean) => set(() => ({ isWon: isWin })),
            isLost: false,
            setIsLost: (isWin: boolean) => set(() => ({ isLost: isWin })),
            isLoading: false,
            setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
            isSettingsModalOpen: false,
            setIsSettingsModalOpen: (isOpen: boolean) => set(() => ({ isSettingsModalOpen: isOpen })),
            isHydrated: false,
            setIsHydrated: (isHydrated: boolean) => set(() => ({ isHydrated })),
            numberOfTries: 6,
            currWord: "",
            setCurrWord: (word: string) => set(() => ({ currWord: word })),
            backSpace: () =>
                set((state) => ({
                    currWord: state.currWord.slice(0, -1),
                })),
            addChar: (char: string) =>
                set((state) => ({
                    currWord: state.currWord.length < 5 ? state.currWord + char : state.currWord,
                })),
            result: [],
            setResult: () => {
                set(() => ({
                    result: get().triedWords.map((word) => checkWordleGuess(word, get().rightWord)),
                }))
                return get().result
            },
            lastPlayedDate: new Date().toISOString().split("T")[0],
            setLastPlayedDate: (date) => set({ lastPlayedDate: date }),
            hasHydrated: false,
            setHasHydrated: (state: boolean) => set({ hasHydrated: state }),

            reset: () =>
                set({
                    triedWords: [],
                    isGameOver: false,
                    isWon: false,
                    isLost: false,
                    currWord: "",
                    result: [],
                    isLoading: false,
                }),

            setReadyToGo: (state: boolean) => set({ readyToGo: state }),
            readyToGo: false,

            shouldShake: false,
            setShouldShake: (state: boolean) => set({ shouldShake: state }),
        }),
        {
            name: "general-store",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
)


export default useGeneralStore
