export declare const listarCategorias: () => Promise<DtCategoria[]>;
export declare const agregarCategoria: (nombre: DtCategoria, token: string) => Promise<String>;
export declare type DtCategoria = {
    nombre: string;
};
