import axios from "axios"
import { Auth } from ".."
import { DtProductoSlim, listados } from "./VendedorService";

export const listarProductos = (pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltros): Promise<listados> => {
    const searchParams = new URLSearchParams();
    if (pageNo != "") searchParams.append("pageNo", pageNo);
    if (pageSize != "") searchParams.append("pageSize", pageSize);
    if (sortBy != "") searchParams.append("sortBy", sortBy);
    if (sortDir != "") searchParams.append("sortDir", sortDir);
    if (filtros.categorias != undefined && filtros.categorias?.length > 0) {
        filtros.categorias.forEach(categoria => searchParams.append("categorias", categoria));
    }
    if (filtros.nombre != undefined) searchParams.append("nombre", filtros.nombre);
    if (filtros.idEventoPromocional != undefined) searchParams.append("idEventoPromocional", filtros.idEventoPromocional);
    if (filtros.recibirInfoEventoActivo) searchParams.append("infoEventoActivo", "true");
    return axios.get(`http://${Auth.endpoint}/api/productos?${searchParams}`).then((response) => {
        return response.data

    })
        .catch((error) => {
            if (!error.response)
                return "Error de conexion"
            else
                return error.response.data.message;
        })
}

export const infoProducto = (idProducto: string): Promise<DtProducto> => {
    return axios.get(`http://${Auth.endpoint}/api/productos/${idProducto}`).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}





export type DtProducto = {
    idProducto: string,
    idVendedor: string,
    imagenes: string[],
    nombre: string,
    descripcion: string,
    precio: number,
    permiteEnvio: boolean,
    comentarios: Comentario[], //Revisar cuando se haga el tema de los comentarios
    nombreVendedor: string,
    calificacion: number,
    imagenDePerfil: string,
    localesParaRetiro: Direccion[]
    stock: number
    garantia: number
}

export type Direccion = {
    id: number,
    calle: string,
    numero: string,
    departamento: string,
    localidad: string,
    notas: string
}

export type Comentario = {
    id: string,
    comentario: string,
    fecha: Date, //No se
    nombreAutor: string,
    respuestas?: Comentario[]
}

export type DtFiltros = {
    recibirInfoEventoActivo?: boolean,
    nombre?: string,
    categorias: string[],
    idEventoPromocional?: string
}