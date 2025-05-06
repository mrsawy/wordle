import { dbConnect } from '@/db/connection';
import Word from '@/db/models/Word';
import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
    await dbConnect();
    const date = (new Date()).toISOString().split('T')[0];
    const word = await Word.findOne({ date }).exec();
    return NextResponse.json(word)
}
