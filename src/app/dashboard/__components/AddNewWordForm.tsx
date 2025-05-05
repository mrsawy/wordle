"use client"
import { wordSchema, WordSchemaType } from '@/lib/schema';
import React from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Calendar } from "@/components/ui/calendar"
import * as yup from "yup";



import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { addNewWordAction } from '@/actions/addNewWordAction';
import { ActionResponse } from '@/app/types/actionResponse';
import { useQueryClient } from '@tanstack/react-query';





interface IProps {
    className?: string;
}
export function AddNewWordForm({ className }: IProps) {
    const [date, setDate] = React.useState<Date | undefined | string>()
    const queryClient = useQueryClient()

    // 1. Define your form.
    const form = useForm<WordSchemaType>({
        resolver: yupResolver(wordSchema),
        // 1.1. Set default values.
        defaultValues: {
            word: "",
            meaning: "",
            date: undefined, // YYYY-MM-DD format
        },
    })

    return (
        <div className={className}        >
            <Form {...form}>
                <form
                    // onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 flex flex-col overflow-y-auto"

                    action={
                        async (formData: FormData) => {
                            try {
                                if (!date) { toast.error("Please select a date"); return }
                                const wordData: WordSchemaType = {
                                    ...Object.fromEntries(
                                        formData.entries()
                                    ) as Omit<WordSchemaType, 'date'>,
                                    date: format(date, "yyyy-MM-dd")
                                }
                                wordSchema.validateSync(wordData, { abortEarly: false })
                                const response: ActionResponse = await addNewWordAction(wordData)
                                if (response.success) {
                                    toast.success(response.message)
                                    form.reset()
                                    queryClient.invalidateQueries({ queryKey: ['words'] });
                                } else {
                                    toast.error(response.message)
                                }
                            } catch (error: unknown) {
                                if (error instanceof yup.ValidationError) {
                                    toast.error(error.errors[0]);
                                } else if (error instanceof Error) {
                                    toast.error(error.message);
                                } else {
                                    toast.error("An unknown error occurred");
                                }
                            }
                        }
                    }
                >
                    <FormField
                        control={form.control}
                        name="word"
                        render={({ field }) => (
                            <FormItem className='mb-1 sm:mb-4'>
                                <FormLabel>Word</FormLabel>
                                <FormControl>
                                    <Input className=' max-w-2.5:placeholder:text-xs ' placeholder="Enter a word" {...field} />
                                </FormControl>
                                <FormDescription className='hidden sm:flex'>
                                    add a new word to the 5 length words list
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="meaning"
                        render={({ field }) => (
                            <FormItem className='mb-1 sm:mb-4'>
                                <FormLabel>Meaning</FormLabel>
                                <FormControl>
                                    <Input className=' max-w-2.5:placeholder:text-xs ' placeholder="Enter the Meaning" {...field} />
                                </FormControl>
                                <FormDescription className='hidden sm:flex'>
                                    add the meaning of the word
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col mb-1 sm:mb-4">
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            onClick={() => {
                                                // Open the calendar manually if needed
                                            }}
                                            type='button'
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "yyyy-MM-dd") : "Pick a date"}
                                        </Button>
                                        <div className={cn(" m-auto")}>
                                            <Calendar
                                                mode="single"
                                                selected={date instanceof Date ? date : undefined}
                                                onSelect={(date) => setDate(date)}
                                                initialFocus
                                                className='border-2'
                                                disabled={(date) => {
                                                    const today = new Date();
                                                    today.setHours(0, 0, 0, 0); // remove time for accurate comparison
                                                    return date < today;
                                                }}
                                            />
                                        </div>
                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className='cursor-pointer'>Submit</Button>
                </form>
            </Form>
        </div>
    );
}