import CharSquare from "@/components/atoms/charSquare";
import Word from "@/components/molecules/word";
import GameBoard from "@/components/organs/gameBoard";
import KeyBoard from "@/components/organs/KeyBoard";
import NavBar from "@/components/organs/navBar";
import "@/style/style.css"

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="items-center justify-items-center pb-20 pt-0 gap-16 font-[family-name:var(--font-geist-sans)]  bg-zinc-900 text-white w-full flex flex-col  mx-auto">
        <div className="header w-full">
          <NavBar />
        </div>
        <div className="content">
          <GameBoard />
        </div>
      </div>
      <div className="keyboard mb-14">
        <KeyBoard />
      </div>
    </div>
  );
}
