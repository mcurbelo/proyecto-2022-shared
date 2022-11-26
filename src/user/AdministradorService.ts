import axios from "axios"
import { Auth } from ".."
import { UpdateResponse } from "./UserService";
import { EstadoCompra, listados } from "./VendedorService";

export const cambiarEstadoUsuario = (idUsuario: string, token: string, motivo: DtMotivo, nuevoEstado: EstadoUsuario): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/administradores/usuarios/${idUsuario}?operacion=${nuevoEstado}`, motivo, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}

export const revisarSolicitudNuevoVendedor = (idUsuario: string, token: string, aceptar: Boolean, motivo?: DtMotivo): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/administradores/usuarios/${idUsuario}/solicitudes?aceptar=${aceptar}`, motivo, {
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


export const nuevoAdministrador = (token: string, datos: DtAltaAdm): Promise<CreateResponse> => {
    return axios.post(`http://${Auth.endpoint}/api/administradores`, datos, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
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

export const listadoUsuarios = (
    token: string,
    pageNo: string = "",
    pageSize: string = "",
    sortBy: string = "",
    sortDir: string = "",
    filtros?: DtFiltrosUsuario
): Promise<listados> => {
    const searchParams = new URLSearchParams();
    if (pageNo != "") searchParams.append("pageNo", pageNo);
    if (pageSize != "") searchParams.append("pageSize", pageSize);
    if (sortBy != "") searchParams.append("sortBy", sortBy);
    if (sortDir != "") searchParams.append("sortDir", sortDir);
    if (filtros?.nombre != undefined) searchParams.append("nombre", filtros.nombre);
    if (filtros?.apellido != undefined) searchParams.append("apellido", filtros.apellido);
    if (filtros?.correo != undefined) searchParams.append("correo", filtros.correo);
    if (filtros?.estado != undefined) searchParams.append("estado", filtros.estado.toString());
    return axios.get(`http://${Auth.endpoint}/api/usuarios?${searchParams.toString()}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then(response => response.data)
}

export const listadoSolicitudes = (
    token: string,
    pageNo: string,
    pageSize: string,
    sortBy: string,
    sortDir: string,
): Promise<listados> => {
    const searchParams = new URLSearchParams();
    if (pageNo != "") searchParams.append("pageNo", pageNo);
    if (pageSize != "") searchParams.append("pageSize", pageSize);
    if (sortBy != "") searchParams.append("sortBy", sortBy);
    if (sortDir != "") searchParams.append("sortDir", sortDir);
    return axios.get(`http://${Auth.endpoint}/api/administradores/solicitudes?${searchParams.toString()}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then(response => response.data)
}


export const estadisticasAdm = (token: String, tipo: EstAdm, fechaInicio: string, fechaFin: string): Promise<EstaditicasResponseAdm> => {
    const searchParams = new URLSearchParams();
    if (fechaInicio != "") searchParams.append("fechaInicio", fechaInicio)
    if (fechaFin != "") searchParams.append("fechaFin", fechaFin)
    return axios.get(`http://${Auth.endpoint}/api/administradores/estadisticas/${tipo}?${searchParams.toString()}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}


export const infoCompraDeshacer = (token: String, idCompra: string): Promise<InfoCompra> => {
    return axios.get(`http://${Auth.endpoint}/api/compras/${idCompra}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}

export const deshacerCompra = (token: String, idCompra: string): Promise<string> => {
    return axios.put(`http://${Auth.endpoint}/api/administradores/reembolsos/${idCompra}`, {}, {
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
    nombre?: string,
    apellido?: string,
    correo?: string,
    estado?: EstadoUsuario
}

export enum EstAdm {
    Usuarios = "Usuarios",
    Ventas = "Ventas",
    Reclamos = "Reclamos"
}

export type UsuariosEst = {
    cantidadVendedores: number;
    cantidadSoloCompradores: number;
    cantidadActivos: number;
    cantidadBloqueados: number;
    cantidadEliminados: number;
}

export type UsuariosEstAll = {
    usuarios: UsuariosEst
    admins: UsuariosEst
    total: number
    muestra: number
}

export type VentasEst = {
    completadas: number,
    canceladas: number,
    reembolsadas: number,
    aceptadas: number,
    pendientes: number,
    total: number
    muestra: number
}
export type ReclamosEst = {

    resueltosChat: number,
    resueltosDevolucion: number,
    noResueltos: number,
    tipoDesperfecto: number,
    tipoRepeticion: number,
    tipoProductoNoRecibo: number,
    tipoProductoErroneo: number,
    tipoOtro: number,
    otro: number
    muestra: number
    total: number
}


export type EstaditicasResponseAdm = {
    ventas?: VentasEst,
    reclamos?: ReclamosEst,
    usuarios?: UsuariosEstAll
}

export type InfoCompra = {
    idCompra: string,
    nombreComprador: string,
    nombreVendedor: string,
    nombreProducto: string,
    cantidad: number
    fecha: string,
    estadoCompra: EstadoCompra,
    montoTotal: number,
    montoUnitario: number,
    esEnvio: boolean,
    tieneReclamoNoResuelto: boolean,
    fechaEntrega: string
    direccionEntrega: string
    garantiaActiva: boolean
}

export type CreateResponse = {
    success: boolean;
    message?: string;
}