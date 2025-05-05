"use client"

import { ARABIC_LETTERS } from '@/lib/constants';
import * as React from 'react';
import Icons from '../ui/icons';
import { handleKeyUp } from '@/lib/utils';

export interface IKeyBoardProps {
}

export default function KeyBoard(props: IKeyBoardProps) {
    return (
        <div className='flex flex-col gap-2 items-center justify-center flex-wrap'>
            {ARABIC_LETTERS.map((lettersGroup, index) => {
                return (
                    <div key={index} className='flex flex-row gap-1 flex-wrap'>
                        {lettersGroup.map((letter, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        handleKeyUp(letter)
                                    }}
                                    key={index} className=' hover:cursor-pointer  transition-all duration-300 min-h-6 min-w-6  md:min-h-14 md:min-w-14 p-[0.55rem] lg:px-4  bg-zinc-600 rounded-md flex items-center justify-center text-white text-sm md:text-xl font-bold '>
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
