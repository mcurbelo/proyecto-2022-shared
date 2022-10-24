import { listados } from "./VendedorService";
export declare const listarProductos: (pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltros) => Promise<listados>;
export declare type DtFiltros = {
    recibirInfoEventoActivo?: boolean;
    nombre?: string;
    categorias?: string[];
    idEventoPromocional?: string;
};
