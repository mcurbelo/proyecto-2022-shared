import axios from "axios"
import { Auth } from ".."

export const listarProductos = (idUsuario: String, token: String, pageNo: String, pageSize: String, sortBy: String, sortDir: String, filtros: DtFiltros): Promise<String> => {
    let consulta;
    if (pageNo != "") consulta = "pageNo=" + pageNo;
    if (pageSize != "") consulta =  consulta + "&pageSize=" + pageSize;
    if (sortBy != "") consulta =  consulta + "&sortBy=" + sortBy;
    if (sortDir != "") consulta =  consulta + "&sortDir=" + sortDir;
    return axios.get(`http://${Auth.endpoint}/api/productos`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        params:{
            filtros
        }
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error;
        })
}


export type DtFiltros={
    recibirInfoEventoActivo?: boolean,
    nombre?: String,
    categorias?: [String],
    idEventoPromocional?: String
}