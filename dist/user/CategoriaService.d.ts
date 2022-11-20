import { UpdateResponse } from "./UserService";
export declare const listarCategorias: () => Promise<DtCategoria[]>;
export declare const agregarCategoria: (nombre: DtCategoria, token: string) => Promise<UpdateResponse>;
export declare type DtCategoria = {
    nombre: string;
};
