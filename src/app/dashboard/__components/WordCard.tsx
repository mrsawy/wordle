'use client';

import { WithId } from '@/app/types/WithId';
import Icons from '@/components/ui/icons';
import { WordSchemaType } from '@/lib/schema';
import axios, { AxiosError } from 'axios';
import { format } from 'date-fns';
import React from 'react';
import Swal from 'sweetalert2'
import { useQueryClient } from '@tanstack/react-query';




const WordCard = ({ word, meaning, date, _id }: WithId<WordSchemaType>) => {
    const queryClient = useQueryClient()

    const deleteHandler = async ({ _id }: { _id: string }) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`/api/words?id=${_id}`);
                console.log({ response })
                if (response.status === 200) {
                    queryClient.invalidateQueries({ queryKey: ['words'] });
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
            catch (error: unknown) {
                console.error("Error deleting word:", error);
                if (error instanceof AxiosError) {
                    Swal.fire({
                        title: "Error!",
                        text: "There was an error deleting the word. " + (error?.response?.data?.message ?? error.message),
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "There was an error deleting the word. ",
                        icon: "error"
                    });
                }
            }
        }

    }


    return (
        <div className='bg-zinc-700 p-6 rounded-2xl text-center flex flex-row items-center '>
            <div className='flex flex-col items-center text-center w-full'>

                <h2 className='text-2xl font-bold text-neutral-50'>{word}</h2>
                <p className='text-lg text-neutral-200'>{meaning}</p>
                <p className='text-sm text-gray-400'>{format(`${date}`, "yyyy-MM-dd")}</p>
            </div>


            <div>
                <Icons.delete className="cursor-pointer" onClick={() => deleteHandler({ _id })} />
            </div>
        </div>
    );
};

export default WordCard;