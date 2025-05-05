import { object, string, InferType, mixed } from 'yup';

export const wordSchema = object({
    word: string().required().length(5),
    meaning: string().required().min(5).max(50),
    date: mixed()
        .required("Date is required")
        .test("is-date-or-string", "Date must be a valid date or in YYYY-MM-DD format", value => {
            if (value instanceof Date && !isNaN(value.getTime())) return true;
            if (typeof value === "string") {
                return /^\d{4}-\d{2}-\d{2}$/.test(value);
            }
            return false;
        })
        // .transform(value => {
        //     if (value instanceof Date) {
        //         return value.toISOString().split("T")[0]; // "YYYY-MM-DD"
        //     }
        //     return value;
        // }),
});
export type WordSchemaType = InferType<typeof wordSchema>;