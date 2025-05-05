
import GameBoard from "@/components/organs/gameBoard";
import KeyBoard from "@/components/organs/KeyBoard";
import NavBar from "@/components/organs/navBar";
import "@/style/style.css"

import { dbConnect } from '@/db/connection';
import Word from '@/db/models/Word';
export default async function Home() {
  await dbConnect();
  const date = (new Date()).toISOString().split('T')[0];
  const word = await Word.findOne({ date }).exec();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="items-center justify-items-center pb-20 pt-0 gap-16 font-[family-name:var(--font-geist-sans)]  bg-zinc-900 text-white w-full flex flex-col  mx-auto">
        <div className="header w-full">
          <NavBar />
        </div>
        <div className="content">
          <GameBoard dailyWord={word} />
        </div>
      </div>
      <div className="keyboard mb-14">
        <KeyBoard />
      </div>
    </div>
  );
}
