import axios, { AxiosError } from "axios"
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

    return axios.post(`http://${Auth.endpoint}/api/productos`, data).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}

export const cambiarEstadoProducto = (idUsuario: String, token: String, idProducto: String, nuevoEstado: EstadoProducto, ): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/vendedores/${idUsuario}/productos/${idProducto}/estado?nuevoEstado=${nuevoEstado}`).then((response) => {
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
    return axios.get(`http://${Auth.endpoint}/api/vendedores/${idUsuario}/productos?${searchParams.toString()}`).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error.response.data.message;;
        })
}

export const listarMisVentas = (idUsuario: String, token: String, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltrosVentas): Promise<listados> => {
    const searchParams = new URLSearchParams();
    if (pageNo != "") searchParams.append("pageNo", pageNo);
    if (pageSize != "") searchParams.append("pageSize", pageSize);
    if (sortBy != "") searchParams.append("sortBy", sortBy);
    if (sortDir != "") searchParams.append("sortDir", sortDir);
    if (filtros.EstadoCompra != undefined) searchParams.append("estado", filtros.EstadoCompra.toString());
    if (filtros.fecha != undefined) searchParams.append("fecha", filtros.fecha);
    if (filtros.nombre != undefined) searchParams.append("nombre", filtros.nombre);
    return axios.get(`http://${Auth.endpoint}/api/vendedores/${idUsuario}/ventas?${searchParams.toString()}`).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error.response.data.message;;
        })
}

export const gestionarReclamo = (idUsuario: String, token: String, idVenta: String, idReclamo: String, accion: TipoResolucion): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/vendedores/${idUsuario}/ventas/${idVenta}/reclamos/${idReclamo}?accion=${accion}`).then((response) => {
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
    if (filtros.resolucion != undefined) searchParams.append("estado", filtros.resolucion.toString());
    if (filtros.tipo != undefined) searchParams.append("estado", filtros.tipo.toString());
    if (filtros.fecha != undefined) searchParams.append("fecha", filtros.fecha);
    if (filtros.nombreProducto != undefined) searchParams.append("nombre", filtros.nombreProducto);
    if (filtros.nombreUsuario != undefined) searchParams.append("nombre", filtros.nombreUsuario);
    return axios.get(`http://${Auth.endpoint}/api/vendedor/${idUsuario}/ventas/reclamos?${searchParams.toString()}`).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error.response.data.message;;
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
    categorias?: string[],
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
    autor: string
    idReclamo: string;
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
    Devolucion = "Devolucion", PorChat = "PorChat", NoResuelto = "PorChat"
}

export enum TipoReclamo {
    DesperfectoProducto = "DesperfectoProducto", RepticionIncoveniente = "RepticionIncoveniente", ProductoNoRecibido = "ProductoNoRecibido", ProducoErroneo = "ProducoErroneo", Otro = "Otro"
}

export enum EstadoProducto {
    Activo = "Activo", Pausado = "Pausado", BloqueadoADM = "BloqueadoADM"
}

export enum EstadoCompra {
    Cancelada = "Cancelada", Completada = "Completada", Confirmada = "Confirmada", EsperandoConfirmacion = "EsperandoConfirmacion"
}

