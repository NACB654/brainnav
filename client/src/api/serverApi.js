const url = "http://localhost:5000/run"

const runCortex = async () => {
    const response = await fetch(url, {
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

const serverAPI = {runCortex}

export default serverAPI;