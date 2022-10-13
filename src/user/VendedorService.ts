import axios from "axios"


export const altaProducto = (datosProducto: DtAltaProducto, imagenes: File[], token: String): Promise<void> => {
    const json = JSON.stringify(datosProducto);
    const blob = new Blob([json], {
        type: 'application/json'
    });
    const data = new FormData();
    data.append("datos", blob);
    imagenes.forEach((imagen: File) => {
        data.append("imagenes", imagen);
    })
    return axios.post("http://localhost:8080/api/productos", data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        },
    }).then((response) => {
        console.log(response)
    })
        .catch((error) => {
            console.log(error)
        })
}

type DtAltaProducto = {
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

}