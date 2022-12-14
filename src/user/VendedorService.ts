import axios, { AxiosError } from "axios"
import { Auth } from ".."
import { DtCategoria } from "./CategoriaService";
import { UpdateResponse } from "./UserService";

export const altaProducto = (datosProducto: DtAltaProducto, imagenes: File[], token: String): Promise<String> => {
    const json = JSON.stringify(datosProducto);
    const blob = new Blob([json], {
        type: 'application/json'
    });
    const data = new FormData();
    data.append("datos", blob);
    imagenes.forEach((imagen: File) => {
        data.append("imagenes", imagen);
    })

    return axios.post(`http://${Auth.endpoint}/api/productos`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        }
    })
}

export const cambiarEstadoProducto = (idUsuario: String, token: String, idProducto: String, nuevoEstado: EstadoProducto,): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/vendedores/${idUsuario}/productos/${idProducto}/estado?nuevoEstado=${nuevoEstado}`, {}, {
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

export const listarMisProductos = (idUsuario: String, token: String, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltrosMisProductos): Promise<listados> => {
    const searchParams = new URLSearchParams();
    if (pageNo != "") searchParams.append("pageNo", pageNo);
    if (pageSize != "") searchParams.append("pageSize", pageSize);
    if (sortBy != "") searchParams.append("sortBy", sortBy);
    if (sortDir != "") searchParams.append("sortDir", sortDir);
    if (filtros.categorias != undefined && filtros.categorias?.length > 0) {
        filtros.categorias.forEach(categoria => searchParams.append("categorias", categoria));
    }
    if (filtros.estadoProducto != undefined) searchParams.append("estado", filtros.estadoProducto.toString());
    if (filtros.fecha != undefined) searchParams.append("fecha", filtros.fecha);
    if (filtros.nombre != undefined) searchParams.append("nombre", filtros.nombre);
    return axios.get(`http://${Auth.endpoint}/api/vendedores/${idUsuario}/productos?${searchParams.toString()}`, {
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

export const listarMisVentas = (idUsuario: String, token: String, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltrosVentas): Promise<listados> => {
    const searchParams = new URLSearchParams();
    if (pageNo != "") searchParams.append("pageNo", pageNo);
    if (pageSize != "") searchParams.append("pageSize", pageSize);
    if (sortBy != "") searchParams.append("sortBy", sortBy);
    if (sortDir != "") searchParams.append("sortDir", sortDir);
    if (filtros.fecha != undefined) searchParams.append("fecha", filtros.fecha);
    if (filtros.nombre != undefined) searchParams.append("nombre", filtros.nombre);
    if (filtros.estado != undefined) searchParams.append("estado", filtros.estado.toString());
    return axios.get(`http://${Auth.endpoint}/api/vendedores/${idUsuario}/ventas?${searchParams.toString()}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error.response.data.message;;
        })
}

export const gestionarReclamo = (idUsuario: String, token: String, idVenta: String, idReclamo: String, accion: TipoResolucion): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/vendedores/${idUsuario}/ventas/${idVenta}/reclamos/${idReclamo}?accion=${accion}`, {}, {
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

export const cambiarEstadoVenta = (idUsuario: String, token: String, idVenta: String, accion: EstadoCompra, info: DtConfirmarCompra): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/vendedores/${idUsuario}/ventas/${idVenta}/estado?nuevoEstado=${accion}`, info, {
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

export const completarVentaRetiro = (idUsuario: String, token: String, idVenta: String): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/vendedores/${idUsuario}/ventas/${idVenta}/estado?nuevoEstado=Completada`, {}, {
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

export const listarReclamosRecibidos = (idUsuario: String, token: String, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltoReclamo): Promise<listados> => {
    const searchParams = new URLSearchParams();
    if (pageNo != "") searchParams.append("pageNo", pageNo);
    if (pageSize != "") searchParams.append("pageSize", pageSize);
    if (sortBy != "") searchParams.append("sortBy", sortBy);
    if (sortDir != "") searchParams.append("sortDir", sortDir);
    if (filtros.resolucion != undefined) searchParams.append("resolucion", filtros.resolucion.toString());
    if (filtros.tipo != undefined) searchParams.append("tipo", filtros.tipo.toString());
    if (filtros.fecha != undefined) searchParams.append("fecha", filtros.fecha);
    if (filtros.nombreProducto != undefined) searchParams.append("nombreProducto", filtros.nombreProducto);
    if (filtros.nombreUsuario != undefined) searchParams.append("nombreUsuario", filtros.nombreUsuario);
    return axios.get(`http://${Auth.endpoint}/api/vendedores/${idUsuario}/ventas/reclamos?${searchParams.toString()}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error.response.data.message;;
        })
}

export const modificarProducto = (idUsuario: String, token: String, idProducto: string, datos: DtModificarProducto, imagenes: File[]): Promise<UpdateResponse> => {
    const json = JSON.stringify(datos);
    const blob = new Blob([json], {
        type: 'application/json'
    });
    const data = new FormData();
    data.append("datos", blob);
    imagenes.forEach((imagen: File) => {
        data.append("imagenes", imagen);
    })

    return axios.put(`http://${Auth.endpoint}/api/vendedores/${idUsuario}/productos/${idProducto}`, data, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
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

export const estadisticasVenedor = (idUsuario: String, token: String, tipo: EstVendedor, fechaInicio: string, fechaFin: string): Promise<EstaditicasResponse> => {
    const searchParams = new URLSearchParams();
    if (fechaInicio != "") searchParams.append("fechaInicio", fechaInicio)
    if (fechaFin != "") searchParams.append("fechaFin", fechaFin)
    return axios.get(`http://${Auth.endpoint}/api/vendedores/${idUsuario}/estadisticas/${tipo}?${searchParams.toString()}`, {
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


export type DtConfirmarCompra = {
    fechayHoraRetiro?: string,
    fechayHoraEntrega?: string,
    motivo?: string
}


export type DtAltaProducto = {
    nombreProducto: string
    stock: number
    descripcion: string
    fechaFin?: string
    precio: number
    diasGarantia: number
    permiteEnvio: boolean
    categorias: string[]
}

export type DtFiltrosMisProductos = {
    fecha?: string,
    nombre?: string,
    categorias?: string[],
    estadoProducto?: EstadoProducto
}

export type DtFiltoReclamo = {
    fecha?: string,
    nombreProducto?: string,
    nombreUsuario?: string,
    tipo?: TipoReclamo,
    resolucion?: TipoResolucion
}

export type DtFiltrosVentas = {
    fecha?: string,
    nombre?: string,
    estado?: EstadoCompra
}

export type DtMiProducto = {
    id: number,
    idProducto: string,
    nombre: string,
    imagenes: string[],
    fechaInicio: string,
    fechaFin: string,
    categorias: string[],
    precio: number,
    stock: number,
    estado: EstadoProducto,
    descripcion: string,
    permiteEnvio: boolean,
    garantia: number
}

export type DtCompraSlimVendedor = {
    idVenta: string,
    idComprador: string,
    nombreComprador: string,
    nombreProducto: string,
    cantidad: number,
    fecha: Date,
    estadoCompra: EstadoCompra,
    montoTotal: number,
    montoUnitario: number,
    imagenURL: string,
    fechaEntrega?: string,
    puedeCalificar: boolean,
    puedeCompletar: boolean
    esEnvio: boolean,
    direccionEntrega: string,
    calificacionComprador: number,
    tieneChat: boolean
}

export type DtCompraSlimComprador = {
    idCompra: string,
    idVendedor: string,
    nombreVendedor: string,
    nombreProducto: string,
    cantidad: number,
    fecha: Date,
    estadoCompra: EstadoCompra,
    montoTotal: number,
    montoUnitario: number,
    imagenURL: string,
    esEnvio: boolean,
    puedeCompletar: boolean,
    puedeCalificar: boolean,
    puedeReclamar: boolean
    fechaEntrega?: Date
    direccionEntrega: string,
    garantiaActiva: boolean,
    tieneChat: boolean
}

export type DtReclamo = {
    datosCompra: DtInfoCompra,
    tipo: TipoReclamo,
    estado: TipoResolucion,
    fechaRealizado: Date,
    autor: string,
    idReclamo: string,
    descripcion: string,
    tieneChat: boolean
}


export type DtProductoSlim = {
    idProducto: string,
    nombre: string,
    imagen: string,
    precio: number,
    stock: number
    permiteEnvio: boolean
}

export type listados = {
    misProductos?: DtMiProducto[],
    ventas?: DtCompraSlimVendedor[],
    reclamos?: DtReclamo[],
    productos?: DtProductoSlim[],
    compras?: DtCompraSlimComprador[],
    usuarios?: DtUsuarioSlim[],
    solicitudes?: DtSolicitudPendiente[],
    currentPage: number,
    totalItems: number,
    totalPages: number,
}


export type DtInfoCompra = {
    idCompra: string,
    idVendedor: string,
    nombreVendedor: string,
    nombreProducto: string,
    cantidad: number,
    fecha: Date,
    estadoCompra: EstadoCompra,
    montoTotal: number,
    montoUnitario: number,
    fechaEntrega: string,
    direccionEntrega: string,
    esEnvio: boolean,
    avatarVendedor: string,
    avatarComprador: string,
    imagenProducto: string
}

export type DtUsuarioSlim = {
    id: string,
    correo: string,
    nombre: string,
    apellido: string,
    estadoUsuario: string
}

export type DtModificarProducto = {
    descripcion?: string,
    fechaFin?: string,
    precio?: number,
    stock?: number,
    imagenesQuitar?: number[],
    permiteEnvio?: boolean
}

export type DtSolicitudPendiente = {
    producto: DtMiProducto,
    nombreApellido: string,
    calificacion: number,
    imagenPerfil: string,
    correo: string,
    telefono?: string,
    nombreEmpresa?: string,
    telefonoEmpresa?: string,
    rut?: string,
    direccionLocal: string,
    idSolicitante: string
}


export type EstaditicasResponse = {
    balance?: DtBalance,
    top10?: DtTopProductosVendidos[],
    mejoresCalificados?: DtProductosMejoresCalificados[],

}

export type DtBalance = {
    totalGanado: number,
    ganadoPorEnvio: number,
    ganadoPorRetiro: number,
    cantidadPorEnvio: number,
    cantidadPorRetiro: number,
    perdidoPorComision: number
}

export type DtTopProductosVendidos = {
    nombre: string,
    cantidad: number
}

export type DtProductosMejoresCalificados = {
    nombre: string,
    calificacion: number,
    cantidad: number
}

export enum TipoResolucion {
    Devolucion = "Devolucion", PorChat = "PorChat", NoResuelto = "NoResuelto"
}

export enum TipoReclamo {
    DesperfectoProducto = "DesperfectoProducto", RepticionIncoveniente = "RepticionIncoveniente", ProductoNoRecibido = "ProductoNoRecibido", ProducoErroneo = "ProducoErroneo", Otro = "Otro"
}

export enum EstadoProducto {
    Activo = "Activo", Pausado = "Pausado", BloqueadoADM = "BloqueadoADM"
}

export enum EstadoCompra {
    Cancelada = "Cancelada",
    Completada = "Completada",
    Confirmada = "Confirmada",
    EsperandoConfirmacion = "EsperandoConfirmacion",
    Devolucion = "Devolucion"
}

export enum EstVendedor {
    Todas = "Todas",
    Balance = "Balance",
    Top10ProdVendidos = "Top10ProdVendidos",
    Top10ProdCalificados = "Top10ProdCalificados"
}

