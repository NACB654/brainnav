import Header from "./components/Header";
import {useState} from "react";
import Start from "./Start";
import Results from "./Results";
import Test from "./Test";
import serverAPI from "./api/serverApi";

function App() {
  const [showStart, setShowStart] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleStart = async () => {
    setShowStart(false);
    setShowGame(true);
    setShowResult(false);
    setFinalScore(0);
    
    const result = await serverAPI.runCortex()
    console.log(result)
  }

  const handleRestart = () => {
    console.log("Restart")
  }

  const handleTest = () => {
    setShowGame(false);
    setShowResult(true);
    console.log(finalScore)
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
          <Start onClick={handleStart}/>
        )}
        {showGame && (
          <Test onClick={handleTest} onRestart={handleRestart} setFinalScore={setFinalScore} />
        )}
        {showResult && (
          <Results onClickR={handleStart} onClickS={handleResults} score={finalScore}/>
        )}
      </main>
    </div>
  );
}

export default App;
