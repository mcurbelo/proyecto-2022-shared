import axios from "axios"
import { DtAltaProducto } from "./VendedorService"
import { Auth } from ".."

export const enviarSolicitudVendedor = (solicitud: Dtsolicitud, imagenes: File[], token:String): Promise<String> => {
    const json = JSON.stringify(solicitud);
    const blob = new Blob([json], {
        type: 'application/json'
    });
    const data = new FormData();
    data.append("datos", blob);
    imagenes.forEach((imagen: File) => {
        data.append("imagenes", imagen);
    })
    return axios.post(`http://${Auth.endpoint}/api/compradores/solicitudVendedor`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    }).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}
export const nuevaCompra = (datos: DtCompra): Promise<String> => {
    return axios.post(`http://${Auth.endpoint}/api/compras`, datos, {
    }).then((response) => {
        return response.status;
    })
        .catch((error) => {
            return error.response.data.message;
        })
}

type DtCompra={
    idcomprador: string,
    correoComprador: string,
    idVendedor: string,
    idProducto: string,
    cantidad: number,
    codigoCanje: string,
    idTarjeta: string,
    esParEnvio: boolean,
    idDireccionEnvio?:number,
    idDireccionLocal?:number
}

type Dtsolicitud = {
    email?: string
    nombreEmpresa?: string
    rut?: string
    telefonoEmpresa?: string
    producto: DtAltaProducto,
    local?: {
        calle: string
        numero: string
        departamento: string
        notas: string
    }
    idDireccion?: number
}