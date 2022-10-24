import axios from "axios"
import { Auth } from ".."


export const completarEnvio = (idCompra: string, token: string): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/compras/enviadas/${idCompra}`).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}


export const calificar = (idCompra: string, token: string,datos: DtCalificacion ): Promise<String> => {
    return axios.post(`http://${Auth.endpoint}/api/compras/calificaciones/${idCompra}`, datos).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}


type DtCalificacion={
    puntuacion: number,
    comentario: string,
    autro: string,
}

