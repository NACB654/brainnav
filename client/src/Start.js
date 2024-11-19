import Buttons from "./components/Buttons";

export default function Start({onClick}) {
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
        justifyContent: "center"
      }}>
        <Buttons label={"Empezar"} onClick={onClick}/>
      </div>
    </>
  )
}