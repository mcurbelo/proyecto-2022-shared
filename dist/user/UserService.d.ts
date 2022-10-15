export declare const agregarTarjeta: (tarjeta: CreditCard, uuid: string, token: string) => Promise<any>;
export declare const iniciarSesion: (email: string, password: string) => Promise<IniciarSesionResponse>;
export declare const registrarUsuario: (datos: RegistrarUsuarioRequest) => Promise<IniciarSesionResponse>;
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
declare type CreditCard = {
    cardNumber: string;
    cardCvv: string;
    cardExpiration: string;
};
export {};
