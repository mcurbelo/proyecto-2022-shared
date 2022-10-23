export declare const iniciarSesion: (email: string, password: string) => Promise<IniciarSesionResponse>;
export declare const registrarUsuario: (datos: RegistrarUsuarioRequest) => Promise<IniciarSesionResponse>;
export declare const recuperarContrasena: (correo: string) => Promise<String>;
export declare const reiniciarContrasena: (tokenReset: string, nuevaContrasena: string) => Promise<String>;
declare type RegistrarUsuarioRequest = {
    apellido: string;
    correo: string;
    fechaNac: string;
    nombre: string;
    password: string;
    telefono: string;
};
declare type IniciarSesionResponse = {
    success: boolean;
    token?: string;
    uuid?: string;
    error?: string;
};
export {};
