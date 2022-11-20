import { listados } from "./VendedorService";
export declare const cambiarEstadoUsuario: (idUsuario: string, token: string, motivo: DtMotivo, nuevoEstado: EstadoUsuario) => Promise<String>;
export declare const revisarSolicitudNuevoVendedor: (idUsuario: string, token: string, aceptar: Boolean, motivo?: DtMotivo | undefined) => Promise<String>;
export declare const nuevoAdministrador: (token: string, datos: DtAltaAdm) => Promise<String>;
export declare const listadoUsuarios: (token: string, pageNo?: string, pageSize?: string, sortBy?: string, sortDir?: string, filtros?: DtFiltrosUsuario | undefined) => Promise<listados>;
export declare const listadoSolicitudes: (token: string, pageNo: string, pageSize: string, sortBy: string, sortDir: string) => Promise<listados>;
export declare const estadisticasAdm: (idUsuario: String, token: String, tipo: EstAdm, fechaInicio: string, fechaFin: string) => Promise<EstaditicasResponseAdm>;
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
export declare enum EstAdm {
    Usuarios = "Usuarios",
    Ventas = "Ventas",
    Reclamos = "Reclamos"
}
export declare type UsuariosEst = {
    cantidadVendedores: number;
    cantidadSoloCompradores: number;
    cantidadActivos: number;
    cantidadBloqueados: number;
    cantidadEliminados: number;
};
export declare type UsuariosEstAll = {
    usuarios: UsuariosEst;
    admins: UsuariosEst;
    total: number;
};
export declare type VentasEst = {
    completadas: number;
    canceladas: number;
    reembolsadas: number;
    aceptadas: number;
    pendientes: number;
    total: number;
};
export declare type ReclamosEst = {
    resueltosChat: number;
    resueltosDevolucion: number;
    noResueltos: number;
    tipoDesperfecto: number;
    tipoRepeticion: number;
    tipoProductoNoRecibo: number;
    tipoProductoErroneo: number;
    tipoOtro: number;
    otro: number;
};
export declare type EstaditicasResponseAdm = {
    ventas?: VentasEst;
    reclamos?: ReclamosEst;
    usuarios?: UsuariosEstAll;
};
