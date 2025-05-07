"use client"

import { ARABIC_LETTERS } from '@/lib/constants';
import * as React from 'react';
import Icons from '../ui/icons';
import { handleKeyUp } from '@/lib/utils';
import useGeneralStore from '@/store/generalSore';
import { twMerge } from 'tailwind-merge';

const getKeyColor = (status: string) => {
    switch (status) {
        case 'correct':
            return 'bg-green-500';
        case 'absent':
            return 'bg-neutral-800';
        case 'present':
            return 'bg-yellow-500';
        default:
            return 'bg-white';
    }
};
export default function KeyBoard() {

    const { result } = useGeneralStore()
    const [keyColors, setKeyColors] = React.useState<{ [key: string]: string }>({});
    React.useEffect(() => {
        const newKeyColors: { [key: string]: string } = {};

        result.forEach((guess) => {
            guess.forEach(({ letter, status }) => {
                if (!newKeyColors[letter] || status === 'correct') {
                    // Prefer 'correct' color, override others
                    newKeyColors[letter] = getKeyColor(status);
                }
            });
        });

        setKeyColors(newKeyColors);
    }, [result]);

    React.useEffect(() => {
        console.log(useGeneralStore)
    }, [useGeneralStore])
    return (
        <div className='flex flex-col gap-2 items-center justify-center flex-wrap w-[99%] max-w-4xl mx-auto'>
            {ARABIC_LETTERS.map((lettersGroup, index) => {
                return (
                    <div key={index} className='flex flex-row gap-[3px] flex-nowrap w-full '>
                        {lettersGroup.map((letter, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        handleKeyUp(letter)
                                    }}
                                    key={index}
                                    className={twMerge(' w-full hover:cursor-pointer  transition-all duration-300 h-12 min-w-6  md:min-h-14 md:min-w-14 p-[0.55rem] lg:px-4  bg-zinc-600 rounded-md flex items-center justify-center text-white text-lg md:text-xl font-bold ', `key ${keyColors[letter] || 'bg-zinc-600 '}`, letter == "enter" ? "bg-blue-500" : letter == "backspace" ? "bg-red-500" : "")} >
                                    {letter == "enter" ?
                                        <Icons.enter className="size-5" /> : letter == "backspace" ? <Icons.backspace className="size-5" /> : letter
                                    }
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
