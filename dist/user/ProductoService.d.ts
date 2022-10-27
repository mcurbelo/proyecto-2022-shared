import { listados } from "./VendedorService";
export declare const listarProductos: (pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltros) => Promise<listados>;
export declare const infoProducto: (idProducto: string) => Promise<DtProducto>;
export declare type DtProducto = {
    idProducto: string;
    idVendedor: string;
    imagenes: string[];
    nombre: string;
    descripcion: string;
    precio: number;
    permiteEnvio: boolean;
    comentarios: Comentario[];
    nombreVendedor: string;
    calificacion: number;
    imagenDePerfil: string;
    localesParaRetiro?: Direccion[];
    stock: number;
    garantia: number;
};
export declare type Direccion = {
    id: number;
    calle: string;
    numero: string;
    departamento: string;
    notas: string;
};
export declare type Comentario = {
    id: string;
    comentario: string;
    fecha: Date;
    nombreAutor: string;
    respuestas?: Comentario[];
};
export declare type DtFiltros = {
    recibirInfoEventoActivo?: boolean;
    nombre?: string;
    categorias: string[];
    idEventoPromocional?: string;
};
