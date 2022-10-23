import axios from "axios"
import { Auth } from ".."

export const listarProductos = (pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltros): Promise<String> => {
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
    if(filtros.recibirInfoEventoActivo) searchParams.append("infoEventoActivo", "true");
    return axios.get(`http://${Auth.endpoint}/api/productos`).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;;
        })
}


export type DtFiltros={
    recibirInfoEventoActivo?: boolean,
    nombre?: string,
    categorias?: string[],
    idEventoPromocional?: string
}