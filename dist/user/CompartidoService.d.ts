export declare const listarProductos: (idUsuario: String, token: String, pageNo: String, pageSize: String, sortBy: String, sortDir: String, filtros: DtFiltros) => Promise<String>;
export declare type DtFiltros = {
    recibirInfoEventoActivo?: boolean;
    nombre?: String;
    categorias?: [String];
    idEventoPromocional?: String;
};
