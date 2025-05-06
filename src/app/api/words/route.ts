import { dbConnect } from '@/db/connection';
import Word from '@/db/models/Word';
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-static'


export async function GET(req: NextRequest) {
    await dbConnect();
    const searchParams = req.nextUrl.searchParams;
    let page = +(searchParams.get("page") || 1);
    if (isNaN(page) || page < 1) {
        page = 1;
    }
    const words = await Word.find({}).sort({ date: 1 }).limit(10).skip((page - 1) * 10).exec();
    return NextResponse.json(words)
}


export async function DELETE(req: NextRequest) {
    await dbConnect();
    const id = req.nextUrl.searchParams.get("id") as string;
    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });

    const toBeDeleted = await Word.findById(id).exec();

    if (!toBeDeleted) return NextResponse.json({ message: "Word not found" }, { status: 404 });

    if (toBeDeleted.date == (new Date()).toISOString().split('T')[0]) {
        //  it's the daily word and can't be deleted
        return NextResponse.json({ message: "You can't delete the today word" }, { status: 400 });
    }

    await Word.deleteOne({ _id: id }).exec();

    return NextResponse.json({ message: "successfully deleted" })
}