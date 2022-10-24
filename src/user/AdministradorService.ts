import axios from "axios"
import { Auth } from ".."

export const cambiarEstadoUsuario = (idUsuario: string, token:string, motivo:DtMotivo, nuevoEstado: EstadoUsuario): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/administradores/usuarios/${idUsuario}?operacion=${nuevoEstado}`,motivo).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}

export const revisarSolicitudNuevoVendedor = (idUsuario: string, token:string, aceptar:Boolean, motivo:DtMotivo): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/administradores/usuarios/${idUsuario}/solicitudes?aceptar=${aceptar}`, motivo).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}


export const nuevoAdministrador = (token:string, datos:DtAltaAdm ): Promise<String> => {
    return axios.post(`http://${Auth.endpoint}/api/administradores`, datos).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}





export type DtMotivo = {
    motivo: string,
}

export enum EstadoUsuario {
    Activo = "Activo", Bloqueado = "Bloqueado", Eliminado = "Eliminado"
}

export type DtAltaAdm = {
    correo:string,
    nombre: string,
    apellido: string
}