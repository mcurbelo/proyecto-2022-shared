import { listados } from "./VendedorService";
export declare const cambiarEstadoUsuario: (idUsuario: string, token: string, motivo: DtMotivo, nuevoEstado: EstadoUsuario) => Promise<String>;
export declare const revisarSolicitudNuevoVendedor: (idUsuario: string, token: string, aceptar: Boolean, motivo?: DtMotivo) => Promise<String>;
export declare const nuevoAdministrador: (token: string, datos: DtAltaAdm) => Promise<String>;
export declare const listadoUsuarios: (token: string, pageNo?: string, pageSize?: string, sortBy?: string, sortDir?: string, filtros?: DtFiltrosUsuario) => Promise<listados>;
export declare const listadoSolicitudes: (token: string, pageNo: string, pageSize: string, sortBy: string, sortDir: string) => Promise<listados>;
export declare type DtMotivo = {
    motivo: string;
};
export declare enum EstadoUsuario {
    Activo = "Activo",
    Bloqueado = "Bloqueado",
    Eliminado = "Eliminado"
}
export declare type DtAltaAdm = {
    correo: string;
    nombre: string;
    apellido: string;
};
export declare type DtFiltrosUsuario = {
    nombre?: string;
    apellido?: string;
    correo?: string;
    estado?: EstadoUsuario;
};
