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
    } catch (err: any) {
        console.log({ err })
        // Handle duplicate key error (code 11000)
        if (err.code === 11000 && err.keyPattern?.day) {
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
}