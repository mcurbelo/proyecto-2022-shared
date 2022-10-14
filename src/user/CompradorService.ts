import axios from "axios"
import { DtAltaProducto } from "./VendedorService"


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
    return axios.post("http://localhost:8080/api/compradores/solicitudVendedor", data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization" : `Bearer ${token}`
        },
    }).then((response) => {
        return response.data;
    })
        .catch((error) => {
            return error;
        })
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