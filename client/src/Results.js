import Buttons from "./components/Buttons";
import Card from "./components/Card";

export default function Results ({onClickR, onClickS, score}){

  return (
    <>
      <h2 style={{fontFamily: "Roboto", fontSize: "28px", fontWeight: "bold", textAlign: "start"}}>Resultados</h2>
      <div style={{
        display: "flex",
        flexDirection: "row",
        // gap: "30px"
        justifyContent: "center"
      }}>
        <Card title={"Prueba"} bigNum={`${score}`} primary={"aciertos"} secondary={""}/>
        {/* <Card title={"Prueba"} bigNum={`${score + blinks}`} primary={`${score} aciertos`} secondary={`${blinks - score}`}/>
        <Card title={"Prueba"} bigNum={`${accuracy}%`} primary={`${score}/${blinks} total`} secondary={"aciertos/clics"}/> */}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: "30px",
        gap: "25px"
      }}>
        <Buttons label={"Reiniciar"} onClick={onClickR}/>
        <Buttons label={"Regresar"} onClick={onClickS} secondary={true}/>
      </div>
    </>
  )
}