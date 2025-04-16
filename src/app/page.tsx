import CharSquare from "@/components/atoms/charSquare";
import Word from "@/components/molecules/word";
import GameBoard from "@/components/organs/gameBoard";

export default function Home() {
  console.log("Home component rendered");
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]  bg-zinc-900 text-white">
      <div className="header"></div>
      <div className="content">
        <GameBoard />
      </div>
      <div className="keyboard"></div>
    </div>
  );
}
