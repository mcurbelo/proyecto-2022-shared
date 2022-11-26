import { EstadoCompra, listados } from "./VendedorService";
export declare const cambiarEstadoUsuario: (idUsuario: string, token: string, motivo: DtMotivo, nuevoEstado: EstadoUsuario) => Promise<String>;
export declare const revisarSolicitudNuevoVendedor: (idUsuario: string, token: string, aceptar: Boolean, motivo?: DtMotivo | undefined) => Promise<String>;
export declare const nuevoAdministrador: (token: string, datos: DtAltaAdm) => Promise<CreateResponse>;
export declare const listadoUsuarios: (token: string, pageNo?: string, pageSize?: string, sortBy?: string, sortDir?: string, filtros?: DtFiltrosUsuario | undefined) => Promise<listados>;
export declare const listadoSolicitudes: (token: string, pageNo: string, pageSize: string, sortBy: string, sortDir: string) => Promise<listados>;
export declare const estadisticasAdm: (token: String, tipo: EstAdm, fechaInicio: string, fechaFin: string) => Promise<EstaditicasResponseAdm>;
export declare const infoCompraDeshacer: (token: String, idCompra: string) => Promise<InfoCompra>;
export declare const deshacerCompra: (token: String, idCompra: string) => Promise<string>;
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
    muestra: number;
};
export declare type VentasEst = {
    completadas: number;
    canceladas: number;
    reembolsadas: number;
    aceptadas: number;
    pendientes: number;
    total: number;
    muestra: number;
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
    muestra: number;
    total: number;
};
export declare type EstaditicasResponseAdm = {
    ventas?: VentasEst;
    reclamos?: ReclamosEst;
    usuarios?: UsuariosEstAll;
};
export declare type InfoCompra = {
    idCompra: string;
    nombreComprador: string;
    nombreVendedor: string;
    nombreProducto: string;
    cantidad: number;
    fecha: string;
    estadoCompra: EstadoCompra;
    montoTotal: number;
    montoUnitario: number;
    esEnvio: boolean;
    tieneReclamoNoResuelto: boolean;
    fechaEntrega: string;
    direccionEntrega: string;
    garantiaActiva: boolean;
};
export declare type CreateResponse = {
    success: boolean;
    message?: string;
};
