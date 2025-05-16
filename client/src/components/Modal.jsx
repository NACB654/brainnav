import { useState } from 'react';
import Buttons from "./Buttons";
import serverAPI from "../api/serverApi";

export default function ModalCalibrate() {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setisLoading] = useState(true);

    const startCalibration = async () => {
        setShowModal(true)

        const result = await serverAPI.calibrateGyro()
        if (result) {
            setisLoading(false)
        }
    }

    return (
        <div>
            <Buttons label={"Calibrar"} secondary onClick={startCalibration}/>
            <div style={{
                display: showModal ? "block" : "none",
                position: "fixed",
                zIndex: 999,
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                overflow: "auto",
                backgroundColor: "rgba(0, 0, 0, 0.5)"
            }}>
                <div style={{
                    backgroundColor: "#ffffff",
                    margin: "15% auto",
                    padding: "20px",
                    borderRadius: "8px",
                    width: "80%",
                    maxWidth: "400px",
                }}>
                    {isLoading && (
                        <h2>Calibrando giroscopio. No te muevas</h2>
                    )}
                    {!isLoading && (
                        <>
                            <h2>Calibración completa</h2>
                            <Buttons label={"Cerrar"} onClick={() => setShowModal(false)}/>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}