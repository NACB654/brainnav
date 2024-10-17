import Buttons from "./components/Buttons";
import Card from "./components/Card";

export default function Results ({onClickR, onClickS}){
  return (
    <>
      <h2 style={{fontFamily: "Roboto", fontSize: "28px", fontWeight: "bold", textAlign: "start"}}>Resultados</h2>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "30px"
      }}>
        <Card title={"Prueba"} bigNum={"20"} primary={"10 aciertos"} secondary={"50 faltantes"}/>
        <Card title={"Prueba"} bigNum={"20"} primary={"10 aciertos"} secondary={"50 fallidos"}/>
        <Card title={"Prueba"} bigNum={"20%"} primary={"10/20 total"} secondary={"aciertos/clics"}/>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: "30px",
        gap: "25px"
      }}>
        <Buttons label={"Reiniciar"} onClick={onClickR}/>
        <Buttons label={"Cambiar dificultad"} onClick={onClickS} secondary={true}/>
      </div>
    </>
  )
}