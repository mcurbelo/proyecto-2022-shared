import axios from "axios"
import { Auth } from ".."
import { UpdateResponse } from "./UserService"

export const listarCategorias = (): Promise<DtCategoria[]> => {
    return axios.get(`http://${Auth.endpoint}/api/categorias`).then((response) => {
        return response.data
    })
        .catch((error) => {
            return error.response.data.message;
        })
}

export const agregarCategoria = (nombre: DtCategoria, token: string): Promise<UpdateResponse> => {
    return axios.post(`http://${Auth.endpoint}/api/categorias`, nombre).then((response) => {
        return {
            success: true
        }
    })
        .catch((error) => {
            if (error.response.status.toString() !== "409") {
                return {
                    success: false,
                    message: "Error en el servidor"
                }
            } else {
                return {
                    success: false,
                    message: error.response.data.message
                }
            }
        })
}





export type DtCategoria = {
    nombre: string,
}
