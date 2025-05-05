import mongoose, { Schema } from 'mongoose';

const WordSchema: Schema = new Schema(
    {
        word: { type: String, required: true },
        meaning: { type: String, required: true },
        date: { type: String, required: true, unique: true, index: true },
    },
    { timestamps: true }
);


export default mongoose.models.Word || mongoose.model('Word', WordSchema);
