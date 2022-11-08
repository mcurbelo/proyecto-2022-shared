export declare const iniciarSesion: (email: string, password: string) => Promise<IniciarSesionResponse>;
export declare const registrarUsuario: (datos: RegistrarUsuarioRequest) => Promise<IniciarSesionResponse>;
export declare const recuperarContrasena: (correo: string) => Promise<String>;
export declare const reiniciarContrasena: (tokenReset: string, nuevaContrasena: string) => Promise<String>;
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
};
declare type InfoUsuarioResponse = {
    success?: boolean;
    apellido?: string;
    correo?: string;
    nombre?: string;
    telefono?: string;
    imagen?: string;
    datosVendedor?: any;
    calificacion?: number;
};
declare type IniciarSesionResponse = {
    success: boolean;
    token?: string;
    uuid?: string;
    error?: string;
};
declare type UpdateResponse = {
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
export declare type UpdateInfoEmpresa = {
    nombreEmpresa?: string;
    telefonoEmpresa?: string;
};
export declare type DtCambioContrasena = {
    contrasenaVieja: string;
    contrasenaNueva: string;
};
export {};
