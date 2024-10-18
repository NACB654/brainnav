export default function Buttons({label, onClick, secondary = false}) {
  return (
    <button style={{
      borderRadius: '10px',
      backgroundColor: secondary ? "white" : '#0A4377',
      width: "150px",
      height: "40px",
      color: secondary ? '#0A4377' : "white",
      fontWeight: 'bold',
      fontSize: '15px',
      cursor: 'pointer',
    }} onClick={onClick}>
      {label}
    </button>
  )
}