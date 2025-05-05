import { dbConnect } from '@/db/connection';
import Word from '@/db/models/Word';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    await dbConnect();
    const date = (new Date()).toISOString().split('T')[0];
    const word = await Word.findOne({ date }).exec();
    return NextResponse.json(word)
}
