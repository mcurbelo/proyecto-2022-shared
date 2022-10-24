import axios from "axios"
import { DtAltaProducto, DtFiltoReclamo, EstadoCompra, listados, TipoReclamo } from "./VendedorService"
import { Auth } from ".."

export const enviarSolicitudVendedor = (solicitud: Dtsolicitud, imagenes: File[], token: String): Promise<String> => {
    const json = JSON.stringify(solicitud);
    const blob = new Blob([json], {
        type: 'application/json'
    });
    const data = new FormData();
    data.append("datos", blob);
    imagenes.forEach((imagen: File) => {
        data.append("imagenes", imagen);
    })
    return axios.post(`http://${Auth.endpoint}/api/compradores/solicitudVendedor`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    }).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}

export const nuevaDireccion = (token: string, datos: DtDireccion): Promise<String> => {
    return axios.post(`http://${Auth.endpoint}/api/compradores/agregarDireccion`, datos, {
    }).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}


export const nuevaCompra = (token: string, datos: DtCompra): Promise<String> => {
    return axios.post(`http://${Auth.endpoint}/api/compras`, datos, {
    }).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}

export const listarCompras = (idUsuario: string, token: string, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltrosCompras): Promise<listados> => {
    const searchParams = new URLSearchParams();
    if (pageNo != "") searchParams.append("pageNo", pageNo);
    if (pageSize != "") searchParams.append("pageSize", pageSize);
    if (sortBy != "") searchParams.append("sortBy", sortBy);
    if (sortDir != "") searchParams.append("sortDir", sortDir);
    if (filtros.nombreProducto != undefined) searchParams.append("nombreProducto", filtros.nombreProducto);
    if (filtros.nombreVendedor != undefined) searchParams.append("nombreVendedor", filtros.nombreVendedor);
    if (filtros.fecha != undefined) searchParams.append("fecha", filtros.fecha);
    if (filtros.estado != undefined) searchParams.append("estado", filtros.estado.toString());
    return axios.get(`http://${Auth.endpoint}/api/compradores/${idUsuario}/compras?${searchParams.toString()}`, {
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}


export const reclamosHechos = (idUsuario: string, token: string, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltoReclamo): Promise<listados> => {
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
    return axios.get(`http://${Auth.endpoint}/api/compradores/${idUsuario}/compras/reclamos?${searchParams.toString()}`, {
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}

export const nuevoReclamo = (idUsuario: string, token: string, idCompra: string, datos: DtAltaReclamo): Promise<String> => {
    return axios.post(`http://${Auth.endpoint}/api/compradores/${idUsuario}/compras/${idCompra}/reclamos`, datos, {
    }).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}

export const marcarReclamoResuelto = (idUsuario: string, token: string, idCompra: string, idReclamo: string): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/compradores/${idUsuario}/compras/${idCompra}/reclamos/${idReclamo}`, {
    }).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}

type DtCompra = {
    idcomprador: string,
    correoComprador: string,
    idVendedor: string,
    idProducto: string,
    cantidad: number,
    codigoCanje: string,
    idTarjeta: string,
    esParEnvio: boolean,
    idDireccionEnvio?: number,
    idDireccionLocal?: number
}

type Dtsolicitud = {
    nombreEmpresa?: string
    rut?: string
    telefonoEmpresa?: string
    producto: DtAltaProducto,
    local?: {
        calle: string
        numero: string
        departamento: string
        notas: string
    }
    idDireccion?: number
}


type DtDireccion = {
    calle: string,
    numero: string,
    departamento: string,
    notas: string,
    esLocal: boolean
}


type DtFiltrosCompras = {
    fecha?: string,
    nombreVendedor?: string,
    nombreProducto?: string,
    estado?: EstadoCompra
}

type DtAltaReclamo = {
    descripcion: string,
    tipo: TipoReclamo,
}