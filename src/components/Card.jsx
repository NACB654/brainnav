export default function Card({title, bigNum, primary, secondary}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "auto",
      width: "250px",
      padding: "15px",
      borderRadius: '10px',
      border: "1px solid"
    }}>
      <h3 style={{fontFamily: "Roboto", fontSize: "28px", margin: "0"}}>{title}</h3>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <p style={{fontFamily: "Roboto", fontSize: "65px", margin: "0"}}>{bigNum}</p>
        <div style={{display: "flex", flexDirection: "column"}}>
          <p style={{fontFamily: "Roboto", fontSize: "18px", marginBottom: "10px", marginTop: "10px"}}>{primary}</p>
          <p style={{fontFamily: "Roboto", fontSize: "18px", margin: "0"}}>{secondary}</p>
        </div>
      </div>
    </div>
  )
}