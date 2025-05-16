const url = "http://localhost:5000"

const runCortex = async () => {
    const response = await fetch(url.concat("/run"), {
        mode: "cors"
    })

    if (response.status === 200) {
        return response.json().then(json => {return json})
    }
    else {
        console.error("Error al obtener datos")
        return null
    }
}

const calibrateGyro = async () => {
    const response = await fetch(url.concat("/calibrate"), {
        mode: "cors"
    })

    if (response.status === 200) {
        return response.json().then(json => {return json})
    }
    else {
        console.error("Error al calibrar")
        return null
    }
}

const serverAPI = {runCortex, calibrateGyro}

export default serverAPI;