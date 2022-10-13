import axios from "axios"


export const enviarSolicitudVendedor = (solicitud: Dtsolicitud, imagenes: File[], token:String): Promise<void> => {
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
        console.log(response)
    })
        .catch((error) => {
            console.log(error)
        })
}

type Dtsolicitud = {
    email?: string
    nombreEmpresa?: string
    rut?: string
    telefonoEmpresa?: string
    producto: {
        emailVendedor: string
        nombreProducto: string
        stock: number
        descripcion: string
        fechaFin?: string
        precio: number
        diasGarantia: number
        permiteEnvio: boolean
        categorias: [String]
        esSolicitud: boolean
    },
    local: {
        calle: string
        numero: string
        departamento: string
        notas: string
    }
}