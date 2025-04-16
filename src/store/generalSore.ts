import { create } from 'zustand'

type GeneralStore = {
    rightWord: string
    setRightWord: (word: string) => void
}

const useGeneralStore = create<GeneralStore>((set) => ({
    rightWord: "اختبار",
    setRightWord: (word: string) => set(() => ({ rightWord: word })),
}))

export default useGeneralStore;