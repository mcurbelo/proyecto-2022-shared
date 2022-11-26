import axios from "axios"
import { Auth } from ".."


export const completarEnvio = (idCompra: string, token: string): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/compras/enviadas/${idCompra}`, {}, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.status.toString();
    })
        .catch((error) => {
            return error.response.data.message;
        })
}


export const calificar = (idCompra: string, token: string, datos: DtCalificacion): Promise<String> => {
    return axios.post(`http://${Auth.endpoint}/api/compras/calificaciones/${idCompra}`, datos, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.status.toString();
    })
        .catch((error) => {
            return error.response.data.message;
        })
}


export type DtCalificacion = {
    puntuacion: number,
    comentario: string,
    autor: string,
}

