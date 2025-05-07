
import GameBoard from "@/components/organs/gameBoard";
import KeyBoard from "@/components/organs/KeyBoard";
import NavBar from "@/components/organs/navBar";
import "@/style/style.css"

import { dbConnect } from '@/db/connection';
import Word from '@/db/models/Word';



export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  await dbConnect();
  const date = (new Date()).toISOString().split('T')[0];
  const wordDoc = await Word.findOne({ date }).exec();
  const word = JSON.stringify(wordDoc?.toObject());

  console.log({ word, wordDoc });
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="header w-full">
        <NavBar />
      </div>
      <div className="items-center justify-items-center pt-0 gap-16 font-[family-name:var(--font-geist-sans)]  bg-zinc-900 text-white w-full h-full mx-auto flex flex-col justify-around mt-3">
        <div className="content">
          <GameBoard dailyWord={word} />
        </div>
        <div className="keyboard mb-14">
          <KeyBoard />
        </div>
      </div>
    </div>
  );
}
