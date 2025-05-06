import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ arabicWord: string }> }) {

    const { arabicWord } = await params 

    const response = await fetch((process.env.AR_API as string) + arabicWord);
    const { status, ok } = response;
    const body = await response.json()

    return NextResponse.json({ status, body, ok }, { status })
}

