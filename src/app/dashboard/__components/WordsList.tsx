"use client"
import { useWords } from '@/lib/hooks/useWords';
import WordCard from './WordCard';


export default function WordsList() {
    const { data, isError, isLoading, isSuccess } = useWords()

    return <div>
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold text-zinc-50 flex justify-center my-12  underline'>Words List</h1>
            {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'> */}
        <div className='flex flex-col gap-4'>
                {/* Check if the data is loading */}
                {isLoading && <p>Loading...</p>}
                {/* Check if there is an error */}
                {isError && <p>Error loading words</p>}
                {/* Map through the words and display them */}
                {isSuccess && data && data.map((data) => (
                    <WordCard key={data._id} _id={data._id} word={data.word} meaning={data.meaning} date={data.date} />
                ))}
            </div>
        </div>
    </div>;
};

