import Buttons from "./components/Buttons";

export default function Start({difficulty, onClick}) {
  return (
    <>
      <img src={"/logo.png"}/>
      <h1 style={{
        fontSize: "50px",
        fontFamily: "Roboto",
        color: "#0A4377"
      }}>BrainNav Test</h1>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: "30px",
        marginTop: "20px",
      }}>
        <select style={{
          width: '180px',
          borderRadius: '10px',
        }} onChange={difficulty}> >
          <option value={0}>Fácil</option>
          <option value={1}>Normal</option>
          <option value={2}>Difícil</option>
        </select>
        <Buttons label={"Empezar"} onClick={onClick}/>
      </div>
    </>
  )
}