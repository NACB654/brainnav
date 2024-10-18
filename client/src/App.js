import './App.css';
import Header from "./components/Header";
import {useState} from "react";
import Start from "./Start";
import Results from "./Results";
import Test from "./Test";

function App() {
  const [showStart, setShowStart] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [difficulty, setDifficulty] = useState("0");

  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  }

  const handleStart = () => {
    setShowStart(false);
    setShowGame(true);
    setShowResult(false);
  }

  const handleTest = () => {
    setShowGame(false);
    setShowResult(true);
  }

  const handleResults = () => {
    setShowStart(true);
    setShowResult(false);
  }

  return (
    <div>
      <Header/>
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: "60vh",
      }}>
        {showStart && (
          <Start difficulty={handleDifficulty} onClick={handleStart}/>
        )}
        {showGame && (
          <Test onClick={handleTest}/>
        )}
        {showResult && (
          <Results onClickR={handleStart} onClickS={handleResults}/>
        )}
      </main>
    </div>
  );
}

export default App;
