import { useState, useEffect } from 'react';
import Buttons from "./Buttons";

const GameTarget = ({onClick, onRestart, setFinalScore}) => {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState(60);

  const getRandomPosition = () => {
    const container = document.getElementById('game-container');
    const maxX = container.offsetWidth - 100;
    const maxY = container.offsetHeight - 100;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    return { x: randomX, y: randomY };
  };

  const moveTarget = () => {
    const newPosition = getRandomPosition();
    setPosition(newPosition);
  };

  const handleClick = () => {
    setScore(score + 1);
    setFinalScore(score + 1)
    moveTarget();
  };

  const handleRestart = () => {
    setScore(0);
    setFinalScore(0);
    setTimeLeft(60);
    moveTarget();
    onRestart()
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    moveTarget();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <div id="game-container" style={{
        width: '20vw',
        height: '20vh',
        borderRadius: '10px',
        border: "1px solid",
        marginTop: "25px",
        position: "relative",
        overflow: "hidden"
      }}>
        <img
          src={"/target.png"}
          alt="Target"
          style={{ top: `${position.y}px`, left: `${position.x}px`, position: 'absolute', width: '100px', cursor: 'pointer' }}
          onClick={handleClick}
        />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: "15px"
      }}>
        <div>
          <p style={{fontFamily: "Roboto", fontSize: "18px", marginTop: "0"}}>Objetivos alcanzados: {score}</p>
          <p style={{fontFamily: "Roboto", fontSize: "18px"}}>Tiempo
            restante: {timeLeft > 0 ? `${timeLeft}s` : "Tiempo terminado"}</p>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          <Buttons label={"Reiniciar"} onClick={handleRestart} />
          <Buttons label={"Finalizar"} onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default GameTarget;
