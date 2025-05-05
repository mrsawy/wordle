"use server";

import { dbConnect } from "@/db/connection";
import Word from "@/db/models/Word";
import { WordSchemaType } from "@/lib/schema";

export async function addNewWordAction(wordData: WordSchemaType) {
    try {

        await dbConnect();
        console.log({ wordData })
        const wordWithSameDate = await Word.findOne({ date: wordData.date });
        if (wordWithSameDate) {
            return {
                success: false,
                message: `A word for the date "${wordData.date}" already exists.`,
            };
        }
        await Word.create(wordData);
        return { success: true, message: "Word added successfully." };
    } catch (err: unknown) {
        console.log({ err })
        if (err instanceof Error) {
            // Handle duplicate key error (code 11000)
            if (
                // @ts-expect-error – custom Mongo error structure
                err.code === 11000 &&
                // @ts-expect-error – custom Mongo error structure
                err.keyPattern?.day
            ) {
                return {
                    success: false,
                    message: `A word for the date "${wordData.date}" already exists.`,
                };
            }
            // Generic error
            return {
                success: false,
                message: err.message || 'An unexpected error occurred.',
            };
        }

        return {
            success: false,
            message: "An unknown error occurred.",
        };
    }
}