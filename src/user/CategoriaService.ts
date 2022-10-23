import axios from "axios"
import { Auth } from ".."

export const listarProductos = (): Promise<DtCategoria[]> => {
    return axios.get(`http://${Auth.endpoint}/api/categorias`).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}

export const agregarCategoria = (nombre: DtCategoria, token: string): Promise<String> => {
    return axios.post(`http://${Auth.endpoint}/api/categorias`, nombre).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}





export type DtCategoria = {
    nombre: string,
}
