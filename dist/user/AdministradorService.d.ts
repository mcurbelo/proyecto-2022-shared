export declare const cambiarEstadoUsuario: (idUsuario: string, token: string, motivo: DtMotivo, nuevoEstado: EstadoUsuario) => Promise<String>;
export declare const revisarSolicitudNuevoVendedor: (idUsuario: string, token: string, aceptar: Boolean, motivo: DtMotivo) => Promise<String>;
export declare const nuevoAdministrador: (token: string, datos: DtAltaAdm) => Promise<String>;
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
