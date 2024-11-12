import GameTarget from "./components/GameTarget";

export default function Test ({onClick, onRestart, setFinalScore}) {
  return (
    <GameTarget onClick={onClick} onRestart={onRestart} setFinalScore={setFinalScore} />
  )
}