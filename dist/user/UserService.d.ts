export declare const iniciarSesion: (email: string, password: string, tokenWeb?: string | undefined, tokenMobile?: string | undefined) => Promise<IniciarSesionResponse>;
export declare const registrarUsuario: (datos: RegistrarUsuarioRequest) => Promise<IniciarSesionResponse>;
export declare const recuperarContrasena: (correo: string) => Promise<String>;
export declare const reiniciarContrasena: (tokenReset: string, nuevaContrasena: string) => Promise<String>;
export declare const verificarCodigo: (tokenReset: string) => Promise<String>;
export declare const obtenerInformacion: (token: string, uuid: string) => Promise<InfoUsuarioResponse>;
export declare const updateUser: (token: string, datos: UpdateInfo) => Promise<UpdateResponse>;
export declare const updateDatosEmpresa: (token: string, idUsuario: string, datos: UpdateInfoEmpresa) => Promise<UpdateResponse>;
export declare const updateContrasena: (token: string, idUsuario: string, datos: DtCambioContrasena) => Promise<UpdateResponse>;
export declare const updateImagen: (token: string, idUsuario: string, imagen: File) => Promise<UpdateResponse>;
export declare const eliminarCuenta: (token: string, idUsuario: string) => Promise<UpdateResponse>;
declare type RegistrarUsuarioRequest = {
    apellido: string;
    correo: string;
    nombre: string;
    password: string;
    telefono: string;
    fechaNac: string;
    tokenWeb?: string;
    tokenMobile?: string;
};
declare type InfoUsuarioResponse = {
    success?: boolean;
    apellido?: string;
    correo?: string;
    nombre?: string;
    telefono?: string;
    rol?: Rol;
    imagen?: {
        data: string;
        nombre: string;
        tamano: number;
        formato: string;
    };
    datosVendedor?: DtDatosVendedor;
    calificacion?: number;
};
declare type IniciarSesionResponse = {
    success: boolean;
    token?: string;
    uuid?: string;
    error?: string;
    rol?: Rol;
};
export declare type UpdateResponse = {
    success: boolean;
    message?: string;
};
declare type UpdateInfo = {
    uuid: string;
    correo?: string;
    nombre?: string;
    apellido?: string;
    telefono?: string;
    imagen: {
        data: string;
        nombre?: string;
        tamaño?: 0;
        formato?: string;
    };
};
export declare type DtDatosVendedor = {
    nombreEmpresa: string;
    rut: string;
    telefonoEmpresa: string;
    estadoSolicitud: EstadoSolicitud;
    calificacion: number;
};
export declare type UpdateInfoEmpresa = {
    nombreEmpresa?: string;
    telefonoEmpresa?: string;
};
export declare type DtCambioContrasena = {
    contrasenaVieja: string;
    contrasenaNueva: string;
};
export declare enum EstadoSolicitud {
    Aceptado = "Aceptado",
    Pendiente = "Pendiente",
    NoSolicitada = "NoSolicitada"
}
export declare enum Rol {
    Vendedor = "Vendedor",
    ADM = "ADM",
    Comprador = "Comprador"
}
export {};
