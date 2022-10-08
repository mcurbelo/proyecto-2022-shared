export declare const iniciarSesion: (email: string, password: string) => Promise<IniciarSesionResponse>;
declare type IniciarSesionResponse = {
    success: boolean;
    token?: string;
};
export {};
