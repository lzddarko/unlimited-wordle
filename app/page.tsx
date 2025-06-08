import Game from "./components/game";


export default function Home() {
  return (
    <div className="m-10 flex-row items-center justify-center text-center">
      <h1 className="m-10 text-4xl">Unlimited Wordle</h1>

      <Game />
    </div>
  );
}