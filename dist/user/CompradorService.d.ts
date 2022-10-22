import { DtAltaProducto } from "./VendedorService";
export declare const enviarSolicitudVendedor: (solicitud: Dtsolicitud, imagenes: File[], token: String) => Promise<String>;
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
