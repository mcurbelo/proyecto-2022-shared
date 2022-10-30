import { DtAltaProducto, DtFiltoReclamo, EstadoCompra, listados, TipoReclamo } from "./VendedorService";
export declare const enviarSolicitudVendedor: (solicitud: Dtsolicitud, imagenes: File[], token: String) => Promise<String>;
export declare const agregarDireccion: (token: string, direccion: DtDireccion) => Promise<{
    success: any;
}>;
export declare const editarDireccion: (token: string, direccion: DtDireccion) => Promise<{
    status: number;
}>;
export declare const obtenerDirecciones: (token: string) => Promise<DtDireccion[]>;
export declare const nuevaCompra: (idUsuario: string, token: string, datos: DtCompra) => Promise<String>;
export declare const listarCompras: (idUsuario: string, token: string, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltrosCompras) => Promise<listados>;
export declare const reclamosHechos: (idUsuario: string, token: string, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltoReclamo) => Promise<listados>;
export declare const nuevoReclamo: (idUsuario: string, token: string, idCompra: string, datos: DtAltaReclamo) => Promise<String>;
export declare const marcarReclamoResuelto: (idUsuario: string, token: string, idCompra: string, idReclamo: string) => Promise<String>;
export declare type DtCompra = {
    idVendedor: string;
    idProducto: string;
    cantidad: number;
    codigoCanje?: string;
    idTarjeta: string;
    esParaEnvio: boolean;
    idDireccionEnvio?: number;
    idDireccionLocal?: number;
};
declare type Dtsolicitud = {
    nombreEmpresa?: string;
    rut?: string;
    telefonoEmpresa?: string;
    producto: DtAltaProducto;
    idDireccion: string;
};
export declare type DtDireccion = {
    id?: string;
    calle: string;
    numero: number;
    departamento: string;
    localidad: string;
    notas: string;
    esLocal: boolean;
};
declare type DtFiltrosCompras = {
    fecha?: string;
    nombreVendedor?: string;
    nombreProducto?: string;
    estado?: EstadoCompra;
};
declare type DtAltaReclamo = {
    descripcion: string;
    tipo: TipoReclamo;
};
export {};
