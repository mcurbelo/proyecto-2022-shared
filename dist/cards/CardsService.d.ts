export declare const agregarTarjeta: (request: CreditCardRequest) => Promise<any>;
export declare const fetchTarjetas: (request: BasicRequestData) => Promise<import("axios").AxiosResponse<any, any>>;
declare type BasicRequestData = {
    token: string;
    uuid: string;
};
declare type CreditCardRequest = BasicRequestData & {
    cardNumber: string;
    cardCvv: string;
    cardExpiration: string;
};
export {};
