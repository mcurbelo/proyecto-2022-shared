import axios from "axios"
import { Auth } from ".."
import { listados } from "./VendedorService";

export const cambiarEstadoUsuario = (idUsuario: string, token: string, motivo: DtMotivo, nuevoEstado: EstadoUsuario): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/administradores/usuarios/${idUsuario}?operacion=${nuevoEstado}`, motivo).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}

export const revisarSolicitudNuevoVendedor = (idUsuario: string, token: string, aceptar: Boolean, motivo: DtMotivo): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/administradores/usuarios/${idUsuario}/solicitudes?aceptar=${aceptar}`, motivo).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}


export const nuevoAdministrador = (token: string, datos: DtAltaAdm): Promise<String> => {
    return axios.post(`http://${Auth.endpoint}/api/administradores`, datos).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}

export const listadoUsuarios = (token: String, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltrosUsuario): Promise<listados> => {
    const searchParams = new URLSearchParams();
    if (pageNo != "") searchParams.append("pageNo", pageNo);
    if (pageSize != "") searchParams.append("pageSize", pageSize);
    if (sortBy != "") searchParams.append("sortBy", sortBy);
    if (sortDir != "") searchParams.append("sortDir", sortDir);
    if (filtros.nombre != undefined) searchParams.append("nombre", filtros.nombre);
    if (filtros.apellido != undefined) searchParams.append("apellido", filtros.apellido);
    if (filtros.correo != undefined) searchParams.append("correo", filtros.correo);
    if (filtros.estado != undefined) searchParams.append("estado", filtros.estado.toString());
    return axios.get(`http://${Auth.endpoint}/api/usuarios`).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error.response.data.message;;
        })
}



export type DtMotivo = {
    motivo: string,
}

export enum EstadoUsuario {
    Activo = "Activo", Bloqueado = "Bloqueado", Eliminado = "Eliminado"
}

export type DtAltaAdm = {
    correo: string,
    nombre: string,
    apellido: string
}

export type DtFiltrosUsuario = {
    nombre: string,
    apellido: string,
    correo: string,
    estado: EstadoUsuario
}