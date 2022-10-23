import { DtAltaProducto } from "./VendedorService";
export declare const enviarSolicitudVendedor: (solicitud: Dtsolicitud, imagenes: File[], token: String) => Promise<String>;
export declare const nuevaCompra: (datos: DtCompra) => Promise<String>;
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
    email?: string;
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
export {};
