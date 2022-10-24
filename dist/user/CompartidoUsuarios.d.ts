export declare const completarEnvio: (idCompra: string, token: string) => Promise<String>;
export declare const calificar: (idCompra: string, token: string, datos: DtCalificacion) => Promise<String>;
declare type DtCalificacion = {
    puntuacion: number;
    comentario: string;
    autro: string;
};
export {};
