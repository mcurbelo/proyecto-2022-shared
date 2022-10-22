import axios from "axios"
import { Auth } from ".."

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
            "Authorization": `Bearer ${token}`
        },
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error;
        })
}

export const cambiarEstadoProducto = (idUsuario: String, idProducto: String, nuevoEstado: EstadoProducto, token: String): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/${idUsuario}/productos/${idProducto}/estado?nuevoEstado=${nuevoEstado}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error;
        })
}

export const listarMisProductos = (idUsuario: String, token: String, pageNo: String, pageSize: String, sortBy: String, sortDir: String, filtros: DtFiltrosMisProductos): Promise<listados> => {
    let consulta;
    if (pageNo != "") consulta = "pageNo=" + pageNo;
    if (pageSize != "") consulta = consulta + "&pageSize=" + pageSize;
    if (sortBy != "") consulta = consulta + "&sortBy=" + sortBy;
    if (sortDir != "") consulta = consulta + "&sortDir=" + sortDir;
    return axios.get(`http://${Auth.endpoint}/api/${idUsuario}/productos?${consulta}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        }, params: {
            filtros
        }
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error;
        })
}

export const listarMisVentas = (idUsuario: String, token: String, pageNo: String, pageSize: String, sortBy: String, sortDir: String, filtros: DtFiltrosVentas): Promise<listados> => {
    let consulta;
    if (pageNo != "") consulta = "pageNo=" + pageNo;
    if (pageSize != "") consulta = consulta + "&pageSize=" + pageSize;
    if (sortBy != "") consulta = consulta + "&sortBy=" + sortBy;
    if (sortDir != "") consulta = consulta + "&sortDir=" + sortDir;
    return axios.get(`http://${Auth.endpoint}/api/${idUsuario}/ventas?${consulta}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        }, params: {
            filtros
        }
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error;
        })
}

export const gestionarReclamo = (idUsuario: String, token: String, idVenta: String, idReclamo: String, accion: TipoResolucion): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/${idUsuario}/ventas/${idVenta}/reclamos/${idReclamo}?accion=${accion}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error;
        })
}

export const listarReclamosRecibidos = (idUsuario: String, token: String, pageNo: String, pageSize: String, sortBy: String, sortDir: String, filtros: DtFiltrosVentas): Promise<listados> => {
    let consulta;
    if (pageNo != "") consulta = "pageNo=" + pageNo;
    if (pageSize != "") consulta = consulta + "&pageSize=" + pageSize;
    if (sortBy != "") consulta = consulta + "&sortBy=" + sortBy;
    if (sortDir != "") consulta = consulta + "&sortDir=" + sortDir;
    return axios.get(`http://${Auth.endpoint}/api/${idUsuario}/ventas/reclamos?${consulta}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        params: {
            filtros
        }
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error;
        })
}



export type DtAltaProducto = {
    emailVendedor: string
    nombreProducto: string
    stock: number
    descripcion: string
    fechaFin?: string
    precio: number
    diasGarantia: number
    permiteEnvio: boolean
    categorias: [String]
    esSolicitud: boolean
}

export type DtFiltrosMisProductos = {
    fecha?: String,
    nombre?: String,
    categorias?: [String],
    estadoProducto?: EstadoProducto
}

export type DtFiltoReclamo = {
    fecha?: Date,
    nombreProducto?: String,
    nombreUsuario?: String,
    tipo?: TipoReclamo,
    resolucion?: TipoResolucion
}

export type DtFiltrosVentas = {
    fecha?: Date,
    nombre?: String,
    categorias?: [String],
    EstadoCompra?: EstadoCompra
}

export type DtMiProducto = {
    idProducto: String,
    nombre: String,
    imagenes: String,
    fechaInicio: Date,
    fechaFin: Date,
    categorias: [String],
    precio: Number,
    stock: Number,
    estadoProducto: EstadoProducto
}

export type DtCompraSlimVendedor = {
    idCompra: String,
    idComprador: String,
    nombreComprador: String,
    nombreProducto: String,
    cantidad: number,
    fecha: Date,
    estadoCompra: EstadoCompra,
    montoTotal: number,
    montoUnitario: number
}

export type DtCompraSlimComprador = {
    idCompra: String,
    idVendedor: String,
    nombreVendedor: String,
    nombreProducto: String,
    cantidad: number,
    fecha: Date,
    estadoCompra: EstadoCompra,
    montoTotal: number,
    montoUnitario: number
}

export type DtReclamo = {
datosCompra: DtCompraSlimComprador,
tipo: TipoReclamo,
estado: TipoResolucion,
fechaRealizado: Date,
autor: String
idReclamo:String;
}




export type listados = {
    productos?: DtMiProducto,
    ventas?: DtCompraSlimVendedor,
    reclamos?: DtReclamo,
    currentPage: Number,
    totalItems: Number,
    totalPages: Number
}

export enum TipoResolucion {
    Devolucion, PorChat, NoResuelto
}

export enum TipoReclamo {
    DesperfectoProducto, RepticionIncoveniente, ProductoNoRecibido, ProducoErroneo, Otro
}

export enum EstadoProducto {
    Activo, Pausado, BloqueadoADM
}

export enum EstadoCompra {
    Cancelada, Completada, Confirmada, EsperandoConfirmacion
}

