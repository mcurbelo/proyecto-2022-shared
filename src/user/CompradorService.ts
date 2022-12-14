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
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        },
    })
}

export const agregarDireccion = (token: string, direccion: DtDireccion): Promise<{ success: boolean, message?: string }> => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios.post(`http://${Auth.endpoint}/api/compradores/agregarDireccion`, {
        calle: direccion.calle,
        numero: direccion.numero,
        departamento: direccion.departamento,
        localidad: direccion.localidad,
        notas: direccion.notas,
        esLocal: direccion.esLocal
    }, config).then((response) => {
        return { success: true };
    }).catch((error) => {
        return {
            success: false,
            message: error.response.data.message

        };
    })
}


export const borrarDireccion = (token: string, direccion: string, esLocal: boolean): Promise<{ status: number }> => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return axios.delete(`http://${Auth.endpoint}/api/compradores/Direccion/${direccion}?esLocal=${esLocal}`, config).then((response) => {
        return {
            status: response.status
        }
    }).catch((error) => {
        return {
            status: error.response.data.status
        }
    })
}



export const editarDireccion = (token: string, direccion: DtDireccion): Promise<{ status: number }> => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios.patch(`http://${Auth.endpoint}/api/compradores/Direcciones`, {
        id: direccion.id,
        calle: direccion.calle,
        numero: direccion.numero,
        departamento: direccion.departamento,
        localidad: direccion.localidad,
        notas: direccion.notas,
        esLocal: direccion.esLocal
    }, config).then((response) => {
        return {
            status: response.status
        }
    }).catch((error) => {
        return {
            status: error.response.data.status
        }
    })
}

export const obtenerDirecciones = (token: string): Promise<DtDireccion[]> => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios.get(`http://${Auth.endpoint}/api/compradores/Direcciones`, config).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data.status;
    })
}


export const nuevaCompra = (idUsuario: string, token: string, datos: DtCompra): Promise<String> => {
    return axios.post(`http://${Auth.endpoint}/api/compradores/${idUsuario}/compras`, datos, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    ).then((response) => {
        return response.status.toString();
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


export const reclamosHechos = (idUsuario: string, token: string, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltoReclamo): Promise<listados> => {
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
    return axios.get(`http://${Auth.endpoint}/api/compradores/${idUsuario}/compras/reclamos?${searchParams.toString()}`, {
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

export const nuevoReclamo = (idUsuario: string, token: string, idCompra: string, datos: DtAltaReclamo): Promise<String> => {
    return axios.post(`http://${Auth.endpoint}/api/compradores/${idUsuario}/compras/${idCompra}/reclamos`, datos, {
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

export const marcarReclamoResuelto = (idUsuario: string, token: string, idCompra: string, idReclamo: string): Promise<String> => {
    return axios.put(`http://${Auth.endpoint}/api/compradores/${idUsuario}/compras/${idCompra}/reclamos/${idReclamo}`, {}, {
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

export const obtenerChat = (idcompra: string, token: string): Promise<String> => {
    return axios.get(`http://${Auth.endpoint}/api/compras/chat/${idcompra}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => { });
}

export const iniciarChat = (idcompra: string, idchat: string, token: string): Promise<String> => {
    return axios.post(`http://${Auth.endpoint}/api/compras/iniciarChat`, { idCompra: idcompra, idChat: idchat }, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => { });
}

export const notificarRespuesta = (idChat: string, idUsuario: string, token: string): Promise<void> => {
    return axios.put(`http://${Auth.endpoint}/api/compras/chats/${idChat}/mensajes?idUsuario=${idUsuario}`, {}, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export type DtCompra = {
    idVendedor: string,
    idProducto: string,
    cantidad: number,
    codigoCanje?: string,
    idTarjeta: string,
    esParaEnvio: boolean,
    idDireccionEnvio?: number,
    idDireccionLocal?: number
}

type DtChat = {
    idCompra?: string,
    idChat?: string
}
type Dtsolicitud = {
    nombreEmpresa?: string
    rut?: string
    telefonoEmpresa?: string
    producto: DtAltaProducto,
    idDireccion: string
}


export type DtDireccion = {
    id: string,
    calle: string,
    numero: number,
    departamento: string,
    localidad: string,
    notas: string,
    esLocal: boolean
}


export type DtFiltrosCompras = {
    fecha?: string,
    nombreVendedor?: string,
    nombreProducto?: string,
    estado?: EstadoCompra
}

export type DtAltaReclamo = {
    descripcion: string,
    tipo: TipoReclamo,
}