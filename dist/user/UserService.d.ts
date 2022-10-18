export declare const iniciarSesion: (email: string, password: string) => Promise<IniciarSesionResponse>;
export declare const registrarUsuario: (datos: RegistrarUsuarioRequest) => Promise<IniciarSesionResponse>;
export declare const obtenerInformacion: (uuid: string) => Promise<InfoUsuarioResponse>;
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
};
declare type IniciarSesionResponse = {
    success: boolean;
    token?: string;
    uuid?: string;
    error?: string;
};
export {};
