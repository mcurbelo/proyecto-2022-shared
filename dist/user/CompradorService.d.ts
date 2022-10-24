import { DtAltaProducto, DtFiltoReclamo, EstadoCompra, listados, TipoReclamo } from "./VendedorService";
export declare const enviarSolicitudVendedor: (solicitud: Dtsolicitud, imagenes: File[], token: String) => Promise<String>;
export declare const nuevaDireccion: (token: string, datos: DtDireccion) => Promise<String>;
export declare const nuevaCompra: (token: string, datos: DtCompra) => Promise<String>;
export declare const listarCompras: (idUsuario: string, token: string, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltrosCompras) => Promise<listados>;
export declare const reclamosHechos: (idUsuario: string, token: string, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltoReclamo) => Promise<listados>;
export declare const nuevoReclamo: (idUsuario: string, token: string, idCompra: string, datos: DtAltaReclamo) => Promise<String>;
export declare const marcarReclamoResuelto: (idUsuario: string, token: string, idCompra: string, idReclamo: string) => Promise<String>;
declare type DtCompra = {
    idcomprador: string;
    correoComprador: string;
    idVendedor: string;
    idProducto: string;
    cantidad: number;
    codigoCanje: string;
    idTarjeta: string;
    esParEnvio: boolean;
    idDireccionEnvio?: number;
    idDireccionLocal?: number;
};
declare type Dtsolicitud = {
    nombreEmpresa?: string;
    rut?: string;
    telefonoEmpresa?: string;
    producto: DtAltaProducto;
    local?: {
        calle: string;
        numero: string;
        departamento: string;
        notas: string;
    };
    idDireccion?: number;
};
declare type DtDireccion = {
    calle: string;
    numero: string;
    departamento: string;
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
